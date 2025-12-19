import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { FaMusic, FaCloud } from "react-icons/fa"; // Icon tượng trưng
import { SiAppstore, SiAppletv } from "react-icons/si";
import "./SignIn.css";
import StatusBar from "../../components/statusBar";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const SignIn = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"INPUT_PHONE" | "INPUT_OTP">("INPUT_PHONE");
  const [confirmObj, setConfirmObj] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Setup Recaptcha
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  // Hanlde OTP
  const handleContinue = async () => {
    if (step === "INPUT_PHONE") {
      // Send OTP logic
      if (phoneNumber.length < 9) {
        alert("Vui lòng nhập số điện thoại hợp lệ");
        return;
      }
      setLoading(true);
      try {
        const formattedPhone = phoneNumber.startsWith("0")
          ? "+84" + phoneNumber.slice(1)
          : "+84" + phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          appVerifier
        );
        setConfirmObj(confirmation);
        setStep("INPUT_OTP");
        alert("Đã gửi OTP!");
      } catch (error) {
        console.error(error);
        alert("Lỗi gửi SMS. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    } else {
      // OTP verification logic
      if (!otp) return;
      setLoading(true);
      try {
        await confirmObj?.confirm(otp);
        alert("Đăng nhập thành công!");
        navigate("/");
      } catch (error) {
        alert("Sai mã OTP!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <StatusBar backgroundColor="#005baa" contentColor="#000" />
      <div id="recaptcha-container"></div>

      <div className="login-top-section">
        {/* Header Bar */}

        <div className="top-bar">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <IoChevronBack size={24} color="#fff" />
            <span className="header-title">Thanh toán</span>
          </div>
          <div className="lang-switch">
            <span className="flag-icon">🇬🇧</span>
            <span className="lang-text">ENG</span>
          </div>
        </div>

        <div className="banner-content">
          <h1>
            App Store và các Dịch vụ Apple đơn giản với{" "}
            <span className="brand-highlight">Ví VNPAY</span>
          </h1>

          <div className="service-icons-row">
            <div className="service-icon red">
              <FaMusic size={24} />
            </div>
            <div className="service-icon blue">
              <SiAppstore size={24} />
            </div>
            <div className="service-icon black">
              <SiAppletv size={24} />
            </div>
            <div className="service-icon light-blue">
              <FaCloud size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="login-bottom-sheet">
        <div className="sheet-header">
          <img
            src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg"
            alt="VNPAY"
            className="vnpay-logo"
          />
        </div>

        <h2 className="login-title">
          {step === "INPUT_PHONE" ? "Đăng nhập/Đăng ký" : "Nhập mã xác thực"}
        </h2>

        <p className="login-subtitle">
          {step === "INPUT_PHONE"
            ? "Bạn hãy nhập số điện thoại để tiếp tục nhé"
            : `Mã OTP đã được gửi đến số ${phoneNumber}`}
        </p>

        {/* User input */}
        <div className="input-wrapper">
          {step === "INPUT_PHONE" ? (
            <div className="phone-input-group">
              <div className="country-code">
                <span>+84</span>
                <IoChevronDown size={14} color="#333" />
              </div>
              <div className="vertical-divider"></div>
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="custom-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          ) : (
            <input
              type="number"
              placeholder="Nhập mã OTP (6 số)"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
        </div>

        {/* Continue button */}
        <div className="bottom-action">
          <button
            className="btn-primary"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
