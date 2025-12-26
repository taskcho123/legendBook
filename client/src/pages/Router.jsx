import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./Menu";
import LoginMenu from "./LoginMenu";
import BookMenu from "./BookMenu";
import StudyTime from "./StudyTime";
import CurrentBook from "./CurrentBook";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginMenu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bookmenu" element={<BookMenu />} />
        <Route path="/studytime" element={<StudyTime />} />
        <Route path="/currentbook" element={<CurrentBook />} />
      </Routes>
    </BrowserRouter>
  );
}
