import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title, imageSrc, backButtonSrc, height = 64 }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", alignItems: "center", height }}>
      

      <div style={{ flex: 1, height: "100%", position: "relative" }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title || "top"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#eee" }} />
        )}
      </div>
    </div>
  );
}