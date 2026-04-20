import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ setIsChatOpen }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [user, setUser] = useState(null);
    const [isNavShowing, setIsNavShowing] = useState(false);
    const location = useLocation();
    const isExamPage = location.pathname.includes('/take-exam') || location.pathname.includes('/assessment') || location.pathname.includes('/create-exam');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon">
                        <i className="uil uil-graduation-cap"></i>
                    </div>
                    <h4>Educational_Bridge</h4>
                </Link>
                <ul className={`nav-menu ${isNavShowing ? 'show-nav' : ''}`}>
                    <li><Link to="/" onClick={() => setIsNavShowing(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsNavShowing(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setIsNavShowing(false)}>Contact</Link></li>
                    <li><Link to="/subject" onClick={() => setIsNavShowing(false)}>Subject</Link></li>
                    {!isExamPage && (
                        <li>
                            <Link to="#" className="jeremie-nav-link" style={{ color: '#007bff', fontWeight: 'bold' }} onClick={(e) => {
                                e.preventDefault();
                                setIsNavShowing(false);
                                if (!localStorage.getItem('token')) {
                                    window.location.href = '/login';
                                } else {
                                    setIsChatOpen(true);
                                }
                            }}>Jeremie Ai</Link>
                        </li>
                    )}
                    {user?.role?.toLowerCase() === 'teacher' && <li><Link to="/create-exam" onClick={() => setIsNavShowing(false)}>Create Exam</Link></li>}
                    {user?.role?.toLowerCase() === 'student' && <li><Link to="/dashboard" onClick={() => setIsNavShowing(false)}>Dashboard</Link></li>}
                    {!user && <li><Link to="/login" className="nav-btn-link" onClick={() => setIsNavShowing(false)}>Login</Link></li>}
                    {!user && <li><Link to="/signup" className="nav-btn-link logout-btn" onClick={() => setIsNavShowing(false)}>Sign Up</Link></li>}
                    {user && (
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {user.avatar_url && (
                                <img src={user.avatar_url} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6c63ff' }} />
                            )}
                            <span className="nav-btn-link logout-btn" onClick={() => {localStorage.removeItem('user'); localStorage.removeItem('token'); window.location.href='/';}}>Logout</span>
                        </li>
                    )}
                    <li>
                        <button onClick={toggleTheme} className="theme-toggle-btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Toggle Light/Dark Theme">
                            <i className={theme === 'light' ? "uil uil-moon" : "uil uil-sun"}></i>
                        </button>
                    </li>
                </ul>
                <div className="nav-toggle">
                    <button id="open-menu-btn" onClick={() => setIsNavShowing(true)} style={{ display: isNavShowing ? 'none' : 'block' }}> <i className="uil uil-bars"></i></button>
                    <button id="close-menu-btn" onClick={() => setIsNavShowing(false)} style={{ display: isNavShowing ? 'block' : 'none' }}><i className="uil uil-multiply"></i> </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
