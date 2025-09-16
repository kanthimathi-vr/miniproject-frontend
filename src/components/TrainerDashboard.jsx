import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";

export default function TrainerDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    axios
      .get("mini-projects/")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to fetch projects"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    try {
      const payload = {
        title: newProject.title,
        description: newProject.description,
        assigned_to: newProject.assignedTo,  // Note: backend expects 'assigned_to' key
        priority: newProject.priority,
        due_date: newProject.dueDate,
      };

      const res = await axios.post("mini-projects/", payload);
      setProjects([...projects, res.data]);
      setNewProject({ title: "", description: "", assignedTo: "", priority: "medium", dueDate: "" });
      setError("");
    } catch {
      setError("Add project failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trainer Mini Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="font-semibold mb-2">Add New Mini Project</h2>
        <input
          placeholder="Title"
          className="border p-2 mb-2 w-full rounded"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 mb-2 w-full rounded"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <input
          placeholder="Assign To (Email)"
          className="border p-2 mb-2 w-full rounded"
          value={newProject.assignedTo}
          onChange={(e) => setNewProject({ ...newProject, assignedTo: e.target.value })}
        />
        <select
          value={newProject.priority}
          onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          className="border p-2 mb-2 w-full rounded"
          value={newProject.dueDate}
          onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Existing Mini Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id} className="border p-4 mb-2 rounded shadow-sm">
            <h3 className="font-bold text-lg">
              {p.title} ({p.priority})
            </h3>
            <p className="mb-1">{p.description}</p>
            <p className="text-sm text-gray-600">Assigned to: {p.assigned_to || p.assignedTo}</p>
            <p className="text-sm text-gray-600">Due: {p.due_date || p.dueDate || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
