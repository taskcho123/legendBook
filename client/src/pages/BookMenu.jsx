import React from "react";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

export default function BookMenu() {
  const navigate = useNavigate();
  const coverList = ["/b1.jpg", "/b2.jpg", "/b3.jpg", "/b4.jpg", "/b5.jpg", "/b6.jpg"];

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <TopBar imageSrc={"/book_top.jpg"} backButtonSrc={"/back_icon.png"} />

      <div style={{ padding: 16 }}>
        {/* 상단: 가로로 긴 이미지 (약 1:10 비율 처럼 얇게 표현) */}
        <div style={{ width: "100%", height: "10vh", marginBottom: 12 }}>
          <img
            src={"/banner_book.jpg"}
            alt="banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
          />
        </div>

        {/* 3 x 2 그리드 (이미지 6개) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {coverList.map((src, idx) => (
            <div key={idx} style={{ cursor: "pointer" }} onClick={() => navigate("/currentbook")}>
              <img src={src} alt={`cover-${idx}`} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}