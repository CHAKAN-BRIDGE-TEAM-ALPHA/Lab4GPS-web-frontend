import React, { useState, useEffect } from 'react';
import './ProjectDocsPage.css';
import DocumentList from '../components/ProjectDocuments/DocumentList';
import DocumentCategories from '../components/ProjectDocuments/DocumentCategories';
import api from '../services/api'; // Assuming this is the API service for fetching data

const ProjectDocsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch all documents on page load
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/documents');
        setDocuments(response.data);
        setFilteredDocuments(response.data); // Initially display all documents
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredDocuments(documents); // Show all documents
    } else {
      setFilteredDocuments(
        documents.filter((doc) => doc.category === category)
      );
    }
  };

  return (
    <div className="project-docs-page">
      <header className="docs-header">
        <h1>Project Documents</h1>
        <p>Browse through key documents related to the Chakan Bridge Project and other Lab4GPS initiatives.</p>
      </header>

      <section className="filter-section">
        <DocumentCategories
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      <section className="docs-list-section">
        <DocumentList documents={filteredDocuments} />
      </section>
    </div>
  );
};

export default ProjectDocsPage;
