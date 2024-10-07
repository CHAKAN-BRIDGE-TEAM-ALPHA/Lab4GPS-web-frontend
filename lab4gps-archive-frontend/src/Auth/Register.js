import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
import { register, verifyOtp, googleLogin } from '../services/auth'; // Add verifyOtp for OTP validation
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password toggle

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [otp, setOtp] = useState(''); // State for OTP input
    const [otpSent, setOtpSent] = useState(false); // To control OTP screen
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
    const [error, setError] = useState('');
    const [otpError, setOtpError] = useState(''); // State for OTP error
    const navigate = useNavigate(); // useNavigate hook for redirection

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Standard email/password registration
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await register({ name, email, password }); // Use the named register function
            if (response.success) {
                setOtpSent(true); // Change screen to OTP entry
            }
        } catch (err) {
            // Check if the backend provides a specific error message
            if (err && err.email) {
                setError(err.email[0]);
            } else {
                setError('Failed to register. Please try again.');
            }
        }
    };

    // Handle OTP verification
    const handleOtpVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOtp({ email, otp }); // Assuming an OTP verification API
            if (response.success) {
                navigate('/login'); // Redirect to login after successful OTP verification
            }
        } catch (err) {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    // Handle Google login success
    const handleGoogleRegisterSuccess = (credentialResponse) => {
        googleLogin({ token: credentialResponse.credential }) // Use the named googleLogin function
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

    // Registration form
    const registrationForm = (
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
            <div className="form-group password-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>
            <button type="submit" className="primary-button">Register</button>
        </form>
    );

    // OTP verification form
    const otpForm = (
        <form onSubmit={handleOtpVerification}>
            <div className="form-group">
                <label htmlFor="otp">Enter OTP sent to {email}</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="primary-button">Verify OTP</button>
        </form>
    );

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="register-container">
                <h2>{otpSent ? 'Verify Your Email' : 'Create Your Account'}</h2>
                {error && <p className="error-message">{error}</p>}
                {otpError && <p className="error-message">{otpError}</p>}
                {otpSent ? otpForm : registrationForm}
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
