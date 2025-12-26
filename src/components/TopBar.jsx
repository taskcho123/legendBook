import React from "react";

export default function TopBar({ title, right }) {
  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{title}</div>
      <div>{right}</div>
    </div>
  );
}
