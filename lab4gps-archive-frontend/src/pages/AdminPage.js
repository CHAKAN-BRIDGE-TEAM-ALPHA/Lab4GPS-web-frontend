import React, { useEffect, useState } from 'react';
import './AdminPage.css'; // Importing styling for AdminPage
import api from '../services/api'; // API service for backend integration

const AdminPage = () => {
  const [documents, setDocuments] = useState([]); // State to store document data
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    // Fetch all documents and users from the backend when the component mounts
    api.get('/admin/documents').then((response) => setDocuments(response.data));
    api.get('/admin/users').then((response) => setUsers(response.data));
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, documents, and the platform from this dashboard.</p>
      </header>

      <section className="admin-section">
        <h2>Users</h2>
        <ul className="admin-list">
          {users.map((user) => (
            <li key={user.id}>
              <div className="user-card">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section">
        <h2>Documents</h2>
        <ul className="admin-list">
          {documents.map((doc) => (
            <li key={doc.id}>
              <div className="document-card">
                <h3>{doc.title}</h3>
                <p>Category: {doc.category}</p>
                <p>Uploaded by: {doc.uploadedBy}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPage;
