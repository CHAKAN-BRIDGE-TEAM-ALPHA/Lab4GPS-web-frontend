import api from './api'; // Import the axios instance

// Register a new user and send OTP for verification
export const register = async (data) => {
    try {
        const response = await api.post('/auth/register/', data); // Register the user and trigger OTP
        return response.data; // Return the response data, including OTP sent status
    } catch (error) {
        console.error('Error during registration:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Verify OTP after registration to activate the user account
export const verifyOtp = async (data) => {
    try {
        // Make sure you're sending `email` and `otp` correctly
        const response = await api.post('/auth/verify-otp/', { email: data.email, otp: data.otp }); // Verify OTP
        return response.data; // Return the response data indicating success or failure
    } catch (error) {
        console.error('Error during OTP verification:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Login a user (only allowed after OTP verification)
export const login = async (data) => {
    try {
        const response = await api.post('/auth/login/', data); // User login
        const { access, refresh } = response.data.tokens; // Extract tokens

        // Store tokens in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during login:', error.response || error);
        if (error.response && error.response.data.detail === "Email not verified") {
            throw new Error('Please verify your email before logging in.');
        }
        throw error.response ? error.response.data : error; // Return any other error messages
    }
};

// Google login (can be handled similarly with OTP verification if required)
export const googleLogin = async (data) => {
    try {
        const response = await api.post('/auth/google-login/', data); // Google login
        const { access, refresh } = response.data.tokens;

        // Store tokens in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during Google login:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Refresh the access token using the refresh token
export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
            const response = await api.post('/auth/token/refresh/', { refresh });

            // Update the new access token
            localStorage.setItem('access_token', response.data.access);
            return response.data;
        }
        throw new Error('Refresh token not available');
    } catch (error) {
        console.error('Error during token refresh:', error.response || error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login on token refresh failure
    }
};

// Logout the user and remove tokens
export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        await api.post('/auth/logout/', { refresh: refreshToken }); // Invalidate refresh token

        // Clear tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    } catch (error) {
        console.error('Error during logout:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Update user details
export const updateUserDetails = async (data) => {
    try {
        const response = await api.put('/auth/update/', data); // Assuming you have a PUT endpoint for user updates
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error updating user details:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Reset password from profile
export const resetPassword = async (data) => {
    try {
        const response = await api.post('/auth/reset-password-direct/', data); // Assuming you have a different endpoint for resetting from profile
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error resetting password:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Send OTP for password reset (if still needed)
export const sendOtp = async (data) => {
    try {
        const response = await api.post('/auth/password-reset/', data); // Send OTP for password reset
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during OTP request:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};

// Verify OTP (if still needed for password reset)
export const verifyOtpForPasswordReset = async (data) => {
    try {
        const response = await api.post('/auth/verify-otp/', { email: data.email, otp: data.otp }); // Verify OTP for password reset
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during OTP verification:', error.response || error);
        throw error.response ? error.response.data : error; // Return any error messages
    }
};
