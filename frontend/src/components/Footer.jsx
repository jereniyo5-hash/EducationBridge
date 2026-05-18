import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-elegant">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <div className="footer-icon">
                            <i className="uil uil-graduation-cap"></i>
                        </div>
                        <h3>Educational_Bridge</h3>
                    </Link>
                    <p className="footer-bio">Empowering Rwandan students from Primary 1 to Senior 6 with comprehensive end-unit assessments. Prepare for your national exams efficiently.</p>
                </div>
                
                <div className="footer-links-group">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/subject">Subjects Matrix</Link></li>
                    </ul>
                </div>
                
                <div className="footer-links-group">
                    <h4>Legal & Privacy</h4>
                    <ul className="footer-links">
                        <li><Link to="#">Privacy Policy</Link> </li>
                        <li><Link to="#">Terms and Conditions</Link> </li>
                        <li><Link to="#">Refund Policy</Link> </li>
                        <li><Link to="#">Accessibility Statement</Link> </li>
                    </ul>
                </div>
                
                <div className="footer-contact">
                    <h4>Reach Out</h4>
                    <div className="contact-detail">
                        <i className="uil uil-phone"></i>
                        <a href="tel:+250787065284" style={{ color: 'inherit', textDecoration: 'none' }}>+250 787 065 284</a>
                    </div>
                    <div className="contact-detail">
                        <i className="uil uil-envelope"></i>
                        <a href="mailto:niyogisubizojeremie73@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>niyogisubizojeremie73@gmail.com</a>
                    </div>
                    
                    <div className="footer-socials">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="uil uil-linkedin"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="uil uil-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="uil uil-instagram"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="uil uil-facebook-f"></i></a>
                    </div>
                 </div>
            </div>
            
            <div className="footer-bottom">
                <div className="container bottom-container">
                    <p>&copy; {new Date().getFullYear()} Educational_Bridge. All rights reserved.</p>
                    <p className="footer-credit">Designed for Excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
