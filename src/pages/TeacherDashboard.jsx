import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const TeacherDashboard = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    navigate('/login');
                    return;
                }
                const user = JSON.parse(userStr);
                if (user.role !== 'teacher') {
                    navigate('/dashboard');
                    return;
                }

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/exams`);
                const data = await response.json();

                if (response.ok) {
                    // Filter exams created by this teacher
                    // In real app, backend should handle this, but here we filter by teacher_id or teacher_name
                    const teacherExams = data.exams.filter(e => e.teacher_id === user.id || e.teacher_name === user.full_name);
                    setExams(teacherExams);
                } else {
                    setError('Failed to fetch exams.');
                }
            } catch (err) {
                console.error("Error fetching teacher data:", err);
                setError('Network error. Please try again later.');
            }
            setLoading(false);
        };
        fetchExams();
    }, [navigate]);

    const handleDeleteExam = async (id) => {
        if (!window.confirm('Are you sure you want to delete this exam?')) return;
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/exams/${id}?teacher_id=${user.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setExams(exams.filter(e => e.id !== id));
            } else {
                alert('Failed to delete exam.');
            }
        } catch (err) {
            console.error("Error deleting exam:", err);
        }
    };

    if (loading) return <div className="dashboard-loading">Loading Teacher Dashboard...</div>;

    const userState = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Teacher <span className="gradient-text">Portal</span></h1>
                    <p>Manage your assessments, track student submissions, and create new challenges.</p>
                </div>
                <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => navigate('/create-exam')}>
                        <i className="uil uil-plus-circle"></i> Create New Exam
                    </button>
                </div>
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card interactive-card">
                    <div className="stat-icon"><i className="uil uil-file-alt"></i></div>
                    <div className="stat-info">
                        <h3>{exams.length}</h3>
                        <p>Exams Created</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(54, 162, 235, 0.1)', color: '#36a2eb' }}>
                        <i className="uil uil-users-alt"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Active</h3>
                        <p>Status</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(75, 192, 192, 0.1)', color: '#4bc0c0' }}>
                        <i className="uil uil-award"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Graded</h3>
                        <p>Assessments</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-history">
                <div className="section-header">
                    <h2>Your Exams</h2>
                </div>
                {exams.length === 0 ? (
                    <div className="empty-history interactive-card">
                        <i className="uil uil-file-question"></i>
                        <h3>No Exams Created</h3>
                        <p>Start by creating your first exam to share with students.</p>
                        <button className="btn btn-primary mt-3" onClick={() => navigate('/create-exam')}>Create Now</button>
                    </div>
                ) : (
                    <div className="teacher-exams-list">
                        {exams.map((exam) => (
                            <div key={exam.id} className="exam-management-card interactive-card">
                                <div className="exam-card-info">
                                    <h3>{exam.subject_name}</h3>
                                    <div className="exam-meta">
                                        <span className="badge-level">{exam.year_level}</span>
                                        <span className="exam-time"><i className="uil uil-clock"></i> {exam.time_limit} mins</span>
                                    </div>
                                </div>
                                <div className="exam-card-actions">
                                    <button className="btn-icon" onClick={() => navigate(`/submissions?examId=${exam.id}`)} title="View Submissions">
                                        <i className="uil uil-eye"></i> Submissions
                                    </button>
                                    <button className="btn-icon delete" onClick={() => handleDeleteExam(exam.id)} title="Delete Exam">
                                        <i className="uil uil-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .teacher-exams-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                .exam-management-card {
                    padding: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 4px solid var(--first-color);
                }
                .exam-card-info h3 {
                    margin-bottom: 0.5rem;
                    font-size: 1.25rem;
                }
                .exam-meta {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    color: var(--text-color-light);
                    font-size: 0.9rem;
                }
                .exam-time {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .exam-card-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                .btn-icon {
                    background: var(--container-color);
                    border: 1px solid var(--first-color);
                    color: var(--first-color);
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .btn-icon:hover {
                    background: var(--first-color);
                    color: white;
                }
                .btn-icon.delete {
                    border-color: #ff4c60;
                    color: #ff4c60;
                }
                .btn-icon.delete:hover {
                    background: #ff4c60;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default TeacherDashboard;
