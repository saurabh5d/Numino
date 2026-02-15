"use client";

import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_URL;
export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name:"", email:"" ,phone:""});

  const fetchMembers = async () => {
    const res = await fetch(`${API}/members`);
    setMembers(await res.json());
  };

  useEffect(() => { fetchMembers(); }, []);

  const addMember = async () => {
    await fetch(`${API}/members/`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    });
    fetchMembers();
  };

  return (
    <div style={{ padding:20 }}>
      <h2>Members</h2>

      <input placeholder="Name"
        onChange={e => setForm({...form,name:e.target.value})}/>
      <input placeholder="Email"
        onChange={e => setForm({...form,email:e.target.value})}/>
      <input placeholder="Phone"
        onChange={e => setForm({...form,phone:e.target.value})}/>


      <button onClick={addMember}>Add Member</button>

      <ul>
        {members.map(m => (
          <li key={m.id}>{m.name} - {m.email}</li>
        ))}
      </ul>
    </div>
  );
}
