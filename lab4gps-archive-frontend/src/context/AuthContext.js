import React, { createContext, useState, useEffect } from 'react';
import { login, register, verifyOtp, googleLogin, logout, updateUserDetails, resetPassword, refreshToken } from '../services/auth'; // Import refreshToken from auth service
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide authentication state and actions
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store the current user
    const [loading, setLoading] = useState(true); // Track loading state
    const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent during registration
    const navigate = useNavigate();

    // Load the user from localStorage when the component mounts
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            const userFromStorage = JSON.parse(localStorage.getItem('user'));
            setUser(userFromStorage);
        }
        setLoading(false);
    }, []);

    // Function to check and refresh tokens if needed
    const checkAndRefreshToken = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const refreshTokenValue = localStorage.getItem('refresh_token');

            // If both tokens are available, try refreshing
            if (!accessToken && refreshTokenValue) {
                await refreshToken();
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle token refresh failure (logout the user or show error)
        }
    };

    // Handle user login
    const handleLogin = async (credentials) => {
        try {
            const response = await login(credentials);
            if (response.tokens) {
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('access_token', response.tokens.access);
                localStorage.setItem('refresh_token', response.tokens.refresh);
                setUser(response.user);
                navigate('/dashboard'); // Navigate to the dashboard after successful login
            }
        } catch (error) {
            if (error.message === 'Please verify your email before logging in.') {
                throw new Error('Please verify your email before logging in.');
            } else {
                console.error('Login failed:', error);
                throw error;
            }
        }
    };

    // Handle user registration
    const handleRegister = async (data) => {
        try {
            const response = await register(data);
            if (response.otp_sent) {
                setOtpSent(true); // Set OTP sent state
            } else {
                throw new Error('OTP could not be sent. Please try again.');
            }
            return response; // Return response to indicate registration success and OTP sent
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    // Handle OTP verification during registration
    const handleVerifyOtp = async (otpData) => {
        try {
            // Make sure `email` and `otp` are both present and correctly passed
            const response = await verifyOtp({ email: otpData.email, otp: otpData.otp });
            if (response.success) {
                setUser(response.user); // Set the user after successful OTP verification
                navigate('/login'); // Redirect to login after OTP verification
            } else {
                throw new Error('OTP verification failed.');
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        }
    };

    // Handle Google OAuth login
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await googleLogin({ token: credentialResponse.credential });
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('access_token', response.tokens.access);
            localStorage.setItem('refresh_token', response.tokens.refresh);
            setUser(response.user);
            navigate('/dashboard'); // Navigate to the dashboard after successful login
        } catch (error) {
            console.error('Google login failed:', error);
            throw error;
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/login'); // Navigate to the login page after logout
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    // Handle user details update
    const handleUpdateUser = async (data) => {
        try {
            const response = await updateUserDetails(data);
            localStorage.setItem('user', JSON.stringify(response.user)); // Update user in localStorage
            setUser(response.user); // Update the user state
            return response;
        } catch (error) {
            console.error('Failed to update user details:', error);
            throw error;
        }
    };

    // Handle password reset
    const handleResetPassword = async (data) => {
        try {
            const response = await resetPassword(data);
            return response;
        } catch (error) {
            console.error('Failed to reset password:', error);
            throw error;
        }
    };

    // Use the token refresh on each session check
    useEffect(() => {
        checkAndRefreshToken();
    }, []);

    // Provide the user state and authentication actions
    return (
        <AuthContext.Provider value={{
            user,
            loading,
            otpSent,
            handleLogin,
            handleRegister,
            handleVerifyOtp,
            handleGoogleLogin,
            handleLogout,
            handleUpdateUser,
            handleResetPassword
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
