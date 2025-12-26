import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import BookItem from "../components/BookItem";
import { fetchAPI } from "../utils/api";

export default function BookMenu() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAPI("/api/books").then((res) => setBooks(res || []));
  }, []);

  return (
    <div>
      <TopBar title="도서 목록" />
      <div style={{ padding: 16 }}>
        {books.map((b) => (
          <BookItem key={b._id} book={b} />
        ))}
      </div>
    </div>
  );
}
