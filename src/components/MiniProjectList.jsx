import React, { useEffect, useState } from 'react';
import { fetchMiniProjects } from '../api/axios';

function MiniProjectList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMiniProjects()
      .then(data => setProjects(data))
      .catch(err => setError("Failed to load projects"));
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {projects.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </div>
  );
}

export default MiniProjectList;
