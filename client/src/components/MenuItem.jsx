import React from "react";

export default function MenuItem({ imageSrc, text, onClick, style }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        ...style,
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={text} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8 }} />
      ) : (
        <div style={{ width: 64, height: 64, background: "#f0f0f0", borderRadius: 8 }} />
      )}
      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}