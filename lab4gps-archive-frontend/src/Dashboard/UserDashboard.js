import React, { useState } from 'react';
import './UserDashboard.css';
import { FaFileUpload, FaComment, FaBell, FaUser, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Dummy data for now
const dummyDocuments = [
    {
        id: 1,
        title: "Research Proposal",
        category: "Research",
        status: "Approved",
        date: "2024-10-01",
    },
    {
        id: 2,
        title: "Presentation",
        category: "Innovation",
        status: "Pending",
        date: "2024-09-15",
    }
];

const dummyFeedback = [
    {
        id: 1,
        projectTitle: "Global Solutions Project",
        feedback: "Great work! Please update the design section for better clarity.",
        date: "2024-09-30",
    },
    {
        id: 2,
        projectTitle: "Chakan Bridge Documentation",
        feedback: "Well-organized, but please include more data analysis.",
        date: "2024-09-18",
    }
];

const dummyNotifications = [
    { id: 1, message: "Your project documentation has been approved", date: "2024-10-01" },
    { id: 2, message: "New feedback received on your student project", date: "2024-09-30" }
];

const dummyAnalytics = {
    totalUploads: 12,
    totalFeedback: 7,
    activeProjects: 3,
};

const UserDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    
    return (
        <div className="user-dashboard">
            {/* Sidebar Navigation */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <h2>User Dashboard</h2>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? 'Collapse' : 'Expand'}</button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/profile"><FaUser /> Profile</NavLink></li>
                        <li><NavLink to="/upload"><FaFileUpload /> Upload Documents</NavLink></li>
                        <li><NavLink to="/notifications"><FaBell /> Notifications</NavLink></li>
                        <li><NavLink to="/analytics"><FaChartBar /> Analytics</NavLink></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Header Section */}
                <header className="dashboard-header">
                    <h1>Your Dashboard</h1>
                    <div className="dashboard-icons">
                        <FaBell size={24} className="icon" />
                        <FaUser size={24} className="icon" />
                    </div>
                </header>

                {/* Notifications Section */}
                <section className="dashboard-section notifications">
                    <h2>Notifications</h2>
                    <ul>
                        {dummyNotifications.map((notification) => (
                            <li key={notification.id}>
                                {notification.message} <span className="date">({notification.date})</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Project Documentation Section */}
                <section className="dashboard-section">
                    <h2>Recent Documents</h2>
                    <div className="documents-grid">
                        {dummyDocuments.map((doc) => (
                            <div key={doc.id} className="document-card">
                                <h3>{doc.title}</h3>
                                <p>Category: {doc.category}</p>
                                <p>Status: <span className={`status ${doc.status.toLowerCase()}`}>{doc.status}</span></p>
                                <p>Date Uploaded: {doc.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Feedback Section */}
                <section className="dashboard-section">
                    <h2>Feedback on Your Work</h2>
                    <div className="feedback-grid">
                        {dummyFeedback.map((feedback) => (
                            <div key={feedback.id} className="feedback-card">
                                <h3>{feedback.projectTitle}</h3>
                                <p>{feedback.feedback}</p>
                                <p><span className="date">Received: {feedback.date}</span></p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Analytics Section */}
                <section className="dashboard-section analytics">
                    <h2>Your Analytics</h2>
                    <div className="analytics-cards">
                        <div className="analytics-card">
                            <h3>Total Uploads</h3>
                            <p>{dummyAnalytics.totalUploads}</p>
                        </div>
                        <div className="analytics-card">
                            <h3>Total Feedback Received</h3>
                            <p>{dummyAnalytics.totalFeedback}</p>
                        </div>
                        <div className="analytics-card">
                            <h3>Active Projects</h3>
                            <p>{dummyAnalytics.activeProjects}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
