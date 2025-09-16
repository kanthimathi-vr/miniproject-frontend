import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";

export default function TraineeDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");

  useEffect(() => {
    let url = "mini-projects?assignedTo=me";
    if (filterPriority) url += `&priority=${filterPriority}`;
    if (filterDueDate) url += `&dueDate=${filterDueDate}`;

    setLoading(true);
    setError("");
    axios
      .get(url)
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to fetch your projects"))
      .finally(() => setLoading(false));
  }, [filterPriority, filterDueDate]);

  const markComplete = async (id) => {
    try {
      await axios.put(`mini-projects/${id}/`, { status: "complete" });
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: "complete" } : p)));
    } catch {
      setError("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    window.location.href = "/"; // Redirect to main/login page
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-sm">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold mb-0">My Mini Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-6 justify-center items-center">
        {/* Priority Filter */}
        <div className="flex flex-col">
          <label htmlFor="priority-filter" className="mb-1 font-medium">
            Filter by Priority
          </label>
          <select
            id="priority-filter"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border rounded px-3 py-2 w-40"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Due Date Filter */}
        <div className="flex flex-col">
          <label htmlFor="due-date-filter" className="mb-1 font-medium">
            Filter by Due Date
          </label>
          <input
            id="due-date-filter"
            type="date"
            value={filterDueDate}
            onChange={(e) => setFilterDueDate(e.target.value)}
            className="border rounded px-3 py-2 w-40"
          />
        </div>
      </div>

      {/* Loading and Error */}
      {loading && <p className="text-center text-gray-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Project List */}
      <ul className="space-y-4">
        {projects.length === 0 && !loading && (
          <p className="text-center text-gray-700">No projects found.</p>
        )}
        {projects.map((project) => (
          <li
            key={project.id}
            className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-xl mb-1 flex justify-between items-center">
              <span>{project.title}</span>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  project.priority === "high"
                    ? "bg-red-200 text-red-800"
                    : project.priority === "medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
              </span>
            </h3>
            <p className="mb-2 text-gray-700">{project.description}</p>
            <p className="mb-1 text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              {project.status
                ? project.status.charAt(0).toUpperCase() + project.status.slice(1)
                : "In Progress"}
            </p>
            <p className="mb-2 text-sm text-gray-600">
              <strong>Due:</strong> {project.dueDate || "N/A"}
            </p>
            {project.status !== "complete" && (
              <button
                onClick={() => markComplete(project.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                aria-label={`Mark project ${project.title} as complete`}
              >
                Mark Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
