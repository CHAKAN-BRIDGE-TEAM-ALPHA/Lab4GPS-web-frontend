import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
import { register, verifyOtp, googleLogin } from '../services/auth'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  // Email is set here
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState(''); 
    const [otpSent, setOtpSent] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [error, setError] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Registration handler
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await register({ name, email, password });
            if (response.otp_sent) {
                setOtpSent(true); // Change to OTP screen after registration
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (err) {
            if (err && err.email) {
                setError(err.email[0]);
            } else {
                setError('Failed to register. Please try again.');
            }
        }
    };

    // OTP verification handler
    const handleOtpVerification = async (e) => {
        e.preventDefault();

        try {
            // Explicitly passing the `email` along with `otp`
            const response = await verifyOtp({ email, otp });
            if (response.success) {
                navigate('/login'); // Redirect to login after OTP verification
            } else {
                setOtpError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    // Handle Google registration
    const handleGoogleRegisterSuccess = (credentialResponse) => {
        googleLogin({ token: credentialResponse.credential })
            .then(response => {
                if (response.success) {
                    navigate('/dashboard');
                }
            })
            .catch(() => setError('Google registration failed. Please try again.'));
    };

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
            {error && <p className="error-message">{error}</p>}
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
            {otpError && <p className="error-message">{otpError}</p>}
            <button type="submit" className="primary-button">Verify OTP</button>
        </form>
    );

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="register-container">
                <h2>{otpSent ? 'Verify Your Email' : 'Create Your Account'}</h2>
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
