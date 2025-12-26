import React, { useContext, useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { AuthContext } from "../contexts/AuthContext";
import { fetchAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CurrentBook() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isReserved, setIsReserved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const reserve = async () => {
      setLoading(true);
      const res = await fetchAPI("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, name: user.name }),
      });
      if (res?.success) setIsReserved(true);
      setLoading(false);
    };
    reserve();
  }, [user, navigate]);

  const cancelReservation = async () => {
    if (!user) return;
    const res = await fetchAPI(`/api/reservations/${user.id}`, { method: "DELETE" });
    if (res?.success) {
      setIsReserved(false);
      alert("예약이 취소되었습니다");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <TopBar imageSrc={"/bookok_bar.jpg"} backButtonSrc={"/banner_book.jpg"} />
      <div style={{ width: "100%", height: "10vh", marginBottom: 12 }}>
          <img
            src={"/banner_book.jpg"}
            alt="banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
          />
        </div>
      <div style={{ padding: 0 }}>
        <img
          src={"/book_banner.jpg"}
          alt="current"
          style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 6}}
        />
      </div>
      <div style={{ padding: 16 }}>
        <button
          onClick={cancelReservation}
          disabled={!isReserved || loading}
          style={{
            marginTop: 12,
            width: "100%",
            padding: "12px 16px",
            background: "#ffcccc",
            color: "#222",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: isReserved && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "처리 중..." : isReserved ? "예약 취소" : "예약 없음"}
        </button>
      </div>
    </div>
  );
}
