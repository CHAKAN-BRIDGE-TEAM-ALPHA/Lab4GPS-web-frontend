import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Main Navigation */}
                <div className="footer-section">
                    <h4>Main Navigation</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/students">Student Repository</a></li>
                        <li><a href="/upload">Upload Work</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </div>

                {/* Support & Help */}
                <div className="footer-section">
                    <h4>Support & Help</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/help-center">Help Center</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/chatbot">AI Chatbot</a></li>
                    </ul>
                </div>

                {/* Community & Collaboration */}
                <div className="footer-section">
                    <h4>Community & Collaboration</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/team">Team</a></li>
                        <li><a href="/contributors">Contributors</a></li>
                        <li><a href="/events">Events</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="footer-section">
                    <h4>Contact Information</h4>
                    <hr />
                    <ul className="footer-links">
                        <li>Email: <a href="mailto:support@lab4gps.com">support@lab4gps.com</a></li>
                        <li>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></li>
                    </ul>
                </div>

                {/* Legal & Policies */}
                <div className="footer-section">
                    <h4>Legal & Policies</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/cookies">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="footer-section footer-social">
                    <h4>Follow Us</h4>
                    <hr />
                    <div className="footer-social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>

                {/* Resources */}
                <div className="footer-section">
                    <h4>Resources</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/docs">Documentation</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/tutorials">Tutorials</a></li>
                    </ul>
                </div>

                {/* Language & Accessibility */}
                <div className="footer-section">
                    <h4>Language & Accessibility</h4>
                    <hr />
                    <ul className="footer-links">
                        <li><a href="/language">Language Selector</a></li>
                        <li><a href="/accessibility">Accessibility Statement</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer with horizontal line */}
            <div className="footer-bottom">
                <p>© 2024 Lab4GPS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
