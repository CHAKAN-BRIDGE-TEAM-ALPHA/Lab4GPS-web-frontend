import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
import api from '../services/auth'; // Assuming api service for authentication

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook for redirection

    // Standard email/password registration
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.register({ name, email, password });
            if (response.success) {
                navigate('/login'); // Redirect to login after successful registration
            }
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    // Handle Google login success
    const handleGoogleRegisterSuccess = (credentialResponse) => {
        // Send Google credential to the backend for validation
        api.googleRegister({ token: credentialResponse.credential })
            .then(response => {
                if (response.success) {
                    navigate('/dashboard'); // Redirect to dashboard after successful Google registration
                }
            })
            .catch(() => setError('Google registration failed. Please try again.'));
    };

    // Handle Google login failure
    const handleGoogleRegisterFailure = () => {
        setError('Google registration failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="register-container">
                <h2>Create Your Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="primary-button">Register</button>
                </form>

                <p>Or</p>

                {/* Google Login Button */}
                <GoogleLogin
                    onSuccess={handleGoogleRegisterSuccess}
                    onError={handleGoogleRegisterFailure}
                    useOneTap
                />

            </div>
        </GoogleOAuthProvider>
    );
};

export default Register;
