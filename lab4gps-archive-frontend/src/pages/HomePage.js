import React from 'react';
import './HomePage.css';
import ProjectList from '../components/ProjectDocuments/DocumentList'; // Importing a component for project documents
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage">
            <section className="homepage-intro">
                <h2>Welcome to the Lab4GPS Archive</h2>
                <p>
                    The Lab4GPS Archive is your gateway to explore, upload, and manage innovative student work and projects. Dive into a repository of creative solutions, and be part of a dynamic and engaging community.
                </p>
                <Link to="/upload" className="primary-button">Upload Your Work</Link>
            </section>

            <section className="homepage-projects">
                <h2>Featured Projects</h2>
                <ProjectList /> {/* This will display a list of projects */}
                <Link to="/projects" className="view-more">View More Projects</Link>
            </section>

            <section className="homepage-student-repository">
                <h2>Student Work Repository</h2>
                <p>Discover creative projects and media uploaded by GPS students. Collaborate, provide feedback, and be inspired.</p>
                <Link to="/students" className="secondary-button">Explore Student Work</Link>
            </section>
        </div>
    );
};

export default HomePage;
