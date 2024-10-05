import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="floating-plate">
                <div className="hero-content">
                    <h1>Lab4GPS Archive</h1>
                    <p>Empowering Global Problem Solvers to tackle real-world issues through education, research, and innovation. </p>
                    <div className="button-group">
                        <a href="/projects" className="primary-button">Explore Projects</a>
                        <a href="/upload" className="secondary-button">Upload Your Work</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
