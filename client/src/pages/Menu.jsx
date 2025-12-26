import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import MenuItem from "../components/MenuItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { fetchAPI } from "../utils/api";

export default function Menu() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const goStudyTime = async () => {
    if (!user) {
      alert("로그인 후 이용해주세요");
      return navigate("/login");
    }
    const res = await fetchAPI(`/api/reservations/${user.id}`);
    if (!res?.isReserved) {
      alert("자리가 배정되지 않았습니다");
      return;
    }
    navigate("/studytime");
  };

  const items = [
    { id: 1, text: "메뉴1", image: "/place1.png", action: null },
    { id: 2, text: "메뉴2", image: "/place2.png", action: null },
    { id: 3, text: "도서", image: "/place3.png", action: () => navigate("/bookmenu") },
    { id: 4, text: "메뉴4", image: "/place4.png", action: null },
    { id: 5, text: "공부시간", image: "/place5.png", action: goStudyTime },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <TopBar imageSrc={"/top_bar.jpg"} backButtonSrc={null} />

      <div style={{ padding: 16 }}>
        <div style={{ width: "100%", height: "50vh", marginBottom: 16 }}>
          <img
            src={"/menu.jpg"}
            alt="main"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {items.map((it) => (
            <div key={it.id} style={{ flex: 1, textAlign: "center" }}>
              <MenuItem imageSrc={it.image} text={""} onClick={it.action} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
