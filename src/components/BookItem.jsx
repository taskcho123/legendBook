import React from "react";

export default function BookItem({ book }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 8,
        border: "1px solid #eee",
        borderRadius: 6,
        marginBottom: 8,
        alignItems: "center",
      }}
    >
      <div style={{ width: 60, height: 80, background: "#f5f5f5" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold" }}>{book.title}</div>
        <div style={{ color: "#666" }}>{book.author}</div>
      </div>
      <div>
        <button>대여/예약</button>
      </div>
    </div>
  );
}
