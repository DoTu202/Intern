import { IoChevronBack } from "react-icons/io5";
import { IoEllipsisHorizontal, IoClose } from "react-icons/io5";
import { useState, useMemo } from "react";
import cinemaScreen from "../assets/images/cinemaScreen.png";
import StatusBar from "../components/statusBar";
import { ALL_SEATS } from "../data/bookingData";
import type { Seat } from "../data/bookingData";
import "./BookingScreen.css";

export const BookingScreen = () => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // hanle click seat
  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  // Total price
  const totalPrice = useMemo(() => {
    return selectedSeatIds.reduce((total, id) => {
      const seat = ALL_SEATS.find((s) => s.id === id);
      return total + (seat ? seat.price : 0);
    }, 0);
  }, [selectedSeatIds]);
  return (
    <div className="App">
      <StatusBar />

      {/* header */}
      <div className="header">
        <div className="header-left">
          <IoChevronBack size={24} color="#333" />
          <span style={{ fontWeight: "bold", color: "#333" }}>
            PHI VỤ ĐỘNG TRỜI 2 (P)
          </span>
        </div>
        <div className="header-right">
          <IoEllipsisHorizontal size={20} color="#fff" />
          <div className="pill-separator"></div>
          <IoClose size={20} color="#fff" />
        </div>
      </div>

      {/* scroll-area  */}
      <div className="scroll-area">
        {/* price ticket info and cinema info  */}
        <div className="booking-price-container">
          <div className="booking-price">
            <div className="seat-type">
              <div className="seat-color normal"></div>
              <div className="info">
                <span className="name">Thường</span>
                <span className="price">55.000 VND</span>
              </div>
            </div>

            <div className="seat-type">
              <div className="seat-color vip"></div>
              <div className="info">
                <span className="name">VIP</span>
                <span className="price">65.000 VND</span>
              </div>
            </div>

            <div className="seat-type">
              <div className="seat-color couple"></div>
              <div className="info">
                <span className="name">Ghế đôi</span>
                <span className="price">140.000 VND</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cinema-info-container">
          <div className="cinema-info">
            <span className="text-right">Rạp chiếu:</span>
            <span className="info">TT Chiếu phim Quốc gia</span>
          </div>

          <div className="cinema-info .info">
            <span className="text-right">Suất chiếu:</span>
            <span className="info">
              11:30
              <span className="estimate">~13:17</span> 17/12/2025
            </span>
          </div>

          <div className="cinema-info">
            <span className="text-right">Phòng chiếu:</span>
            <span className="info">5</span>
          </div>
        </div>

        {/* screen image */}
        <div
          className="screen-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={cinemaScreen}
            alt="Screen"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>

        {/* seat map section */}
        <div className="seat-map-container">
          <div className="seat-grid">
            {ALL_SEATS.map((seat) => {
              const isSelected = selectedSeatIds.includes(seat.id);

              const isFirstCouple =
                seat.type === "couple" && seat.number === "1, 2";
              return (
                <div
                  key={seat.id}
                  className={`seat-item ${seat.type} ${
                    seat.isBooked ? "booked" : ""
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                  style={isFirstCouple ? { gridColumnStart: 2 } : {}}
                >
                  <span className="seat-num">
                    {seat.type === "couple"
                      ? seat.number
                      : `${seat.row}${seat.number}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ height: 100 }}></div>
      </div>

      {/* Calculate price */}
      <div className="bottom-sheet">
        <div className="sheet-price">
          <span className="price-label">Tổng tiền vé</span>
          <span className="price-value">
            {totalPrice.toLocaleString("vi-VN")} VND
          </span>
        </div>

        <button
          className="btn-continue"
          disabled={selectedSeatIds.length === 0}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default BookingScreen;
