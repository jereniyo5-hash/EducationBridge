import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Chat from '../components/Chat';
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
                    // Sort items by date for the chart
                    const sortedProgress = (data.progress || []).sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
                    setProgress(sortedProgress);
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

    // Prepare chart data - only include graded exams for the score chart
    const chartData = progress
        .filter(p => p.score !== null)
        .map(p => ({
            name: new Date(p.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            score: p.score,
            subject: p.subject_name
        }));

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
                        <h3>{progress.filter(p => p.score !== null).length}</h3>
                        <p>Graded Exams</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(0, 191, 142, 0.1)', color: '#00bf8e' }}>
                        <i className="uil uil-clock-three"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{progress.length > 0 ? new Date(progress[progress.length-1].submitted_at).toLocaleDateString() : 'N/A'}</h3>
                        <p>Last Activity</p>
                    </div>
                </div>
            </div>

            {chartData.length > 0 && (
                <div className="dashboard-chart-section interactive-card">
                    <div className="chart-header">
                        <h2>Personal Progress Trend</h2>
                        <p>Visualizing your assessment scores over time</p>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4361ee" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`${value}%`, 'Score']}
                                />
                                <Area type="monotone" dataKey="score" stroke="#4361ee" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="dashboard-history">
                <div className="section-header">
                    <h2>Your Assessment History</h2>
                    {progress.length > 0 && <span className="history-count">{progress.length} items</span>}
                </div>
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
                                    <th>Score</th>
                                    <th>Status</th>
                                    <th>Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {progress.map((item) => (
                                    <tr key={item.submission_id}>
                                        <td>
                                            <div className="subject-cell">
                                                <strong>{item.subject_name}</strong>
                                                <span className="badge-level">{item.year_level}</span>
                                            </div>
                                        </td>
                                        <td>{item.teacher_name}</td>
                                        <td>
                                            {item.score !== null ? (
                                                <span className={`score-badge ${item.score >= 50 ? 'pass' : 'fail'}`}>
                                                    {item.score}%
                                                </span>
                                            ) : (
                                                <span className="score-badge pending">N/A</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge-status ${item.score !== null ? 'graded' : 'submitted'}`}>
                                                <i className={`uil ${item.score !== null ? 'uil-award' : 'uil-check-circle'}`}></i>
                                                {item.score !== null ? 'Graded' : 'Submitted'}
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

            <div className="dashboard-chat-section" style={{ marginTop: '3rem' }}>
                <div className="section-header">
                    <h2>Direct Messaging</h2>
                    <p>Connect with your teachers to ask questions and get help.</p>
                </div>
                <Chat currentUser={userState} isTeacher={false} />
            </div>

            <style jsx>{`
                .dashboard-chart-section {
                    margin-bottom: 2.5rem;
                    padding: 1.5rem;
                }
                .chart-header {
                    margin-bottom: 1.5rem;
                }
                .chart-header h2 {
                    margin-bottom: 0.25rem;
                }
                .chart-header p {
                    color: var(--text-color-light);
                    font-size: 0.9rem;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .history-count {
                    background: var(--first-color-lighter);
                    color: var(--first-color);
                    padding: 0.2rem 0.8rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .subject-cell {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                }
                .score-badge {
                    padding: 0.3rem 0.6rem;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 0.9rem;
                }
                .score-badge.pass { background-color: rgba(0, 191, 142, 0.1); color: #00bf8e; }
                .score-badge.fail { background-color: rgba(255, 76, 96, 0.1); color: #ff4c60; }
                .score-badge.pending { background-color: #f0f0f0; color: #888; }
                
                .badge-status.graded {
                    background-color: rgba(54, 162, 235, 0.1);
                    color: #36a2eb;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
