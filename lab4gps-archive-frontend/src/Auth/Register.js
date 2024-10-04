import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/auth'; // Assuming api service for authentication

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook for redirection

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

    return (
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
        </div>
    );
};

export default Register;
