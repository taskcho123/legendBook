import React from "react";
import TopBar from "../components/TopBar";

export default function Book({ book }) {
  // 책 상세 페이지 스켈레톤 (props 또는 라우트 param으로 확장)
  return (
    <div>
      <TopBar title="책 상세" />
      <div style={{ padding: 16 }}>
        <h3>{book?.title || "샘플 책"}</h3>
        <p>저자: {book?.author || "Unknown"}</p>
      </div>
    </div>
  );
}
