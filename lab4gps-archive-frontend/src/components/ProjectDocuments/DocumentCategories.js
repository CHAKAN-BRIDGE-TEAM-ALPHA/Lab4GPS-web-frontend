import React from 'react';
import './DocumentCategories.css'; // Importing the styling for DocumentCategories

const DocumentCategories = ({ selectedCategory, onCategoryChange }) => {
  // Dummy categories to show if no categories are fetched
  const categories = ['All', 'Design', 'Engineering', 'Research', 'Testing', 'Chakan Bridge'];

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
