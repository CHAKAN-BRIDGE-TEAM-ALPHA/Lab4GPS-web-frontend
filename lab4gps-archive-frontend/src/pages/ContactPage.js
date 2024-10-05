import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling form submission goes here
        setSubmitted(true);
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="contact-content">
                    <h1>Contact Us</h1>
                    <p>We’d love to hear from you! Whether you have questions, feedback, or just want to get in touch, fill out the form below and we'll get back to you shortly.</p>
                </div>
            </section>

            <section className="contact-form-section">
                <div className="contact-form-container floating-container">
                    {submitted ? (
                        <h2>Thank you for contacting us! We'll be in touch soon.</h2>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="primary-button">
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
