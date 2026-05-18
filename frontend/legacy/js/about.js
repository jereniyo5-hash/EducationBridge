document.addEventListener('DOMContentLoaded', () => {
            console.log('Assessment website loaded!');

            // --- Swiper Initialization ---
            const swiper = new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 50,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    600: {
                        slidesPerView: 2
                    }
                },
                // Add event listeners to trigger animations
                on: {
                    init: function () {
                        // Animate the first slide on init
                        this.slides[this.activeIndex].classList.add('is-active');
                    },
                    slideChangeTransitionEnd: function () {
                        // Remove active class from previous slides
                        this.slides.forEach((slide, index) => {
                            if (index !== this.activeIndex) {
                                slide.classList.remove('is-active');
                            }
                        });
                        // Add active class to the current slide to trigger animation
                        this.slides[this.activeIndex].classList.add('is-active');
                    },
                    beforeTransitionStart: function() {
                        // Remove active class from current slide before transition starts
                        // This ensures elements animate *in* when the new slide becomes active
                        this.slides[this.activeIndex].classList.remove('is-active');
                    }
                }
            });

            // --- Navigation Menu Toggle ---
            const openMenuBtn = document.getElementById('open-menu-btn');
            const closeMenuBtn = document.getElementById('close-menu-btn');
            const navMenu = document.querySelector('.nav_menu');

            if (openMenuBtn && closeMenuBtn && navMenu) {
                openMenuBtn.addEventListener('click', () => {
                    navMenu.style.display = 'flex';
                    closeMenuBtn.style.display = 'inline-block';
                    openMenuBtn.style.display = 'none';
                });

                closeMenuBtn.addEventListener('click', () => {
                    navMenu.style.display = 'none';
                    closeMenuBtn.style.display = 'none';
                    openMenuBtn.style.display = 'inline-block';
                });
            }

            // --- Smooth Scrolling for Navigation ---
            document.querySelectorAll('.nav_menu a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        const targetSection = document.getElementById(targetId);
                        if (targetSection) {
                            window.scrollTo({
                                top: targetSection.offsetTop - (document.querySelector('nav').offsetHeight || 0),
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // --- Hero Section Button Interaction ---
            const startLearningBtn = document.getElementById('startLearningBtn');
            if (startLearningBtn) {
                startLearningBtn.addEventListener('click', () => {
                    alert('Great choice! Let\'s start your learning journey!');
                });
            }

            // --- Course Card Enroll Buttons ---
            document.querySelectorAll('.enroll-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseCard = e.target.closest('div[data-course-id]');
                    const courseId = courseCard ? courseCard.dataset.courseId : 'unknown';
                    const courseTitle = courseCard ? courseCard.querySelector('h4').textContent : 'Unknown Course';
                    alert(`You clicked to enroll in: ${courseTitle} (ID: ${courseId}).\nThis would typically redirect you to a course detail or registration page.`);
                });
            });

            // --- "View All Courses" Button ---
            const viewAllCoursesBtn = document.querySelector('.view-all-courses');
            if (viewAllCoursesBtn) {
                viewAllCoursesBtn.addEventListener('click', () => {
                    alert('Navigating to the full courses catalog!');
                });
            }

            // --- Contact Form Submission ---
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');
            const confirmationSound = document.getElementById('confirmationSound');

            if (contactForm) {
                contactForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    formMessage.textContent = '';
                    formMessage.classList.remove('success', 'error');
                    formMessage.style.display = 'none';

                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const subject = document.getElementById('subject').value.trim();
                    const message = document.getElementById('message').value.trim();

                    if (!name || !email || !subject || !message) {
                        formMessage.textContent = 'Please fill in all fields.';
                        formMessage.classList.add('error');
                        formMessage.style.display = 'block';
                        return;
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        formMessage.textContent = 'Please enter a valid email address.';
                        formMessage.classList.add('error');
                        formMessage.style.display = 'block';
                        return;
                    }

                    try {
                        console.log('Simulating form data submission:', { name, email, subject, message });

                        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

                        if (confirmationSound) {
                            confirmationSound.play().catch(error => {
                                console.error('Error playing sound:', error);
                            });
                        }

                        formMessage.textContent = 'Thank you for contacting us! Please check your email for a confirmation.';
                        formMessage.classList.add('success');
                        formMessage.style.display = 'block';

                        console.log(`(Simulated) Sending confirmation email to: ${email}`);
                        // Reminder: Real email sending requires a backend server.

                        contactForm.reset();

                    } catch (error) {
                        console.error('Form submission error:', error);
                        formMessage.textContent = 'There was an error sending your message. Please try again later.';
                        formMessage.classList.add('error');
                        formMessage.style.display = 'block';
                    }
                });
            }
        });