import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import { StudyContext } from "../contexts/StudyContext";
import { AuthContext } from "../contexts/AuthContext";
import StudyIcon from "../components/StudyIcon";

function formatTime(totalSeconds = 0) {
  const sec = Math.max(0, totalSeconds);
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function StudyTime() {
  const { user } = useContext(AuthContext);
  const { elapsed, isStudying, startStudy, stopStudy, participants } = useContext(StudyContext);
  const toggle = () => {
    if (!user) return alert("로그인이 필요합니다");
    if (isStudying) stopStudy();
    else startStudy();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <TopBar imageSrc={"/study_top.png"} backButtonSrc={"/back_icon.png"} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* 상단: 내 공부시간 */}
        <div
          style={{
            background: "#f7f9fc",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            {user ? `${user.name}님의 공부 시간` : "로그인 후 이용해주세요"}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              marginBottom: 12,
            }}
          >
            {formatTime(elapsed)}
          </div>
          <button
            onClick={toggle}
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: isStudying ? "#ffe3e3" : "#e3f7e9",
              color: "#111",
              fontWeight: 600,
              width: "100%",
            }}
          >
            {isStudying ? "정지" : "시작"}
          </button>
        </div>

        {/* 하단: 순위 */}
        <div
          style={{
            background: "#f7f9fc",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>실시간 공부 시간</div>
          {participants.length === 0 ? (
            <div style={{ color: "#777" }}>아직 참여한 사용자가 없습니다.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
              {participants.map((p) => (
                <StudyIcon
                  key={p.userId}
                  name={p.name}
                  totalSeconds={p.totalSeconds}
                  paused={p.paused}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
