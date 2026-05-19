import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './About.css';
import AnimatedBackground from '../components/AnimatedBackground';

// Custom Javascript Typewriter Component for Sequential Paragraphs
const SequentialTypewriter = ({ paragraphs, speed = 25 }) => {
    const [displayedText, setDisplayedText] = useState(paragraphs.map(() => ''));
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setIsStarted(true), 500);
                observer.disconnect();
            }
        });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isStarted || currentParagraph >= paragraphs.length) return;

        const currentTextToType = paragraphs[currentParagraph];
        let i = 0;

        const intervalId = setInterval(() => {
            setDisplayedText(prev => {
                const newDisplayed = [...prev];
                newDisplayed[currentParagraph] = currentTextToType.slice(0, i + 1);
                return newDisplayed;
            });
            i++;

            if (i >= currentTextToType.length) {
                clearInterval(intervalId);
                setTimeout(() => {
                    setCurrentParagraph(p => p + 1);
                }, 300); // Short pause before starting next paragraph
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [isStarted, currentParagraph, paragraphs, speed]);

    return (
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: '#444', fontSize: '1.05rem', textAlign: 'justify' }}>
            {paragraphs.map((p, index) => (
                <p key={index} style={{ minHeight: index >= currentParagraph ? '0px' : 'auto', margin: 0 }}>
                    {index === 0 && displayedText[index].length > 0 ? (
                        <>
                            <strong style={{ color: '#222' }}>Niyogisubizo Jeremie</strong> {displayedText[index].substring("Niyogisubizo Jeremie ".length)}
                        </>
                    ) : (
                        displayedText[index]
                    )}
                    {currentParagraph === index && isStarted && <span className="blinking-cursor" style={{ borderRight: '2px solid #6c63ff', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>}
                </p>
            ))}
        </div>
    );
};

const About = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/testimonials`);
                const data = await response.json();
                if (response.ok) {
                    setTestimonials(data.testimonials || []);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchTestimonials();
    }, []);

    const bioParagraphs = [
        "Niyogisubizo Jeremie is an Educational Technologist and Mathematician whose professional portfolio spans academic research, software development, and applied entrepreneurship within the Rwandan education and technology sectors.",
        "His undergraduate thesis examines the impact of artificial intelligence on mathematics success at the University of Rwanda College of Education. His technical contributions include the Digital Education Bridge framework for curriculum-aligned assessment, geospatial Flutter application architecture using Dart and Supabase, and specifications for mobile state management and scalable educational database design.",
        "He also maintains a business portfolio documenting strategic operations in agile poultry agribusiness. He holds certifications in AI Career Essentials and Virtual Assistance from ALX Rwanda, Mandarin Chinese proficiency at HSK Level 3, and is completing advanced instruction in mathematics, statistics, and computer science at the University of Rwanda.",
        "He serves as a Teaching Assistant at GS Musebeya and is a member of the University of Rwanda Computer Science and Mathematics Academic Research Group. His work centers on the development of data-driven mathematical models and digital infrastructure to advance educational outcomes in Rwanda."
    ];

    return (
        <main className="container" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
            {/* Hero Section */}
            <section id="hero" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div className="welcome" style={{ maxWidth: '800px', margin: '0 auto', background: 'transparent', boxShadow: 'none' }}>
                    <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Bridging Knowledge, Building Future</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                        Ready to tap into your potential and join an active learning community? Our platform provides an interactive environment where you can actively construct knowledge, engage with assessments, and master new concepts systematically.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ marginBottom: '5rem' }}>
                <h3 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>What We Offer</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    <div className="interactive-card" style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                        <i className="uil uil-laptop-connection" style={{ fontSize: '3rem', color: '#6c63ff', marginBottom: '1rem', display: 'block' }}></i>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Interactive Lessons</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>Engage with dynamic content, textbooks, and unit-by-unit comprehensive assessments.</p>
                    </div>
                    <div className="interactive-card" style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                        <i className="uil uil-crosshairs" style={{ fontSize: '3rem', color: '#ff4c60', marginBottom: '1rem', display: 'block' }}></i>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Personalized Paths</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>Tailored learning journeys adapted perfectly to your pace, from Primary 1 to Senior 6.</p>
                    </div>
                    <div className="interactive-card" style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                        <i className="uil uil-globe" style={{ fontSize: '3rem', color: '#00bf8e', marginBottom: '1rem', display: 'block' }}></i>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Global Standards</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>Curriculum-aligned data-driven metrics to advance your educational outcomes.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" style={{ marginBottom: '5rem' }}>
                <h3 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>What Our Learners Say</h3>
                {testimonials.length > 0 ? (
                    <Swiper spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ padding: '1rem' }}>
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="interactive-card" style={{ padding: '2.5rem', background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)', height: '100%' }}>
                                    {testimonial.avatar_url ? (
                                        <img src={testimonial.avatar_url.startsWith('http') ? testimonial.avatar_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${testimonial.avatar_url}`} alt={testimonial.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                                    ) : (
                                        <i className="uil uil-user-circle" style={{ fontSize: '3rem', color: '#6c63ff', marginBottom: '1rem', display: 'block' }}></i>
                                    )}
                                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>"{testimonial.comment}"</p>
                                    <h5 style={{ color: 'var(--text-primary)', margin: 0 }}>{testimonial.name}</h5>
                                    <small style={{ color: '#00bf8e' }}>{testimonial.role}</small>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center" style={{ color: 'var(--text-secondary)' }}>
                        <p>No testimonials available yet. Be the first to share your experience!</p>
                    </div>
                )}
            </section>

            {/* Biography Section */}
            <section id="biography" className="interactive-card" style={{ 
                background: 'var(--card-bg)', 
                borderRadius: '20px', 
                border: '1px solid var(--card-border)', 
                marginTop: '3rem', 
                padding: '4rem 3rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <AnimatedBackground />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 className="gradient-text mb-loose text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Meet the Founder</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '3rem', position: 'relative' }}>
                        <div style={{ 
                            position: 'absolute', 
                            top: '-10px', right: '-10px', bottom: '-10px', left: '-10px', 
                            background: 'linear-gradient(135deg, #6c63ff, #ff4c60)', 
                            borderRadius: '50%', 
                            zIndex: 0,
                            animation: 'spin 10s linear infinite'
                        }}></div>
                        <img 
                            src="/uploads/avatars/avatar-1776509310514.jpg" 
                            alt="Niyogisubizo Jeremie" 
                            style={{ 
                                width: '220px', height: '220px', objectFit: 'cover', 
                                borderRadius: '50%', border: '5px solid #ffffff', 
                                position: 'relative', zIndex: 1,
                                boxShadow: '0 10px 25px rgba(0,0,0,0.15)' 
                            }}
                        />
                    </div>

                    <div style={{ width: '100%', background: '#ffffff', padding: '3rem', borderRadius: '15px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #f0f0f0' }}>
                        <SequentialTypewriter paragraphs={bioParagraphs} speed={15} />
                    </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
