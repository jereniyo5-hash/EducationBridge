import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css';

const Home = ({ setIsChatOpen }) => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', comment: '' });
    const [submitStatus, setSubmitStatus] = useState(null);

    // JavaScript to ensure the page fits and is physically stable without bouncing or overflow on mobile
    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Execute immediately to set stable height
        handleResize();

        // Add event listener to adjust cleanly if screen flips or resizes
        window.addEventListener('resize', handleResize);

        // Fetch testimonials
        fetchTestimonials();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function fetchTestimonials() {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = `${API_URL}/api/testimonials`;
            const response = await fetch(endpoint);
            const data = await response.json();
            if (response.ok && data.testimonials) setTestimonials(data.testimonials);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        }
    }

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        try {
            const userState = JSON.parse(localStorage.getItem('user') || '{}');
            const payload = {
                ...newTestimonial,
                avatar_url: userState.avatar_url || null
            };

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = `${API_URL}/api/testimonials`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setNewTestimonial({ name: '', role: '', comment: '' });
                setSubmitStatus('success');
                fetchTestimonials();
                setTimeout(() => setSubmitStatus(null), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Failed to submit testimonial", error);
            setSubmitStatus('error');
        }
    };

    return (
        <div className="home-page-container">
            {/* Animated Video Hero Section */}
            <section className="hero-video-section">
                {/* YouTube iframe for the animated background */}
                <iframe
                    className="hero-video-bg"
                    src="https://www.youtube.com/embed/kr-eIQ_SzYk?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playsinline=1&playlist=kr-eIQ_SzYk&modestbranding=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                ></iframe>

                <div className="hero-slide-overlay">
                    <div className="container hero-content">
                        <h1 className="gradient-text text-white">Welcome to the Educational_Bridge platform</h1>
                        <p>Jeremie Niyogisubizo.</p>
                        <div className="hero-buttons">
                            <Link to="/signup" className="btn btn-primary">Get Started</Link>
                            <Link to="/about" className="btn btn-secondary">Learn More</Link>
                            <Link to="/how-it-works" className="btn btn-primary">How It Works</Link>
                            <button className="btn btn-primary jeremie-btn" onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    window.location.href = '/login';
                                } else {
                                    setIsChatOpen(true);
                                }
                            }}>
                                <i className="uil uil-robot"></i> Jeremie Ai
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Classes Available */}
            <section className="classes-section">
                <div className="container classes-container">
                    <div className="classes-header">
                        <h1 className="gradient-text text-center">Available Classes</h1>
                        <p className="text-center subtitle">
                            <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}><em>From Primary 1 to Senior 6. Each class has end-of-unit assessments for all subjects.</em></strong>
                        </p>
                    </div>

                    <div className="levels-container text-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
                        {/* Primary School */}
                        <div className="level-column" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem' }}>Primary School</h2>
                            <div className="classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <article className="class-card interactive-card" key={`p${num}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--color-primary)', borderRadius: '15px', padding: '1.5rem' }}>
                                        <div className="class-icon" style={{ background: 'var(--color-primary)', width: '50px', height: '50px', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>P{num}</div>
                                        <h5>Primary {num}</h5>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Math, English, Kinyarwanda, SET, SST</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Secondary School */}
                        <div className="level-column" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem' }}>Secondary School</h2>
                            <div className="classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <article className="class-card interactive-card" key={`s${num}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--color-secondary)', borderRadius: '15px', padding: '1.5rem' }}>
                                        <div className="class-icon" style={{ background: 'var(--color-secondary)', width: '50px', height: '50px', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S{num}</div>
                                        <h5>Senior {num}</h5>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Math, Sciences, Languages, Humanities</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Subjects */}
            <section className="subjects-section">
                <h2 className="gradient-text text-center">Our Popular Subjects</h2>
                <div className="container subjects-container grid-3">
                    {[
                        { title: 'Mathematics', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Geography', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Entrepreneurship', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Economics', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Computer Science', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Science for Primary', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80' },
                    ].map((subject, index) => (
                        <article className="subject-card interactive-card" key={index}>
                            <div className="subject-image-wrapper">
                                <img src={subject.img} alt={subject.title} className="online-photo" />
                                <div className="subject-overlay">
                                    <Link to={`/subject?query=${encodeURIComponent(subject.title)}`} className="btn btn-primary small-btn">Take Assessment</Link>
                                </div>
                            </div>
                            <div className="subject-info">
                                <h4>{subject.title}</h4>
                                <p>Enhance your knowledge and prepare for your exams efficiently.</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="faqs-section">
                <h2 className="gradient-text text-center">Frequently Asked Questions</h2>
                <div className="container faqs-container grid-2">
                    {[
                        {
                            q: "What classes are available on the platform?",
                            a: "We offer comprehensive educational resources arranged for both Primary and Secondary school. Everything is tailored efficiently from Primary 1 to Senior 6."
                        },
                        {
                            q: "How are the subjects and exams structured?",
                            a: "Each class has end-of-unit assessments for all subjects. These are expertly designed interactive quizzes to confirm your knowledge step-by-step."
                        },
                        {
                            q: "How can I proceed to explore the questions?",
                            a: "Go to the ‘Subject’ tab at the top of the page, select your academic level (like P6 or S3), choose your subject, and click on 'Take Assessment'."
                        },
                        {
                            q: "Are the materials aligned with the national curriculum?",
                            a: "Yes! All PDF textbooks, unit tests, and interactive subject modules are updated to reflect the standardized Rwandan educational curriculum."
                        }
                    ].map((faq, index) => (
                        <article className="faq-card interactive-card" key={index}>
                            <div className="faq-icon"><i className="uil uil-question-circle"></i></div>
                            <div className="question-answer">
                                <h4>{faq.q}</h4>
                                <p>{faq.a}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Testimonies */}
            <section className="testimonies-section">
                <div className="container">
                    <h2 className="gradient-text text-center mb-loose">User Testimonies</h2>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                        }}
                    >
                        {testimonials.map((t, idx) => (
                            <SwiperSlide key={t.id || idx}>
                                <article className="testimonial-card interactive-card">
                                    <div className="avatar">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0', color: '#555', fontSize: '1.5rem', fontWeight: 'bold', borderRadius: '50%' }}>
                                                {t.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="testimonial-content">
                                        <p className="quote">"{t.comment}"</p>
                                        <div className="testimonial-info">
                                            <h5>{t.name}</h5>
                                            <small>{t.role}</small>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Leave a Comment Space */}
                    <div className="leave-comment-section" style={{ marginTop: '4rem', background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--card-border)' }}>
                        <h3 className="text-center" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Leave a comment and your testimony</h3>
                        <p className="text-center" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Share your ideas. They will be directly added to our User Testimonies above.</p>

                        <form onSubmit={handleTestimonialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                            <input
                                type="text"
                                placeholder="your name"
                                value={newTestimonial.name}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                required
                            />
                            <input
                                type="text"
                                placeholder="role"
                                value={newTestimonial.role}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                required
                            />
                            <textarea
                                placeholder="comment or idea and how your feel"
                                value={newTestimonial.comment}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '120px' }}
                                required
                            />
                            <button type="submit" className="btn btn-primary w-100" disabled={submitStatus === 'submitting'}>
                                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Idea'}
                            </button>
                            {submitStatus === 'success' && <p style={{ color: '#00bf8e', textAlign: 'center' }}>Testimony added successfully!</p>}
                            {submitStatus === 'error' && <p style={{ color: '#ff4c60', textAlign: 'center' }}>Failed to add testimony.</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
