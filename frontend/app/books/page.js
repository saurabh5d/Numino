"use client";
const API = process.env.NEXT_PUBLIC_API_URL;

import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", total_copies: 1 });

  const fetchBooks = async () => {
    const res = await fetch(`${API}/books`);
    setBooks(await res.json());
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async () => {
    await fetch(`${API}/books`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    fetchBooks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Books</h2>

      <input placeholder="Title"
        onChange={e => setForm({...form, title:e.target.value})} />
      <input placeholder="Author"
        onChange={e => setForm({...form, author:e.target.value})} />
      <input placeholder="ISBN"
        onChange={e => setForm({...form, isbn:e.target.value})} />
      <input placeholder="Number of Copies"
        onChange={e => setForm({...form, total_copies:Number(e.target.value)})} />

      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map(b => (
          <li key={b.id}>
            {b.title} - {b.author} ({b.available_copies})
          </li>
        ))}
      </ul>
    </div>
  );
}
