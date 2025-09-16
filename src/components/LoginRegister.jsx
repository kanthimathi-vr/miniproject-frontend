import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginRegister() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [role, setRole] = useState("trainee"); // 'trainer' or 'trainee'

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="flex gap-2 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${role === "trainer" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("trainer")}
        >Trainer</button>
        <button
          className={`px-4 py-2 rounded ${role === "trainee" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("trainee")}
        >Trainee</button>
      </div>
      <div className="flex gap-2 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${mode === "login" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("login")}
        >Login</button>
        <button
          className={`px-4 py-2 rounded ${mode === "register" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("register")}
        >Register</button>
      </div>
      {mode === "login"
        ? <LoginForm role={role} />
        : <RegisterForm role={role} />
      }
    </div>
  );
}
