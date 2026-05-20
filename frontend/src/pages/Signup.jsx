import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: 'student',
        username: '',
        email: '',
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
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on role (reusing logic from Login)
                if (data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (data.user.role === 'teacher') {
                    navigate('/teacher-dashboard');
                } else {
                    navigate('/dashboard');
                }
                window.location.reload(); 
            } else {
                setError(data.error || 'Failed to create account.');
            }
        } catch (error) {
            console.error(error);
            setError('Error connecting to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError(null);
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                const response = await fetch(`${API_URL}/api/google-auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        access_token: tokenResponse.access_token,
                        role: formData.role // Send selected role
                    })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    if (data.user.role === 'admin') {
                        navigate('/admin-dashboard');
                    } else if (data.user.role === 'teacher') {
                        navigate('/teacher-dashboard');
                    } else {
                        navigate('/dashboard');
                    }
                    window.location.reload();
                } else {
                    setError(data.error || 'Google signup failed.');
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError('Network error during Google signup.');
                setLoading(false);
            }
        },
        onError: () => {
            setError('Google Signup was unsuccessful.');
        }
    });

    return (
        <div className="auth-container">
            {/* Torch Spotlight Scene */}
            <div className="spotlight-scene">
                <div className="torch-lamp">
                    <div className="lamp-shade-side"></div>
                    <div className="lamp-bulb-bright-side"></div>
                    <div className="lamp-light-cone-side"></div>
                </div>
                <div className="torch-lamp-left">
                    <div className="lamp-shade-side"></div>
                    <div className="lamp-bulb-bright-side"></div>
                    <div className="lamp-light-cone-side"></div>
                </div>
            </div>

            <div className="auth-card glass-morphism" style={{ zIndex: 10 }}>
                <div className="auth-header">
                    <h2>Join <span className="gradient-text">Educational_Bridge</span></h2>
                    <p>Unlock your learning potential today.</p>
                </div>
                
                {error && <div className="auth-error-badge">{error}</div>}
                
                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="role-toggle">
                        <label className={`role-option ${formData.role === 'student' ? 'active' : ''}`}>
                            <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} />
                            <span><i className="uil uil-graduation-cap"></i> Student</span>
                        </label>
                        <label className={`role-option ${formData.role === 'teacher' ? 'active' : ''}`}>
                            <input type="radio" name="role" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                            <span><i className="uil uil-presentation-edit"></i> Teacher</span>
                        </label>
                    </div>

                    <div className="input-group">
                        <i className="uil uil-user"></i>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    </div>
                    
                    <div className="input-group">
                        <i className="uil uil-envelope"></i>
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="input-group">
                        <i className="uil uil-lock"></i>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="avatar-upload-container">
                        <label className="avatar-upload-label">
                            {formData.avatar ? (
                                <img src={URL.createObjectURL(formData.avatar)} alt="Avatar Preview" className="avatar-preview" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <i className="uil uil-camera"></i>
                                    <span>Upload</span>
                                </div>
                            )}
                            <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Sign Up'}
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="google-btn" onClick={handleGoogleSignup}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        Continue with Google
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
