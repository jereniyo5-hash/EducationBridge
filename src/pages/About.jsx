import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './About.css'; // Optional specific styling

const About = () => {

    return (
        <main className="container" style={{paddingTop: '7rem'}}>
            <section id="hero">
                <div className="welcome">
                    <h2>Bridging Knowledge, Building Future</h2>
                    <p>Ready to tap into your potential and join an active learning community? Our site is an active, interactive environment in which you can construct knowledge actively, engage with peers, and receive the help you require in order to truly grasp new concepts.</p>
                </div>
            </section>

            <section id="features">
                <h3>What We Offer</h3>
                <div>
                    <div className="welcome">
                        <h4>Interactive Lessons</h4>
                        <p>Engage with dynamic content, quizzes, and practical exercises.</p>
                    </div>
                    <div className="welcome">
                        <h4>Personalized Paths</h4>
                        <p>Tailored learning journeys adapted to your pace and goals.</p>
                    </div>
                    <div className="welcome">
                        <h4>Global Community</h4>
                        <p>Connect with learners and mentors from around the world.</p>
                    </div>
                </div>
            </section>

            <section id="testimonials">
                <h3>What Our Learners Say</h3>
                <Swiper spaceBetween={50} slidesPerView={1} breakpoints={{ 600: { slidesPerView: 2 } }}>
                    <SwiperSlide className="testimonial-item is-active">
                        <i className="uil uil-chart-line action-icon"></i>
                        <p>"EduBridge transformed my understanding of mathematics. The interactive lessons made complex topics easy to grasp!"</p>
                        <p className="learner-name">- Alice Johnson, Achieved Mastery</p>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item is-active">
                        <i className="uil uil-brackets-curly action-icon"></i>
                        <p>"I never thought I could learn to code, but EduBridge's Python course was incredibly engaging and well-structured."</p>
                        <p className="learner-name">- Bob Williams, Built His First App</p>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item is-active">
                        <i className="uil uil-users-alt action-icon"></i>
                        <p>"The community support and personalized learning paths are truly exceptional. Highly recommend!"</p>
                        <p className="learner-name">- Carol Davis, Joined a Study Group</p>
                    </SwiperSlide>
                </Swiper>
            </section>

            <section id="biography" style={{ background: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--card-border)', marginTop: '3rem', padding: '3rem' }}>
                <h3 className="gradient-text mb-loose text-center">About Our Founder</h3>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <img 
                        src="/uploads/avatars/avatar-1776509310514.jpg" 
                        alt="Niyogisubizo Jeremie" 
                        style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--color-primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    <p>
                        <strong>Niyogisubizo Jeremie</strong> is an Educational Technologist and Mathematician whose professional portfolio spans academic research, software development, and applied entrepreneurship within the Rwandan education and technology sectors. 
                    </p>
                    <p>
                        His undergraduate thesis examines the impact of artificial intelligence on mathematics success at the University of Rwanda College of Education. His technical contributions include the Digital Education Bridge framework for curriculum-aligned assessment, geospatial Flutter application architecture using Dart and Supabase, and specifications for mobile state management and scalable educational database design.
                    </p>
                    <p>
                        He also maintains a business portfolio documenting strategic operations in agile poultry agribusiness. He holds certifications in AI Career Essentials and Virtual Assistance from ALX Rwanda, Mandarin Chinese proficiency at HSK Level 3, and is completing advanced instruction in mathematics, statistics, and computer science at the University of Rwanda.
                    </p>
                    <p>
                        He serves as a Teaching Assistant at GS Musebeya and is a member of the University of Rwanda Computer Science and Mathematics Academic Research Group. His work centers on the development of data-driven mathematical models and digital infrastructure to advance educational outcomes in Rwanda.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default About;
