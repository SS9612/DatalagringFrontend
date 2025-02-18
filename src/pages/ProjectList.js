import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <h3>All Projects</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Project Number</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectNumber}</td>
              <td>{project.title}</td>
              <td>{project.statusId}</td>
              <td>
                <Link to={`/edit/${project.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(project.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
