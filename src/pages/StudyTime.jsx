import React, { useContext, useEffect } from "react";
import { StudyContext } from "../contexts/StudyContext";
import TopBar from "../components/TopBar";
import Button from "../components/Button";

export default function StudyTime() {
  const { participants, startStudy, stopStudy, isStudying, elapsed } =
    useContext(StudyContext);

  useEffect(() => {
    // 참가자 목록은 StudyContext에서 소켓으로 자동업데이트됨
  }, []);

  return (
    <div>
      <TopBar title="공부 시간 대결" />
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <Button onClick={isStudying ? stopStudy : startStudy}>
            {isStudying ? "중단" : "시작"}
          </Button>
          <span style={{ marginLeft: 12 }}>
            내 공부시간: {new Date(elapsed * 1000).toISOString().substr(11, 8)}
          </span>
        </div>

        <h3>실시간 순위</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {participants
            .slice()
            .sort((a, b) => b.elapsed - a.elapsed)
            .map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 100px",
                  alignItems: "center",
                  padding: 8,
                  border: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{idx + 1}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <img
                    src={p.avatar || `https://ui-avatars.com/api/?name=${p.name}`}
                    alt="avatar"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <div>{p.name}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {new Date(p.elapsed * 1000).toISOString().substr(11, 8)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
