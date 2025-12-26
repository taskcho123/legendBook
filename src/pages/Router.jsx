import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import LoginMenu from "./LoginMenu";
import BookMenu from "./BookMenu";
import StudyTime from "./StudyTime";
import CurrentBook from "./CurrentBook";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<LoginMenu />} />
        <Route path="/books" element={<BookMenu />} />
        <Route path="/study" element={<StudyTime />} />
        <Route path="/current" element={<CurrentBook />} />
      </Routes>
    </BrowserRouter>
  );
}
