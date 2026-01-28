import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match.' });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>User <span className="text-gradient">Profile</span></h1>
                <p>Manage your account settings and security.</p>
            </header>

            <div className="profile-grid">
                <div className="profile-info-card">
                    <h3>Account Information</h3>
                    <div className="info-group">
                        <label>Full Name</label>
                        <div className="info-value">{user.fullName}</div>
                    </div>
                    <div className="info-group">
                        <label>Email Address</label>
                        <div className="info-value">{user.email}</div>
                    </div>
                </div>

                <div className="password-card">
                    <h3>Update Password</h3>
                    {status.message && (
                        <div className={`status-msg ${status.type}`}>
                            {status.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="update-btn">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
