import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { SUBJECT_PDFS } from '../data/pdfs';
import './Subject.css';


const S3_MATH_UNITS = [
    "UNIT 1: PROBLEMS ON SETS",
    "UNIT 2: NUMBER BASES",
    "UNIT 3: ALGEBRAIC FRACTIONS",
    "UNIT 4: SIMULTANEOUS LINEAR EQUATIONS AND INEQUALITIES",
    "UNIT 5: QUADRATIC EQUATIONS",
    "UNIT 6: LINEAR AND QUADRATIC FUNCTIONS",
    "UNIT 7: COMPOUND INTEREST, REVERSE PERCENTAGE AND COMPOUND PROPORTIONAL CHANGE",
    "UNIT 8: RIGHT-ANGLED TRIANGLES",
    "UNIT 9: CIRCLE THEOREM",
    "UNIT 10: COLLINEAR POINTS AND ORTHOGONAL VECTORS",
    "UNIT 11: ENLARGEMENT AND SIMILARITY IN 2D",
    "UNIT 12: INVERSE AND COMPOSITE TRANSFORMATIONS",
    "UNIT 13: STATISTICS (BIVARIATE DATA)"
];

const P1_KINYARWANDA_UNITS = [
    "Umutwe wa mbere: Umuco n’indangagaciro",
    "Umutwe wa kabiri: Isuku",
    "Umutwe wa gatatu: Umuryango",
    "Umutwe wa kane: Ibidukikije",
    "Umutwe wa gatanu: Uburenganzira bw’umwana",
    "Umutwe wa gatandatu: Kwirinda no gukumira ihohoterwa",
    "Umutwe wa karindwi: Inyamaswa zo mu rugo",
    "Umutwe wa munani: Indyo yuzuye",
    "Umutwe wa kenda: Kuzigama"
];

const P1_MATH_UNITS = [
    "UNIT 1: Numbers from 1 up to 5",
    "UNIT 2: Numbers from 1 up to 9",
    "UNIT 3: Numbers from 0 up to 10",
    "UNIT 4: Numbers from 0 up to 20",
    "UNIT 5: Multiplication and division by 2",
    "UNIT 6: Numbers from 0 up to 50",
    "UNIT 7: Numbers from 0 up to 100",
    "UNIT 8: Fractions",
    "UNIT 9: Number patterns",
    "UNIT 10: Measuring lengths less than or equal to 10 m",
    "UNIT 11: Main parts of the day and days of the week",
    "UNIT 12: Rwandan currency from 1 frw up to 100 frw",
    "UNIT 13: Directions, location of objects and lines",
    "UNIT 14: Right angle, square and rectangle"
];

const P1_ENGLISH_UNITS = [
    "UNIT 1: Welcome to the classroom",
    "UNIT 2: Classroom objects",
    "UNIT 3: People at home",
    "UNIT 4: Clothes and parts of my body",
    "UNIT 5: Likes and dislikes",
    "UNIT 6: Classroom objects and personal belongings",
    "UNIT 8: Animals at home",
    "UNIT 9: What we do every day",
    "UNIT 10: Story telling"
];


