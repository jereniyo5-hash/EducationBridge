import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    navigate('/login');
                    return;
                }
                const user = JSON.parse(userStr);
                
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/student/progress/${user.id}`);
                const data = await response.json();
                
                if (response.ok) {
                    setProgress(data.progress || []);
                } else {
                    setError('Failed to fetch progress.');
                }
            } catch (err) {
                console.error("Error fetching progress:", err);
                setError('Network error. Please try again later.');
            }
            setLoading(false);
        };
        fetchProgress();
    }, [navigate]);

    if (loading) return <div className="dashboard-loading">Loading Dashboard...</div>;

    if (error) return (
        <div className="dashboard-error-container">
            <div className="interactive-card error-card">
                <i className="uil uil-exclamation-circle"></i>
                <h2>Oops!</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
            </div>
        </div>
    );

    const userState = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Welcome back, <span className="gradient-text">{userState.full_name || userState.username}</span>!</h1>
                    <p>Track your academic journey and view your completed assessments.</p>
                </div>
                {userState.avatar_url ? (
                    <img src={userState.avatar_url.startsWith('http') ? userState.avatar_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${userState.avatar_url}`} alt="Profile" className="dashboard-avatar" />
                ) : (
                    <div className="dashboard-avatar-placeholder">
                        {(userState.full_name || userState.username || 'U').charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card interactive-card">
                    <div className="stat-icon"><i className="uil uil-books"></i></div>
                    <div className="stat-info">
                        <h3>{progress.length}</h3>
                        <p>Total Exams Submitted</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 76, 96, 0.1)', color: '#ff4c60' }}>
                        <i className="uil uil-star"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{progress.some(p => p.score !== null) ? progress.filter(p => p.score !== null).length : 0}</h3>
                        <p>Graded Exams</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(0, 191, 142, 0.1)', color: '#00bf8e' }}>
                        <i className="uil uil-clock-three"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{progress.length > 0 ? new Date(progress[0].submitted_at).toLocaleDateString() : 'N/A'}</h3>
                        <p>Last Activity</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-history">
                <h2>Your Assessment History</h2>
                {progress.length === 0 ? (
                    <div className="empty-history interactive-card">
                        <i className="uil uil-folder-open"></i>
                        <h3>No Exams Taken Yet</h3>
                        <p>Head over to the subjects page to take your first assessment.</p>
                        <button className="btn btn-primary mt-3" onClick={() => navigate('/subject')}>Browse Subjects</button>
                    </div>
                ) : (
                    <div className="history-table-container interactive-card">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Subject & Level</th>
                                    <th>Teacher</th>
                                    <th>Status</th>
                                    <th>Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {progress.map((item) => (
                                    <tr key={item.submission_id}>
                                        <td>
                                            <strong>{item.subject_name}</strong>
                                            <span className="badge-level">{item.year_level}</span>
                                        </td>
                                        <td>{item.teacher_name}</td>
                                        <td>
                                            <span className="badge-status submitted">
                                                <i className="uil uil-check-circle"></i> Submitted
                                            </span>
                                        </td>
                                        <td>{new Date(item.submitted_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
