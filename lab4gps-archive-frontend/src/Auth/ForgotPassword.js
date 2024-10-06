import React, { useState } from 'react';
import './ForgotPassword.css';
import api from '../services/auth'; // Assuming api service for authentication
import { useNavigate } from 'react-router-dom'; // Updated import to useNavigate

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Updated to useNavigate

    // Send OTP to email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await api.sendOtp({ email }); // Updated API call to send OTP
            if (response.success) {
                setMessage('OTP has been sent to your email.');
                setIsOtpSent(true); // OTP is sent, show the OTP input field
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    // Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await api.verifyOtp({ email, otp }); // Updated API call to verify OTP
            if (response.success) {
                setMessage('OTP has been verified successfully.');
                setIsOtpVerified(true); // OTP is verified, allow the user to reset the password
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Failed to verify OTP. Please try again.');
        }
    };

    // Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await api.resetPassword({ email, otp, newPassword }); // API call to reset the password
            if (response.success) {
                setMessage('Your password has been reset successfully. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after success
                }, 3000); // Delay of 3 seconds
            } else {
                setError('Failed to reset the password. Please try again.');
            }
        } catch (err) {
            setError('Failed to reset the password. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>{isOtpVerified ? 'Reset Your Password' : 'Forgot Your Password?'}</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            {!isOtpVerified && (
                <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isOtpSent} // Disable email input once OTP is sent
                        />
                    </div>

                    {isOtpSent && (
                        <div className="form-group">
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="primary-button">
                        {isOtpSent ? 'Verify OTP' : 'Send OTP'}
                    </button>
                </form>
            )}

            {isOtpVerified && (
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="primary-button">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