const Subject = () => {
    const [searchParams] = useSearchParams();
    const levelKeys = Object.keys(LEVELS);
    const [activeLevel, setActiveLevel] = useState(levelKeys[0]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [selectedUnitSubject, setSelectedUnitSubject] = useState(null);
    const [teacherExams, setTeacherExams] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
        
        const fetchExams = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/exams`);
                const data = await response.json();
                if (data.exams) {
                    setTeacherExams(data.exams);
                }
            } catch (error) {
                console.error('Error fetching teacher exams:', error);
            }
        };
        fetchExams();
    }, []);

    const subjectImages = {
        "Mathematics": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
        "English": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80",
        "Kinyarwanda": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
        "Elementary Science & Technology": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
        "Elementary Science & Technology (SET)": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
        "Social Studies": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80",
        "French": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
        "Biology": "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=500&q=80",
        "Chemistry": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=80",
        "Physics": "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=500&q=80",
        "Geography": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80",
        "History": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80",
        "Entrepreneurship": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
        "Computer Science": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
        "Economics": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80",
        "Integrated Science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
        "General Studies & Communication": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
    };

    // Determine levels to show based on search query
    const isSearching = searchQuery.trim().length > 0;

    return (
        <section className="subject-page-container">
            <div className="container">
                <div className="subject-header">
                    <h2 className="gradient-text">Choose Your Class & Subject</h2>
                    <p className="subtitle">
                        Rwandan Curriculum: P1 to S6. Search or filter through your courses to begin assessing your skills.
                    </p>
                </div>

                {/* Powerful Global Search Box */}
                <div className="search-container">
                    <div className="search-box">
                        <i className="uil uil-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search any subject from P1 to S6... (e.g. Mathematics, Physics)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {isSearching && (
                            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                                <i className="uil uil-times"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Hide Class Tabs if User is Currently Browsing Via Search Query! */}
                {/* Split Class Tabs for Primary and Secondary */}
                {!isSearching && (
                    <div className="level-tabs-container">
                        {/* Primary Section */}
                        <div className="level-section">
                            <h3 className="section-title"><i className="uil uil-backpack"></i> Primary Section</h3>
                            <div className="level-tabs">
                                {levelKeys.filter(l => l.includes('Primary')).map(level => (
                                    <button
                                        key={level}
                                        className={`level-tab ${activeLevel === level ? 'active' : ''}`}
                                        onClick={() => setActiveLevel(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Secondary Section */}
                        <div className="level-section">
                            <h3 className="section-title"><i className="uil uil-graduation-cap"></i> Secondary Section</h3>
                            <div className="level-tabs">
                                {levelKeys.filter(l => l.includes('Senior')).map(level => (
                                    <button
                                        key={level}
                                        className={`level-tab ${activeLevel === level ? 'active' : ''}`}
                                        onClick={() => setActiveLevel(level)}
                                    >
                                        {level.replace('Senior', 'Secondary')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div id="levelContent">
                    {levelKeys.map(level => {
                        // Filter the subjects if the user is typing
                        const filteredSubjects = LEVELS[level].subjects.filter(subject => 
                            subject.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        // If NOT searching, only show the exact clicked active tab.
                        // If searching, show all levels that have matching results for the search term!
                        if (!isSearching && level !== activeLevel) return null;
                        if (isSearching && filteredSubjects.length === 0) return null;

                        return (
                            <div key={level} className="level-group active">
                                <h3 className="level-header">
                                    {level} 
                                    {isSearching && <span className="search-badge"> — Matches Found</span>}
                                </h3>
                                
                                <div className="subjects-grid">
                                    {filteredSubjects.map(subject => (
                                        <article className="subject-card interactive-card" key={subject}>
                                            <div className="subject-image-wrapper">
                                                <img 
                                                    src={subjectImages[subject] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80'} 
                                                    alt={subject} 
                                                    className="online-photo"
                                                />
                                            </div>
                                            <div className="subject-card-info">
                                                <h4>{subject}</h4>
                                                <p>End unit assessment for {level} — {subject}.</p>
                                                {SUBJECT_PDFS[level]?.[subject] ? (
                                                    <>
                                                        <a 
                                                            href={SUBJECT_PDFS[level][subject]} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="btn btn-primary small-btn w-100 mb-2"
                                                            style={{ marginBottom: '10px' }}
                                                        >
                                                            {subject === "Kinyarwanda" ? "Soma igitabo" : "Open PDF"}
                                                        </a>
                                                        {((level === "Primary 1" && (subject === "Mathematics" || subject === "English" || subject === "Kinyarwanda")) || (level === "Senior 3" && subject === "Mathematics")) ? (
                                                            <button 
                                                                className="btn btn-secondary small-btn w-100"
                                                                onClick={() => setSelectedUnitSubject({ level, subject })}
                                                            >
                                                                {subject === "Kinyarwanda" ? "Kora isuzuma" : "Take Assessment"}
                                                            </button>
                                                        ) : (
                                                            <Link 
                                                                to={`/assessment?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(subject)}`} 
                                                                className="btn btn-secondary small-btn w-100"
                                                            >
                                                                {subject === "Kinyarwanda" ? "Kora isuzuma" : "Take Assessment"}
                                                            </Link>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link 
                                                        to={`/assessment?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(subject)}`} 
                                                        className="btn btn-primary small-btn w-100"
                                                    >
                                                        Start Assessment
                                                    </Link>
                                                )}

                                                {/* Render Teacher Uploaded Exams */}
                                                {teacherExams
                                                    .filter(exam => exam.year_level === level && exam.subject_name === subject)
                                                    .map(exam => (
                                                        <Link 
                                                            key={exam.id}
                                                            to={`/take-exam?examId=${exam.id}`} 
                                                            className="btn btn-warning small-btn w-100 mt-2"
                                                            style={{ marginTop: '10px', background: 'linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)', color: '#fff', border: 'none', fontWeight: 'bold' }}
                                                        >
                                                            <i className="uil uil-file-alt"></i> Exam by {exam.teacher_name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {isSearching && levelKeys.every(level => 
                        LEVELS[level].subjects.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).length === 0
                    ) && (
                        <div className="no-results">
                            <i className="uil uil-search-minus"></i>
                            <h3>No Subjects Found</h3>
                            <p>We couldn't find any subject matching "{searchQuery}". Try searching for something else like "Biology".</p>
                        </div>
                    )}
                </div>

                {user?.role?.toLowerCase() === 'teacher' && (
                    <div className="teacher-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', paddingBottom: '20px' }}>
                        <Link to="/create-exam" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', boxShadow: '0 8px 15px rgba(67, 97, 238, 0.3)', borderRadius: '30px' }}>
                            <i className="uil uil-plus-circle" style={{ marginRight: '8px' }}></i> Create New Exam
                        </Link>
                    </div>
                )}
            </div>

            {/* Units Modal for Specific Subjects */}
            {selectedUnitSubject && ((selectedUnitSubject.level === "Primary 1" && (selectedUnitSubject.subject === "Mathematics" || selectedUnitSubject.subject === "English" || selectedUnitSubject.subject === "Kinyarwanda")) || (selectedUnitSubject.level === "Senior 3" && selectedUnitSubject.subject === "Mathematics")) && (
                <div className="units-modal-overlay" onClick={() => setSelectedUnitSubject(null)}>
                    <div className="units-modal interactive-card" onClick={e => e.stopPropagation()}>
                        <div className="units-modal-header border-bottom">
                            <h3 className="gradient-text">{selectedUnitSubject.level} {selectedUnitSubject.subject} {selectedUnitSubject.subject === "Kinyarwanda" ? "Imitwe" : "Units"}</h3>
                            <button onClick={() => setSelectedUnitSubject(null)} className="close-modal"><i className="uil uil-times"></i></button>
                        </div>
                        <div className="units-list">
                            {(selectedUnitSubject.level === "Senior 3" && selectedUnitSubject.subject === "Mathematics" ? S3_MATH_UNITS : (selectedUnitSubject.subject === "Mathematics" ? P1_MATH_UNITS : (selectedUnitSubject.subject === "English" ? P1_ENGLISH_UNITS : P1_KINYARWANDA_UNITS))).map((unit, idx) => (
                                <Link 
                                    key={idx}
                                    to={`/assessment?level=${encodeURIComponent(selectedUnitSubject.level)}&subject=${encodeURIComponent(selectedUnitSubject.subject)}&unit=${encodeURIComponent(unit)}`}
                                    className="unit-nav-btn"
                                >
                                    {unit} <i className="uil uil-arrow-right"></i>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Subject;
