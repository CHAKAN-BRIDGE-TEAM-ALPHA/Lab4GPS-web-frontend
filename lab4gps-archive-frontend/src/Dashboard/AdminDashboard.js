import React, { useState } from 'react';
import './AdminDashboard.css';
import { FaFileUpload, FaComment, FaBell, FaUser, FaChartBar, FaCog, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Dummy data for now
const dummyDocuments = [
    {
        id: 1,
        title: "Research Proposal",
        category: "Research",
        status: "Pending",
        date: "2024-10-01",
    },
    {
        id: 2,
        title: "Innovation Report",
        category: "Innovation",
        status: "Approved",
        date: "2024-09-25",
    }
];

const dummyStudents = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Student",
        projects: 4,
        active: true
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Student",
        projects: 3,
        active: false
    }
];

const dummyAnalytics = {
    totalUploads: 45,
    totalFeedback: 27,
    activeProjects: 8,
    totalUsers: 12,
};

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    
    return (
        <div className="admin-dashboard">
            {/* Sidebar Navigation */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <h2>Admin Dashboard</h2>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? 'Collapse' : 'Expand'}</button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/admin"><FaChartBar /> Overview</NavLink></li>
                        <li><NavLink to="/admin-documents"><FaFileUpload /> Manage Documents</NavLink></li>
                        <li><NavLink to="/admin-students"><FaUser /> Manage Students</NavLink></li>
                        <li><NavLink to="/admin-analytics"><FaChartBar /> Analytics</NavLink></li>
                        <li><NavLink to="/admin-settings"><FaCog /> Settings</NavLink></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Header Section */}
                <header className="dashboard-header">
                    <h1>Admin Dashboard</h1>
                    <div className="dashboard-icons">
                        <FaBell size={24} className="icon" />
                        <FaUser size={24} className="icon" />
                    </div>
                </header>

                {/* Project Documentation Management */}
                <section className="dashboard-section">
                    <h2>Manage Project Documents</h2>
                    <div className="documents-grid">
                        {dummyDocuments.map((doc) => (
                            <div key={doc.id} className="document-card">
                                <h3>{doc.title}</h3>
                                <p>Category: {doc.category}</p>
                                <p>Status: <span className={`status ${doc.status.toLowerCase()}`}>{doc.status}</span></p>
                                <p>Date Uploaded: {doc.date}</p>
                                <div className="document-actions">
                                    <button><FaEdit /> Edit</button>
                                    <button><FaTrashAlt /> Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Student Work Repository Management */}
                <section className="dashboard-section">
                    <h2>Manage Students</h2>
                    <div className="students-grid">
                        {dummyStudents.map((student) => (
                            <div key={student.id} className="student-card">
                                <h3>{student.name}</h3>
                                <p>Email: {student.email}</p>
                                <p>Role: {student.role}</p>
                                <p>Projects: {student.projects}</p>
                                <p>Status: <span className={`status ${student.active ? 'active' : 'inactive'}`}>{student.active ? 'Active' : 'Inactive'}</span></p>
                                <div className="student-actions">
                                    <button><FaEdit /> Edit</button>
                                    <button><FaTrashAlt /> Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Analytics Section */}
                <section className="dashboard-section analytics">
                    <h2>Admin Analytics</h2>
                    <div className="analytics-cards">
                        <div className="analytics-card">
                            <h3>Total Uploads</h3>
                            <p>{dummyAnalytics.totalUploads}</p>
                        </div>
                        <div className="analytics-card">
                            <h3>Total Feedback Given</h3>
                            <p>{dummyAnalytics.totalFeedback}</p>
                        </div>
                        <div className="analytics-card">
                            <h3>Active Projects</h3>
                            <p>{dummyAnalytics.activeProjects}</p>
                        </div>
                        <div className="analytics-card">
                            <h3>Total Users</h3>
                            <p>{dummyAnalytics.totalUsers}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
