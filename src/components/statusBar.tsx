import { IoWifi, IoBatteryFull } from "react-icons/io5";

const StatusBar = () => {
  const isMobileUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


  const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (isMobileUA && !isDev) return null;

  return (
    <div
      style={{
        height: "44px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontSize: "14px",
        fontWeight: "600",
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        color: "#000",
      }}
    >
      <span>9:41</span>

      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <IoWifi size={18} />
        <IoBatteryFull size={22} />
      </div>
    </div>
  );
};

export default StatusBar;
