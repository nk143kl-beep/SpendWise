import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="brand-logo">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>SpendWise</span>
            </Link>
            <ul className="navbar-links">
                <Link to="/" className="navbar-item">Home</Link>
                {user && <Link to="/dashboard" className="navbar-item">Dashboard</Link>}
                {user && <Link to="/reports" className="navbar-item">Reports</Link>}
                {user && <Link to="/profile" className="navbar-item">Profile</Link>}
            </ul>
            <div className="navbar-actions">
                {user ? (
                    <button className="btn-primary" onClick={onLogout}>Logout</button>
                ) : (
                    <Link to="/login">
                        <button className="btn-primary">Login / Sign Up</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
