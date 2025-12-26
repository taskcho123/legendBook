import React from "react";

function formatTime(totalSeconds = 0) {
  const sec = Math.max(0, totalSeconds);
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function pickImage(totalSeconds = 0, paused = false) {
  if (paused) return "/l0.png";
  const hours = totalSeconds / 3600;
  if (hours < 0.1) return "/l1.png";
  if (hours < 6) return "/l2.png";
  return "/l3.png";
}

export default function StudyIcon({ name, totalSeconds, paused = false }) {
  const img = pickImage(totalSeconds, paused);
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: 12,
          overflow: "hidden",
          background: "#f4f4f4",
        }}
      >
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ fontWeight: 600 }}>{name}</div>
      <div style={{ color: "#555", fontVariantNumeric: "tabular-nums" }}>{formatTime(totalSeconds)}</div>
    </div>
  );
}
