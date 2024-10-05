import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-content">
                    <h1>About Lab4GPS Archive</h1>
                    <p>At Lab4GPS, we are dedicated to solving global problems through education, research, and practical application, empowering individuals to make a sustainable impact on the world.</p>
                </div>
            </section>

            <section className="about-details">
                <div className="about-card">
                    <h2>Our Purpose</h2>
                    <p>The purpose of Lab4GPS is to transform global problems into scalable and sustainable solutions by fostering innovation through education and practice. We strive to make problem-solving a joyful, purpose-driven endeavor.</p>
                </div>

                <div className="about-card">
                    <h2>Our Mission</h2>
                    <p>Our mission is to support and empower Global Problem Solvers (GPS) by providing a collaborative platform where individuals can find their purpose, share knowledge, and develop solutions to real-world issues.</p>
                </div>

                <div className="about-card">
                    <h2>Our Vision</h2>
                    <p>We envision a world where innovative education, business as love, and problem-solving are intertwined to create a better, more sustainable future. Through initiatives like Chakan Bridge and Project Mabadiliko, we are nurturing leaders who solve global problems with compassion and wisdom.</p>
                </div>

                <div className="about-card">
                    <h2>The Chakan Bridge Project</h2>
                    <p>The Chakan Bridge Project is a hallmark of our work at Lab4GPS. It allows students to engage in developing innovative solutions that address real-world infrastructure challenges while fostering skills that drive both social and technological advancements.</p>
                </div>
            </section>

            <section className="about-values">
                <div className="floating-container">
                    <h2>Our Core Values</h2>
                    <ul>
                        <li>Love: Solving problems for others with compassion and care.</li>
                        <li>Courage: Pioneering new frontiers despite uncertainties and risks.</li>
                        <li>Wisdom: Leveraging collective knowledge for sustainable advancements.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
