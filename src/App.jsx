import React from "react";
import LoginRegister from "./components/LoginRegister.jsx";
import TrainerDashboard from "./components/TrainerDashboard.jsx";
import TraineeDashboard from "./components/TraineeDashboard.jsx";

function App() {
  const role = localStorage.getItem("role"); // 'trainer' or 'trainee'
  const token = localStorage.getItem("access_token");

  // Show dashboard if logged in
  if (token && role === "trainer") {
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <TrainerDashboard />
      </div>
    );
  } else if (token && role === "trainee") {
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <TraineeDashboard />
      </div>
    );
  }

  // Not logged in: show login/register page
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <LoginRegister />
    </div>
  );
}

export default App;
