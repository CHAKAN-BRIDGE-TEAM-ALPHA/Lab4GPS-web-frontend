import React, { useState } from 'react';
import './ForgotPassword.css';
import api from '../services/auth'; // Assuming api service for authentication

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear any previous messages
        setError(''); // Clear any previous errors

        try {
            const response = await api.forgotPassword({ email });
            if (response.success) {
                setMessage('Password reset link has been sent to your email.');
            } else {
                setError('Failed to send password reset email. Please try again.');
            }
        } catch (err) {
            setError('Failed to send password reset email. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Your Password?</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="primary-button">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
