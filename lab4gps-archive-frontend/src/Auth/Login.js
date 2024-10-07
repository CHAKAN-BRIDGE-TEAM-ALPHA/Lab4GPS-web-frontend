import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory
import { login, googleLogin } from '../services/auth'; // Import specific named functions
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password toggle

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }); // Use the named login function
            if (response.success) {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        // Send Google credential to the backend for validation
        googleLogin({ token: credentialResponse.credential }) // Use the named googleLogin function
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
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
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
