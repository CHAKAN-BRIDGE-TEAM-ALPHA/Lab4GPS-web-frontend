import React from 'react';
import './Header.css';
import logo from '../../assets/logos/6e45a98bceca4f0997f01fb640ddfb39v89sL4fANDwZR75y-0 (1).png'; // Assuming logo is stored in logos directory
import { NavLink } from 'react-router-dom'; // Using NavLink for client-side navigation

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Lab4GPS Logo" />
            </div>
            <nav className="header-nav">
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
                    <li><NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>Projects</NavLink></li>
                    <li><NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>Student Repository</NavLink></li>
                    <li><NavLink to="/upload" className={({ isActive }) => (isActive ? 'active' : '')}>Documents</NavLink></li>
                    <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li> {/* Navigate to UserDashboard */}
                    <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Signup</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
