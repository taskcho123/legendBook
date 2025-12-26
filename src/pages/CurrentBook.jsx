import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import { LocationContext } from "../contexts/LocationContext";
import { AuthContext } from "../contexts/AuthContext";

export default function CurrentBook() {
  const { lastPosition, withinLibrary, autoReturned } = useContext(
    LocationContext
  );
  const { user } = useContext(AuthContext);

  return (
    <div>
      <TopBar title="현재 자리/책" />
      <div style={{ padding: 16 }}>
        <div>사용자: {user?.name || "로그인 필요"}</div>
        <div>최근 위치: {lastPosition ? `${lastPosition.lat}, ${lastPosition.lng}` : "없음"}</div>
        <div>도서관 근접 여부(500m): {withinLibrary ? "예" : "아니오"}</div>
        <div>자동 반납 상태: {autoReturned ? "반납 완료" : "미반납"}</div>
      </div>
    </div>
  );
}
