import React, { useState, useEffect } from 'react';
import './RepositoryPage.css'; // Importing the styling file for this page
import RepositoryList from '../../src/StudentRepository/RepositoryList'; // Component to list student projects
import api from '../services/api'; // Centralized API service

const RepositoryPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await api.get('/students/projects'); // Adjust endpoint to match your backend
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="repository-page">
      <header className="page-header">
        <h1>Student Work Repository</h1>
        <p>Browse through student multimedia projects.</p>
      </header>

      {loading ? (
        <div className="loading">
          <p>Loading student projects...</p>
        </div>
      ) : (
        <RepositoryList projects={projects} />
      )}
    </div>
  );
};

export default RepositoryPage;
