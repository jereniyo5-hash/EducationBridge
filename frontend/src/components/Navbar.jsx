import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const AnimatedAvatar = () => {
    const name = "JEREMIE";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % name.length);
        }, 500); // Change letter every 500ms
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="logo-icon avatar-logo" style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'white' }}>
            {name[index]}
        </div>
    );
};

const Navbar = ({ setIsChatOpen }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [user, setUser] = useState(null);
    const [isNavShowing, setIsNavShowing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const isExamPage = location.pathname.includes('/take-exam') || location.pathname.includes('/assessment') || location.pathname.includes('/create-exam');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <nav className="navbar">
            {/* Right Sidebar Menu */}
            <div className={`right-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Menu Options</h3>
                    <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
                        <i className="uil uil-multiply"></i>
                    </button>
                </div>
                <div className="sidebar-content">
                    <button onClick={toggleTheme} className="sidebar-link">
                        <i className={theme === 'light' ? "uil uil-moon" : "uil uil-sun"}></i>
                        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    </button>
                    {!user ? (
                        <Link to="/login" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                            <i className="uil uil-sign-in-alt"></i> Login
                        </Link>
                    ) : (
                        <button className="sidebar-link" style={{ color: '#ff4c60', marginTop: 'auto' }} onClick={() => {
                            localStorage.removeItem('user'); 
                            localStorage.removeItem('token'); 
                            window.location.href='/';
                        }}>
                            <i className="uil uil-sign-out-alt"></i> Logout
                        </button>
                    )}
                    
                    {user && (
                        <Link to={
                            user?.role?.toLowerCase() === 'admin' ? '/admin-dashboard' :
                            user?.role?.toLowerCase() === 'teacher' ? '/teacher-dashboard' :
                            '/dashboard'
                        } className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                            <i className="uil uil-dashboard"></i> Dashboard
                        </Link>
                    )}
                </div>
            </div>
            {/* Overlay for closing sidebar when clicking outside */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className="container nav-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link to="/" className="nav-logo">
                        <AnimatedAvatar />
                        <div className="animated-logo-text">
                            <span className="static-text">EDUCATION BRIDGE</span>
                        </div>
                    </Link>
                </div>
                <ul className={`nav-menu ${isNavShowing ? 'show-nav' : ''}`}>
                    <li><Link to="/" onClick={() => setIsNavShowing(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsNavShowing(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setIsNavShowing(false)}>Contact</Link></li>
                    <li><Link to="/subject" onClick={() => setIsNavShowing(false)}>Subject</Link></li>
                    <li><Link to="/lesson-plan" className="nav-btn-link lessonplan-nav-btn" onClick={() => setIsNavShowing(false)}><i className="uil uil-file-edit"></i> Lesson Plan</Link></li>
                    {user && (
                        <li>
                            <Link to={
                                user?.role?.toLowerCase() === 'admin' ? '/admin-dashboard' :
                                user?.role?.toLowerCase() === 'teacher' ? '/teacher-dashboard' :
                                '/dashboard'
                            } onClick={() => setIsNavShowing(false)}>Dashboard</Link>
                        </li>
                    )}
                    {!user ? (
                        <>
                            <li><Link to="/login" className="nav-btn-link login-btn" style={{ background: 'transparent', border: '1px solid white', color: 'white' }} onClick={() => setIsNavShowing(false)}>Login</Link></li>
                            <li><Link to="/signup" className="nav-btn-link signup-btn" onClick={() => setIsNavShowing(false)}>Sign Up</Link></li>
                        </>
                    ) : (
                        <li>
                            <button className="nav-btn-link logout-btn" style={{ background: '#ff4c60', border: 'none', cursor: 'pointer', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', fontWeight: 'bold' }} onClick={() => {
                                localStorage.removeItem('user'); 
                                localStorage.removeItem('token'); 
                                window.location.href='/';
                            }}>
                                Logout
                            </button>
                        </li>
                    )}
                    <li className="desktop-only" style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)} title="Settings">
                            <i className="uil uil-setting"></i>
                        </button>
                    </li>
                    <li className="mobile-only">
                        <button className="mobile-setting-btn" onClick={() => { setIsNavShowing(false); setIsSidebarOpen(true); }}>
                            <i className="uil uil-setting"></i> Settings
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
