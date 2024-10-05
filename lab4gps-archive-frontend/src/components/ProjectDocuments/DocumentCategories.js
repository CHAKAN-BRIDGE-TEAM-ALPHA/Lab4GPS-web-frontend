import React from 'react';
import './DocumentCategories.css'; // Importing the styling for DocumentCategories

const DocumentCategories = ({ selectedCategory, onCategoryChange }) => {
  // Updated categories based on the Lab4GPS Archive project
  const categories = [
    'All',
    'Project Proposals',
    'Research Papers',
    'Multimedia',
    'Chakan Bridge',
    'Innovation',
    'Global Solutions',
    'Collaborative Projects'
  ];

  return (
    <div className="document-categories">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default DocumentCategories;
