import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: 'student',
        full_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        avatar: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            setFormData({
                ...formData,
                avatar: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = `${API_URL}/api/signup`;

            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    submitData.append(key, formData[key]);
                }
            });

            const response = await fetch(endpoint, {
                method: 'POST',
                body: submitData
            });

            const data = await response.json();
            
            if (response.ok) {
                // Save token and push to home
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
                window.location.reload(); // Quick way to update navbar state if needed
            } else {
                setError(data.error || 'Failed to create account.');
            }
        } catch (error) {
            console.error(error);
            setError('Error connecting to the server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create an Account</h2>
                <p>Join Educational_Bridge properly</p>
                
                {error && <div className="auth-error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                
                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="form-group role-selector">
                        <label className="radio-label">
                            <input 
                                type="radio" 
                                name="role" 
                                value="student" 
                                checked={formData.role === 'student'} 
                                onChange={handleChange} 
                            /> Student
                        </label>
                        <label className="radio-label">
                            <input 
                                type="radio" 
                                name="role" 
                                value="teacher" 
                                checked={formData.role === 'teacher'} 
                                onChange={handleChange} 
                            /> Teacher
                        </label>
                    </div>

                    <div className="form-group">
                        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Profile Picture:</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} style={{ color: 'var(--text-primary)' }} />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="google-auth-separator">
                        <span>OR</span>
                    </div>

                    <button type="button" className="btn btn-secondary google-btn" onClick={() => alert('Google signup coming soon!')}>
                        <i className="uil uil-google"></i> Continue with Google
                    </button>
                    
                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
