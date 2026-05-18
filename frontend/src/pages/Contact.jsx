import React from 'react';
import './About.css'; // Borrowing About page base styles

const Contact = () => {
    return (
        <main className="container" style={{paddingTop: '7rem', minHeight: '80vh'}}>
            <section id="contact-intro" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="gradient-text">Contact Our Team</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '1rem auto', lineHeight: '1.8' }}>
                    Welcome to the Educational_Bridge Support Hub. If you require technical assistance, academic guidance, or wish to inquire about the platform's architectural framework and services, our team is always available to help you build a more robust educational future.
                </p>
            </section>

            <section id="contact" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '600px', padding: '3rem', background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)' }}>
                <h3 className="gradient-text mb-loose">Get In Touch</h3>
                <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Have questions regarding the application, curriculum, or academic research? 
                    Reach out directly to Niyogisubizo Jeremie below.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="mailto:niyogisubizojeremie73@gmail.com?subject=Inquiry from Educational_Bridge Platform" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <i className="uil uil-envelope-send"></i> Message Directly
                    </a>
                    <a href="tel:+250787065284" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <i className="uil uil-phone"></i> Call Support
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Contact;
