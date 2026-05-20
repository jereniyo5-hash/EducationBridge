import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = `${API_URL}/api/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                if (data.status === 'success') {
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
                    setError(data.error || 'Invalid credentials.');
                }
            } else {
                setError(data.error || 'Invalid credentials.');
            }
        } catch (error) {
            console.error(error);
            setError('Error connecting to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError(null);
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                const response = await fetch(`${API_URL}/api/google-auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ access_token: tokenResponse.access_token })
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
                    setError(data.error || 'Google authentication failed.');
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError('Network error during Google authentication.');
                setLoading(false);
            }
        },
        onError: () => {
            setError('Google Login was unsuccessful.');
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
                    <h2>Welcome <span className="gradient-text">Back</span></h2>
                    <p>Continue your learning journey.</p>
                </div>
                
                {error && <div className="auth-error-badge">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <i className="uil uil-user"></i>
                        <input 
                            type="text" 
                            name="identifier" 
                            placeholder="Username or Email" 
                            value={formData.identifier} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="uil uil-lock"></i>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Login'}
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        Continue with Google
                    </button>
                    
                    <div className="auth-footer">
                        Don't have an account yet? <Link to="/signup">Sign Up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
