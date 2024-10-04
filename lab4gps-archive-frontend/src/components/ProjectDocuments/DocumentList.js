import React from 'react';
import './DocumentList.css'; // Importing styling for DocumentList

const DocumentList = ({ documents }) => {
  // Dummy data to display if no documents are provided
  const dummyDocuments = [
    {
      id: 1,
      title: 'Chakan Bridge Structural Analysis',
      description: 'A detailed report on the structural integrity of the Chakan Bridge.',
      category: 'Civil Engineering',
      uploadedBy: 'John Doe',
      link: 'https://example.com/document1',
    },
    {
      id: 2,
      title: 'AI in Traffic Monitoring',
      description: 'Using AI to monitor and improve traffic flow in metropolitan areas.',
      category: 'Computer Science',
      uploadedBy: 'Jane Smith',
      link: 'https://example.com/document2',
    },
    {
      id: 3,
      title: 'Renewable Energy in Rural Areas',
      description: 'Innovative solutions for renewable energy in rural regions.',
      category: 'Environmental Science',
      uploadedBy: 'Alice Johnson',
      link: 'https://example.com/document3',
    },
  ];

  const documentList = documents && documents.length > 0 ? documents : dummyDocuments;

  return (
    <div className="document-list">
      {documentList.map((document) => (
        <div className="document-card" key={document.id}>
          <h3>{document.title}</h3>
          <p>{document.description}</p>
          <p>
            <strong>Category:</strong> {document.category}
          </p>
          <p>
            <strong>Uploaded by:</strong> {document.uploadedBy}
          </p>
          <a href={document.link} className="view-document" target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
