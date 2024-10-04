import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css'; // Importing styling for ProfilePage
import AuthContext from '../context/AuthContext'; // Authentication context for user data
import api from '../services/api'; // API service for backend integration

const ProfilePage = () => {
  const { user } = useContext(AuthContext); // Fetching the logged-in user from AuthContext
  const [userProjects, setUserProjects] = useState([]); // State to store user projects

  useEffect(() => {
    // Fetch user's projects or related data from the backend
    api.get(`/user/${user.id}/projects`)
      .then((response) => setUserProjects(response.data))
      .catch((error) => console.error('Error fetching user projects:', error));
  }, [user.id]);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>{user.name}'s Profile</h1>
        <p>Welcome back, {user.name}. Here you can manage your personal uploads, projects, and account details.</p>
      </header>

      <section className="profile-info">
        <h2>Account Information</h2>
        <div className="account-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</p>
        </div>
      </section>

      <section className="user-projects">
        <h2>Your Projects</h2>
        {userProjects.length > 0 ? (
          <ul className="projects-list">
            {userProjects.map((project) => (
              <li key={project.id}>
                <div className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found. Start by uploading your first project!</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
