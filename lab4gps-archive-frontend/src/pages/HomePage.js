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
                    The Lab4GPS Archive is a dynamic hub where creativity, education, and global problem-solving converge. As part of the Lab4GPS community, this platform empowers students and innovators to collaborate, share their work, and contribute to solutions for global challenges.
                </p>
                <p>
                    Our mission is grounded in fostering innovation, practical education, and collective action. Join us in creating a better future through problem-solving initiatives, innovative projects, and shared knowledge.
                </p>
            </section>

            <section className="homepage-features">
                <h2>Key Features of Lab4GPS Archive</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <h3>Project Documentation Upload</h3>
                        <p>Upload and manage essential project documents, proposals, and reports, ensuring smooth collaboration and knowledge sharing within the GPS community.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Student Work Repository</h3>
                        <p>Explore a diverse repository of multimedia work submitted by students, categorized for easy browsing and feedback.</p>
                    </div>
                    <div className="feature-item">
                        <h3>AI Chatbot Integration</h3>
                        <p>Get personalized assistance through our AI-powered chatbot, designed to help you navigate the platform and find the materials you need.</p>
                    </div>
                </div>
            </section>

            <section className="homepage-projects">
                <h2>Highlighted Projects</h2>
                <p>Delve into innovative projects created by students and professionals, aimed at solving global problems. Discover groundbreaking solutions that exemplify the mission of Lab4GPS.</p>
                <ProjectList /> {/* Display a list of featured projects */}
                <Link to="/projects" className="view-more">View More Projects</Link>
            </section>

            <section className="homepage-student-repository">
                <h2>Student Work Repository</h2>
                <p>From multimedia presentations to groundbreaking research, the Student Work Repository highlights the creativity and problem-solving capabilities of our GPS students.</p>
                <Link to="/students" className="secondary-button">Explore Student Work</Link>
            </section>

            <section className="homepage-get-started">
                <h2>Get Involved</h2>
                <p>Whether you're here to showcase your work or explore innovative solutions, the Lab4GPS Archive offers a platform for growth, collaboration, and real-world impact. Share your journey and join the movement towards positive global change.</p>
                <Link to="/upload" className="primary-button">Upload Your Work</Link>
            </section>
        </div>
    );
};

export default HomePage;
