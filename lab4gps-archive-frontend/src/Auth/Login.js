import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory
import api from '../services/auth'; // Assuming api service for authentication
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login({ email, password });
            if (response.success) {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        // Send Google credential to the backend for validation
        api.googleLogin({ token: credentialResponse.credential })
            .then(response => {
                if (response.success) {
                    navigate('/dashboard'); // Redirect to dashboard on successful login
                }
            })
            .catch(() => setError('Google login failed. Please try again.'));
    };

    const handleGoogleLoginFailure = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> {/* Add Google OAuth provider */}
            <div className="login-container">
                <h2>Login to Your Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="primary-button">Login</button>
                </form>

                <p>Or</p>

                {/* Google Login Button */}
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                />

                <p>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
                <p>
                    <Link to="/forgot-password">Forgot your password?</Link>
                </p>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
