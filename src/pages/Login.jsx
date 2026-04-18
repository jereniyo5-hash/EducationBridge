import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
                // Save token and push to home
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
                window.location.reload(); // Quick way to update navbar state if needed
            } else {
                setError(data.error || 'Invalid credentials.');
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
                <h2>Welcome Back</h2>
                <p>Login to your Educational_Bridge account</p>
                
                {error && <div className="auth-error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="identifier" 
                            placeholder="Username or Email" 
                            value={formData.identifier} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
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
