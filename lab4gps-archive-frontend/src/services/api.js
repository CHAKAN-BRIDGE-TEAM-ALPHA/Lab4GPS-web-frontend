import axios from 'axios';

// Create an instance of axios with the base URL of your backend API
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api', // Use environment variable for API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set up a request interceptor to include the JWT token in headers for authenticated routes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Set up a response interceptor to refresh the token if it expires
api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    // Check if the response status is 401 and it's not a retry
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            try {
                // Attempt to refresh the access token
                const response = await api.post('/auth/token/refresh/', {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);

                // Update the authorization header with the new access token
                originalRequest.headers.Authorization = `Bearer ${access}`;

                // Retry the original request with the new token
                return api(originalRequest);
            } catch (err) {
                console.error('Token refresh failed:', err);

                // Handle refresh token expiration or failure
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                // Redirect to login page on failed token refresh
                window.location.href = '/login';
            }
        } else {
            console.error('No refresh token found.');
            // Redirect to login page if no refresh token is available
            window.location.href = '/login';
        }
    }

    // Reject any other errors
    return Promise.reject(error);
});

// Generic GET request
export const get = (url) => api.get(url);

// Generic POST request
export const post = (url, data) => api.post(url, data);

// Generic PUT request
export const put = (url, data) => api.put(url, data);

// Generic DELETE request
export const remove = (url) => api.delete(url);

export default api;
