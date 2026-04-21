import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Reusing some base styles

const AdminDashboard = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const userStr = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                if (!userStr || !token) {
                    navigate('/login');
                    return;
                }
                const user = JSON.parse(userStr);
                if (user.role !== 'admin') {
                    navigate('/dashboard');
                    return;
                }

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/testimonials?all=true`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setTestimonials(data.testimonials || []);
                } else {
                    setError('Failed to fetch testimonials.');
                }
            } catch (err) {
                console.error("Error fetching admin data:", err);
                setError('Network error. Please try again later.');
            }
            setLoading(false);
        };
        fetchTestimonials();
    }, [navigate]);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/testimonials/${id}/approve`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_approved: true } : t));
            }
        } catch (err) {
            console.error("Error approving testimonial:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/testimonials/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setTestimonials(testimonials.filter(t => t.id !== id));
            }
        } catch (err) {
            console.error("Error deleting testimonial:", err);
        }
    };

    if (loading) return <div className="dashboard-loading">Loading Admin Panel...</div>;

    const userState = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Admin <span className="gradient-text">Control Center</span></h1>
                    <p>Manage platform content, approve testimonials, and oversee operations.</p>
                </div>
                <div className="admin-badge">ADMIN</div>
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card interactive-card">
                    <div className="stat-icon"><i className="uil uil-comment-message"></i></div>
                    <div className="stat-info">
                        <h3>{testimonials.length}</h3>
                        <p>Total Testimonials</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}>
                        <i className="uil uil-clock-three"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{testimonials.filter(t => !t.is_approved).length}</h3>
                        <p>Pending Approval</p>
                    </div>
                </div>
                <div className="stat-card interactive-card" onClick={() => navigate('/subject')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff' }}>
                        <i className="uil uil-external-link-alt"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Access</h3>
                        <p>Browse All Subjects</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-history">
                <h2>Testimonial Management</h2>
                {testimonials.length === 0 ? (
                    <div className="empty-history interactive-card">
                        <i className="uil uil-comment-slash"></i>
                        <h3>No Testimonials Yet</h3>
                        <p>User feedback will appear here for your review.</p>
                    </div>
                ) : (
                    <div className="testimonials-admin-list">
                        {testimonials.map((t) => (
                            <div key={t.id} className={`testimonial-admin-card interactive-card ${!t.is_approved ? 'pending' : ''}`}>
                                <div className="t-admin-header">
                                    <div className="t-admin-info">
                                        <strong>{t.name}</strong>
                                        <span>({t.role})</span>
                                    </div>
                                    <span className={`status-badge ${t.is_approved ? 'approved' : 'pending'}`}>
                                        {t.is_approved ? 'Approved' : 'Pending'}
                                    </span>
                                </div>
                                <p className="t-admin-comment">"{t.comment}"</p>
                                <div className="t-admin-actions">
                                    {!t.is_approved && (
                                        <button className="btn-approve" onClick={() => handleApprove(t.id)}>
                                            <i className="uil uil-check"></i> Approve
                                        </button>
                                    )}
                                    <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                                        <i className="uil uil-trash-alt"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <style jsx>{`
                .admin-badge {
                    background: var(--gradient-primary);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .testimonials-admin-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .testimonial-admin-card {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .testimonial-admin-card.pending {
                    border-left: 4px solid #ffc107;
                }
                .t-admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .t-admin-info strong {
                    display: block;
                    font-size: 1.1rem;
                }
                .t-admin-info span {
                    font-size: 0.85rem;
                    color: var(--text-color-light);
                }
                .status-badge {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    text-transform: uppercase;
                    font-weight: 600;
                }
                .status-badge.approved { background: rgba(0, 191, 142, 0.1); color: #00bf8e; }
                .status-badge.pending { background: rgba(255, 193, 7, 0.1); color: #ffc107; }
                
                .t-admin-comment {
                    font-style: italic;
                    color: var(--text-color);
                    flex-grow: 1;
                }
                .t-admin-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .t-admin-actions button {
                    border: none;
                    border-radius: 8px;
                    padding: 0.6rem 1rem;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.3s ease;
                }
                .btn-approve {
                    background: #00bf8e;
                    color: white;
                }
                .btn-approve:hover { background: #00a87d; transform: translateY(-2px); }
                .btn-delete {
                    background: rgba(255, 76, 96, 0.1);
                    color: #ff4c60;
                }
                .btn-delete:hover { background: #ff4c60; color: white; transform: translateY(-2px); }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
