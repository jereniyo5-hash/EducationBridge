import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const TeacherDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Teacher Dashboard</h1>
                <p>Hello, Instructor {user.username}. Manage your classroom efficiently.</p>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <i className="uil uil-plus-circle"></i>
                    <h3>Create New Exam</h3>
                    <p>Construct unit assessments or national exam mocks.</p>
                    <Link to="/create-exam" className="btn btn-primary">Create Exam</Link>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-file-check-alt"></i>
                    <h3>Review Submissions</h3>
                    <p>Grade and review answers from your students.</p>
                    <Link to="/submissions" className="btn btn-secondary">View Grades</Link>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-graduation-cap"></i>
                    <h3>My Students</h3>
                    <p>Track progress and performance of your classes.</p>
                    <Link to="/dashboard" className="btn btn-secondary">Student Stats</Link>
                </div>

                <div className="dashboard-card">
                    <i className="uil uil-comment-info-alt"></i>
                    <h3>Support Hub</h3>
                    <p>Need help? Contact the admin team.</p>
                    <Link to="/contact" className="btn btn-secondary">Contact Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
