import React from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import HeroSection from './pages/HeroSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectDocsPage from './pages/ProjectDocsPage';
import RepositoryPage from './pages/RepositoryPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ChatbotPage from './pages/ChatbotPage';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<><HeroSection /><HomePage /></>} />
            <Route path="/projects" element={<ProjectDocsPage />} />
            <Route path="/students" element={<RepositoryPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotPage /> {/* Chatbot is always visible */}
      </div>
    </Router>
  );
}

export default App;
