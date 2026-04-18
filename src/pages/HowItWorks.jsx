import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <main className="container" style={{ paddingTop: '8rem', minHeight: '85vh' }}>
            <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text">Navigating Educational_Bridge</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1rem auto' }}>
                    Whether you are a student hungry for knowledge or a teacher ready to construct empowering assessments, our platform provides a seamless experience from registration right through to graduation. Follow the guide below!
                </p>
            </section>

            <div className="levels-container text-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
                
                {/* Student Pathway */}
                <div className="level-column" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '2rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem' }}>
                        <i className="uil uil-book-reader" style={{ marginRight: '10px' }}></i> For Students
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-primary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>1. Create an Account</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Register with your email and upload a personalized avatar. Your dashboard will securely hold all your upcoming examination grades.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-primary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>2. Explore the Library</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Navigate to the 'Subjects Matrix'. Choose your active academic level—Primary 1 through Senior 6—and browse officially curated REB curriculum subjects.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-primary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>3. Take Assessments</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Engage with rich interactive quizzes formatted directly from textbook units! Verify your knowledge securely using math tools and automated grading systems.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-primary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>4. Results & Confetti!</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Submit your test and instantly receive a performance breakdown. Pass your exam and get celebrated with dynamic animations!</p>
                        </article>
                    </div>
                    <Link to="/signup" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Get Started as a Student</Link>
                </div>

                {/* Teacher Pathway */}
                <div className="level-column" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <h2 style={{ color: 'var(--color-secondary)', marginBottom: '2rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem' }}>
                        <i className="uil uil-presentation-edit" style={{ marginRight: '10px' }}></i> For Teachers
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-secondary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>1. Authorized Access</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Secure an account to unlock the Teacher privileges. Educational_Bridge empowers instructors with the ability to build advanced global material.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-secondary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>2. Open The Creator Studio</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Navigate to the "Create Exam" feature suite. You can define subject contexts, set precise time limits, and formulate unique question packets.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-secondary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>3. Publish To The Grid</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Publish your examinations! Students logging in will instantly see your custom tests natively linked to their selected subjects and terms.</p>
                        </article>
                        <article className="interactive-card" style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--color-secondary)', borderRadius: '10px', padding: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>4. Track Performance Metrics</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Use the "View Submissions" hub to track comprehensive class data, highlighting which students successfully passed your modules and monitoring engagement.</p>
                        </article>
                    </div>
                    <Link to="/create-exam" className="btn btn-secondary" style={{ marginTop: '2rem', display: 'inline-block' }}>Build an Assessment</Link>
                </div>

            </div>
        </main>
    );
};

export default HowItWorks;
