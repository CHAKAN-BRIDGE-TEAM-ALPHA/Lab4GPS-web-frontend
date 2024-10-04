import React, { useState } from 'react';
import './UploadPage.css'; // Importing the styling file for this page
import api from '../services/api'; // Centralized API service

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    try {
      const response = await api.post('/upload', formData); // Adjust API endpoint as needed
      console.log('File uploaded successfully', response.data);
      setUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <header className="page-header">
        <h1>Upload Project</h1>
        <p>Upload your project files with a title and description for easy sharing.</p>
      </header>
      <form className="upload-form" onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="document">Document</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">Choose file</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
