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
                    <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                    <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                    <li><NavLink to="/students" activeClassName="active">Student Repository</NavLink></li>
                    <li><NavLink to="/upload" activeClassName="active">Documents</NavLink></li>
                    <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                    <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                    <li><NavLink to="/register" activeClassName="active">Signup</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
