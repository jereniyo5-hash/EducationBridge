import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Dashboard.css'; // Reusing some base styles

const AdminDashboard = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('testimonials');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
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
                
                // Fetch testimonials
                const tResponse = await fetch(`${API_URL}/api/testimonials?all=true`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const tData = await tResponse.json();

                // Fetch users
                const uResponse = await fetch(`${API_URL}/api/admin/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const uData = await uResponse.json();

                if (tResponse.ok) setTestimonials(tData.testimonials || []);
                if (uResponse.ok) setUsers(uData.users || []);
                
                if (!tResponse.ok || !uResponse.ok) {
                    setError('Failed to fetch platform data.');
                }
            } catch (err) {
                console.error("Error fetching admin data:", err);
                setError('Network error. Please try again later.');
            }
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/testimonials/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_approved: true } : t));
                toast.success('Testimonial approved!');
            }
        } catch (err) {
            toast.error('Error approving testimonial.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/testimonials/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setTestimonials(testimonials.filter(t => t.id !== id));
                toast.success('Testimonial deleted.');
            }
        } catch (err) {
            toast.error('Error deleting testimonial.');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (response.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
                toast.success(`User role updated to ${newRole}`);
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to update role');
            }
        } catch (err) {
            toast.error('Network error updating role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Careful! Deleting a user is permanent. Proceed?')) return;
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setUsers(users.filter(u => u.id !== userId));
                toast.success('User removed from platform.');
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to delete user');
            }
        } catch (err) {
            toast.error('Network error deleting user');
        }
    };

    if (loading) return <div className="dashboard-loading">Loading Admin Panel...</div>;

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Admin <span className="gradient-text">Control Center</span></h1>
                    <p>Manage platform content, users, and oversee operations.</p>
                </div>
                <div className="admin-badge">ADMIN</div>
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card interactive-card" onClick={() => setActiveTab('testimonials')} style={{ cursor: 'pointer', borderBottom: activeTab === 'testimonials' ? '4px solid var(--first-color)' : 'none' }}>
                    <div className="stat-icon"><i className="uil uil-comment-message"></i></div>
                    <div className="stat-info">
                        <h3>{testimonials.length}</h3>
                        <p>Total Testimonials</p>
                    </div>
                </div>
                <div className="stat-card interactive-card" onClick={() => setActiveTab('users')} style={{ cursor: 'pointer', borderBottom: activeTab === 'users' ? '4px solid var(--first-color)' : 'none' }}>
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(54, 162, 235, 0.1)', color: '#36a2eb' }}>
                        <i className="uil uil-users-alt"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{users.length}</h3>
                        <p>Registered Users</p>
                    </div>
                </div>
                <div className="stat-card interactive-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}>
                        <i className="uil uil-clock-three"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{testimonials.filter(t => !t.is_approved).length}</h3>
                        <p>Pending Feedback</p>
                    </div>
                </div>
            </div>

            <div className="admin-tab-content">
                {activeTab === 'testimonials' ? (
                    <div className="dashboard-history">
                        <div className="section-header">
                            <h2>Testimonial Management</h2>
                        </div>
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
                ) : (
                    <div className="dashboard-history">
                        <div className="section-header">
                            <h2>User Management</h2>
                        </div>
                        <div className="history-table-container interactive-card">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>User Info</th>
                                        <th>Current Role</th>
                                        <th>Change Role</th>
                                        <th>Registered</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar-small">
                                                        {u.avatar_url ? (
                                                            <img src={u.avatar_url} alt="" />
                                                        ) : (
                                                            (u.full_name || u.username || 'U').charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <strong>{u.full_name || u.username}</strong>
                                                        <span className="user-email">{u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`role-badge ${u.role}`}>{u.role}</span>
                                            </td>
                                            <td>
                                                <select 
                                                    className="role-selector" 
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="teacher">Teacher</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <button className="btn-delete-small" onClick={() => handleDeleteUser(u.id)}>
                                                    <i className="uil uil-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                .section-header {
                    margin-bottom: 1.5rem;
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

                /* User Table Styles */
                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }
                .user-avatar-small {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: var(--first-color-lighter);
                    color: var(--first-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    overflow: hidden;
                }
                .user-avatar-small img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .user-email {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--text-color-light);
                }
                .role-badge {
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .role-badge.admin { background: rgba(67, 97, 238, 0.1); color: #4361ee; }
                .role-badge.teacher { background: rgba(54, 162, 235, 0.1); color: #36a2eb; }
                .role-badge.student { background: rgba(108, 117, 125, 0.1); color: #6c757d; }

                .role-selector {
                    padding: 0.4rem;
                    border-radius: 6px;
                    border: 1px solid var(--card-border);
                    background: var(--bg-color);
                    color: var(--text-color);
                    outline: none;
                    cursor: pointer;
                }
                .btn-delete-small {
                    background: none;
                    border: none;
                    color: #ff4c60;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: 0.3s;
                }
                .btn-delete-small:hover { transform: scale(1.2); }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
