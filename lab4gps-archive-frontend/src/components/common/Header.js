import React from 'react';
import './Header.css';
import logo from '../../assets/logos/logo.png'; // Assuming logo is stored in logos directory
import { Link } from 'react-router-dom'; // Using Link from react-router-dom for client-side navigation

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Lab4GPS Logo" />
            </div>
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/students">Student Work</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/login">Login</Link></li> {/* Added Login link */}
                    <li><Link to="/register">Signup</Link></li> {/* Added Signup link */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
