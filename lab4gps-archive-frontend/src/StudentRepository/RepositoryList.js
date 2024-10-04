import React from 'react';
import './RepositoryList.css'; // Importing the styling file

const RepositoryList = ({ projects }) => {
  return (
    <div className="repository-list">
      {projects.length === 0 ? (
        <p>No student projects available at the moment.</p>
      ) : (
        <ul className="project-list">
          {projects.map((project, index) => (
            <li key={index} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <span className="project-category">{project.category}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Dummy Data (until API integration is live)
RepositoryList.defaultProps = {
  projects: [
    {
      title: 'Chakan Bridge Restoration',
      description: 'A detailed analysis of the Chakan Bridge’s structural integrity.',
      category: 'Civil Engineering',
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'AI-Powered Traffic Monitoring',
      description: 'An innovative AI solution for traffic monitoring in urban areas.',
      category: 'Computer Science',
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Renewable Energy in Rural Areas',
      description: 'A project focusing on sustainable energy solutions for rural communities.',
      category: 'Environmental Science',
      image: 'https://via.placeholder.com/150',
    },
  ],
};

export default RepositoryList;
