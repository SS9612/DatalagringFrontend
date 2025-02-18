import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import ProjectList from "./pages/ProjectList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Database</h1>
        <nav>
          <ul>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/create">➕ New Project</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/edit/:id" element={<EditProject />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;