import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails, resetPassword } from '../services/auth'; // Assuming you have API functions for these

const ProfilePage = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login if the user is not authenticated
        }
    }, [user, navigate]);

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await updateUserDetails({ name, email });
            if (response.success) {
                setMessage('Details updated successfully.');
                setEditMode(false);
            } else {
                setError('Failed to update details.');
            }
        } catch (err) {
            setError('Failed to update details.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }
        try {
            const response = await resetPassword({ email, password, newPassword });
            if (response.success) {
                setMessage('Password reset successfully.');
                setPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setError('Failed to reset password.');
            }
        } catch (err) {
            setError('Failed to reset password.');
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h1 className="profile-heading">Your Profile</h1>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!editMode ? (
                        <>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={() => setEditMode(true)} className="edit-button">Edit Details</button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdateDetails} className="edit-form">
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
                            <div className="button-group">
                                <button type="submit" className="primary-button">Save Changes</button>
                                <button onClick={() => setEditMode(false)} className="secondary-button">Cancel</button>
                            </div>
                        </form>
                    )}

                    <h2 className="password-heading">Reset Password</h2>
                    <form onSubmit={handlePasswordReset} className="password-form">
                        <div className="form-group">
                            <label htmlFor="password">Current Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="primary-button">Reset Password</button>
                    </form>

                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
