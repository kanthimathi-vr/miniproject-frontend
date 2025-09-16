import React, { useState } from "react";
import axios from "../api/axios";

export default function RegisterForm({ role }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      await axios.post("users/register/", { email, name, password, role });
      setSuccess("Registration successful. Please login.");
      setLoading(false);
      setEmail(""); setName(""); setPassword("");
    } catch (err) {
      setError("Registration failed. Check details.");
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Register as {role}</h2>
      <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Name" value={name} required onChange={e => setName(e.target.value)} />
      <input type="email" className="w-full px-3 py-2 border rounded" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} />
      <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
      <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">{loading ? "Registering..." : "Register"}</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </form>
  );
}
