import React from "react";
import TopBar from "../components/TopBar";
import MenuItem from "../components/MenuItem";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <TopBar title="LegendBook" />
      <div style={{ padding: 16 }}>
        <MenuItem>
          <Link to="/books">도서 목록</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/study">공부 시간 대결</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/current">현재 자리/책</Link>
        </MenuItem>
      </div>
    </div>
  );
}
