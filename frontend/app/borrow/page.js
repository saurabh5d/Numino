"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function BorrowPage() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    fetch(`${API}/books`).then(res => res.json()).then(setBooks);
    fetch(`${API}/members`).then(res => res.json()).then(setMembers);
  }, []);

  const borrow = async () => {
    await fetch(`${API}/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_id: Number(bookId),
        member_id: Number(memberId)
      })
    });
    alert("Borrowed");
  };

  const returnBook = async () => {
    await fetch(`${API}/return`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_id: Number(bookId),
        member_id: Number(memberId)
      })
    });
    alert("Returned");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Borrow / Return</h2>

      <div>
        <label>Book:</label>
        <select onChange={e => setBookId(e.target.value)}>
          <option value="">Select Book</option>
          {books.map(b => (
            <option key={b.id} value={b.id}>
              {b.title} (Available: {b.available_copies})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Member:</label>
        <select onChange={e => setMemberId(e.target.value)}>
          <option value="">Select Member</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <br />

      <button onClick={borrow}>Borrow</button>
      <button onClick={returnBook}>Return</button>
    </div>
  );
}
