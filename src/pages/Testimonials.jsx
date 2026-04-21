import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css'; // Reusing Home.css for testimonial styles

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', comment: '' });
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        fetchTestimonials();
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
        <div className="home-page-container" style={{ paddingTop: '100px' }}>
            <section className="testimonies-section">
                <div className="container">
                    <h2 className="gradient-text text-center mb-loose">Community Testimonials</h2>
                    <p className="text-center subtitle" style={{ marginBottom: '3rem' }}>
                        Join the hundreds of students and teachers benefiting from Educational_Bridge.
                    </p>
                    
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                        }}
                    >
                        {testimonials.map((t, idx) => (
                            <SwiperSlide key={t.id || idx}>
                                <article className="testimonial-card interactive-card">
                                    <div className="avatar">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url.startsWith('http') ? t.avatar_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${t.avatar_url}`} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
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

                    <div className="leave-comment-section" style={{ marginTop: '4rem', background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--card-border)' }}>
                        <h3 className="text-center" style={{ marginBottom: '1.5rem' }}>Share Your Experience</h3>
                        <form onSubmit={handleTestimonialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newTestimonial.name}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Your Role (e.g., S3 Student, Teacher)"
                                value={newTestimonial.role}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                required
                            />
                            <textarea
                                placeholder="Tell us how Educational_Bridge has helped you..."
                                value={newTestimonial.comment}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '120px' }}
                                required
                            />
                            <button type="submit" className="btn btn-primary w-100" disabled={submitStatus === 'submitting'}>
                                {submitStatus === 'submitting' ? 'Submitting...' : 'Post Testimony'}
                            </button>
                            {submitStatus === 'success' && <p style={{ color: '#00bf8e', textAlign: 'center' }}>Thank you for your feedback!</p>}
                            {submitStatus === 'error' && <p style={{ color: '#ff4c60', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
