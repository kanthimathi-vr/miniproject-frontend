import React, { useState } from "react";
import axios from "../api/axios";

export default function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post("token/", { email, password, role });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("role", role);
      // Redirect based on role
      window.location.href = (role === "trainer") ? "/trainer-dashboard" : "/trainee-dashboard";
    } catch (err) {
      setError("Login failed. Check credentials and role.");
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Login as {role}</h2>
      <input type="email" className="w-full px-3 py-2 border rounded" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} />
      <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
      <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? "Logging in..." : "Login"}</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}
