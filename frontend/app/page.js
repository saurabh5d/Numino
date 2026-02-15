import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Neighborhood Library</h1>

      <ul>
        <li><Link href="/books">Books</Link></li>
        <li><Link href="/members">Members</Link></li>
        <li><Link href="/borrow">Borrow / Return</Link></li>
      </ul>
    </main>
  );
}
