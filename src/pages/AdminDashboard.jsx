import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Admin Command Center</h1>
                <p>Welcome back, {user.username}. You have full control.</p>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <i className="uil uil-users-alt"></i>
                    <h3>User Management</h3>
                    <p>View and manage all registered students and teachers.</p>
                    <button className="btn btn-secondary">Manage Users</button>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-book-open"></i>
                    <h3>Content Moderation</h3>
                    <p>Approve or remove study materials and assessments.</p>
                    <button className="btn btn-secondary">Review Content</button>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-comment-message"></i>
                    <h3>Testimonials</h3>
                    <p>Moderate user feedback and testimonials.</p>
                    <Link to="/testimonies" className="btn btn-primary">Manage Testimonies</Link>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-chart-line"></i>
                    <h3>Platform Analytics</h3>
                    <p>Overview of platform growth and engagement.</p>
                    <button className="btn btn-secondary">View Stats</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
