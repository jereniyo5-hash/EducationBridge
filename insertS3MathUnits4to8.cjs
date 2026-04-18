const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const s3MathUnits4to8 = `
const Senior3MathUnit4Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questions = [
        {
            id: 'u4_q1',
            text: "1. For which simultaneous equations is the ordered pair (3, -2) a solution?\\n(a) x + y = 1 and x - y = 5\\n(b) 3x = 5 - 2y and x + y = 1",
            options: ['Only (a)', 'Only (b)', 'Both (a) and (b)', 'Neither (a) nor (b)'],
            correct: 'Both (a) and (b)'
        },
        {
            id: 'u4_q2',
            text: "2. [See Graph in Textbook] What is the solution to the simultaneous equations x + 2y = 8 and x - 2y = -4?",
            options: ['x = 2, y = 3', 'x = 4, y = 2', 'x = 0, y = 4', 'x = -4, y = 0'],
            correct: 'x = 2, y = 3'
        },
        {
            id: 'u4_q3',
            text: "3. Solve the following equations:\\n(a) x + 2y = 15; 2x - y = 0\\n(b) 2x = y - 5; y = x - 3",
            options: [
                '(a) x=3, y=6 ; (b) x=-8, y=-11',
                '(a) x=6, y=3 ; (b) x=-11, y=-8',
                '(a) x=5, y=5 ; (b) x=2, y=-1',
                '(a) x=7, y=4 ; (b) x=-4, y=-7'
            ],
            correct: '(a) x=3, y=6 ; (b) x=-8, y=-11'
        },
        {
            id: 'u4_q4',
            text: "4. The sum of James' and David's ages is 34 years. The sum of twice James' age and three times David's age was 86 years. Form a pair of simultaneous equations and solve them to find their ages.",
            options: [
                'James = 16, David = 18',
                'James = 18, David = 16',
                'James = 14, David = 20',
                'James = 15, David = 19'
            ],
            correct: 'James = 16, David = 18'
        },
        {
            id: 'u4_q5',
            text: "5. Dan bought 5 boxes of sweets and 3 bags of candies for 1205 FRW. If the cost of boxes and bags were reversed, the cost would have been 1107 FRW. Find the cost of 1 box of sweets and 1 bag of candies.",
            options: [
                'Box = 169 FRW, Bag = 120 FRW',
                'Box = 120 FRW, Bag = 169 FRW',
                'Box = 150 FRW, Bag = 100 FRW',
                'Box = 200 FRW, Bag = 68 FRW'
            ],
            correct: 'Box = 169 FRW, Bag = 120 FRW'
        },
        {
            id: 'u4_q6',
            text: "6. Find the coordinates of the vertices of the region given by the inequalities: x > 0, 5x + 4y < 32, x + 2y > 10.",
            options: [
                '(0, 5), (0, 8), and (4, 3)',
                '(0, 0), (5, 0), and (4, 3)',
                '(0, 5), (0, 8), and (3, 4)',
                '(5, 0), (8, 0), and (4, 3)'
            ],
            correct: '(0, 5), (0, 8), and (4, 3)'
        }
    ];

    const [answers, setAnswers] = useState({});
    const handleChange = (qId, option) => setAnswers({ ...answers, [qId]: option });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct) correctCount++; });
        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 4 Test: Simultaneous Equations</h1>
            {score !== null && (
                <div className={"exam-result interactive-card " + (score >= 50 ? "success" : "fail")}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                </div>
            )}
            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) { optionLabelStyle.backgroundColor = '#d4edda'; optionLabelStyle.color = '#155724'; optionLabelStyle.fontWeight = 'bold'; }
                                        else if (answers[q.id] === opt && opt !== q.correct) { optionLabelStyle.backgroundColor = '#f8d7da'; optionLabelStyle.color = '#721c24'; }
                                    }
                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input type="radio" checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} disabled={isSubmitted} style={{ marginRight: '10px' }} />
                                            {opt}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam} disabled={isSubmitted}>
                {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
        </div>
    );
};

const Senior3MathUnit5Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questions = [
        {
            id: 'u5_q1',
            text: "1. A cyclist travels 40 km at a speed of x km/h. Find the time taken when his speed is reduced by 2 km/h. If the difference between the times is 1 hour, find the value of x.",
            options: ['x = 10 km/h', 'x = 8 km/h', 'x = 12 km/h', 'x = 20 km/h'],
            correct: 'x = 10 km/h'
        },
        {
            id: 'u5_q2',
            text: "2. A train normally travels 240 km at a certain speed. One day, due to bad weather, the speed is reduced by 20 km/h so that the journey takes two hours longer. Find the normal speed.",
            options: ['60 km/h', '80 km/h', '40 km/h', '100 km/h'],
            correct: '60 km/h'
        },
        {
            id: 'u5_q3',
            text: "3. The numerator of a fraction is 1 less than the denominator. When both numerator and denominator are increased by 2, the fraction is increased by 1/12. Find the original fraction.",
            options: ['2/3', '3/4', '4/5', '1/2'],
            correct: '3/4'
        },
        {
            id: 'u5_q4',
            text: "4. The perimeters of a square and a rectangle are equal. One side of the rectangle is 11 cm and the area of the square is 4 cm² more than the area of the rectangle. Find the side of the square.",
            options: ['9 cm', '10 cm', '12 cm', '8 cm'],
            correct: '9 cm'
        },
        {
            id: 'u5_q5',
            text: "5. In a right angled triangle PQR, ∠Q = 90°, QR = x cm, PQ = (2x - 2) cm and PR = 30 cm. Find x.",
            options: ['x = 14', 'x = 16', 'x = 18', 'x = 12'],
            correct: 'x = 14'
        },
        {
            id: 'u5_q6',
            text: "6. Solve the following quadratic equations by synthetic division method or factorization:\\n(a) x² + x - 12 = 0\\n(b) x² + 9x + 14 = 0",
            options: [
                '(a) x = 3, -4; (b) x = -2, -7',
                '(a) x = 4, -3; (b) x = 2, 7',
                '(a) x = 6, -2; (b) x = -2, 7',
                '(a) x = -3, -4; (b) x = -2, -7'
            ],
            correct: '(a) x = 3, -4; (b) x = -2, -7'
        }
    ];

    const [answers, setAnswers] = useState({});
    const handleChange = (qId, option) => setAnswers({ ...answers, [qId]: option });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct) correctCount++; });
        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 5 Test: Quadratic Equations</h1>
            {score !== null && (
                <div className={"exam-result interactive-card " + (score >= 50 ? "success" : "fail")}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                </div>
            )}
            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) { optionLabelStyle.backgroundColor = '#d4edda'; optionLabelStyle.color = '#155724'; optionLabelStyle.fontWeight = 'bold'; }
                                        else if (answers[q.id] === opt && opt !== q.correct) { optionLabelStyle.backgroundColor = '#f8d7da'; optionLabelStyle.color = '#721c24'; }
                                    }
                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input type="radio" checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} disabled={isSubmitted} style={{ marginRight: '10px' }} />
                                            {opt}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam} disabled={isSubmitted}>
                {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
        </div>
    );
};

const Senior3MathUnit6Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questions = [
        {
            id: 'u6_q1',
            text: "1. Given the function f(x) = -2x² + 4x - 6. Find the vertex of this function.",
            options: ['(1, -4)', '(-1, -12)', '(2, -6)', '(1, 4)'],
            correct: '(1, -4)'
        },
        {
            id: 'u6_q2',
            text: "2. Consider the function f(x) = 2(x - 3)(x + 1).\\n(a) Is the curve opening up or opening down?\\n(b) What are the x-intercepts?",
            options: [
                '(a) Opening up, (b) x = 3 and x = -1',
                '(a) Opening down, (b) x = -3 and x = 1',
                '(a) Opening up, (b) x = -3 and x = 1',
                '(a) Opening down, (b) x = 3 and x = -1'
            ],
            correct: '(a) Opening up, (b) x = 3 and x = -1'
        },
        {
            id: 'u6_q3',
            text: "3. Find the equation of the line that is parallel to the line 4y + 5x = 6 and passes through the point (8, 5).",
            options: [
                'y = -5/4 x + 15',
                'y = 4/5 x - 1',
                'y = -5/4 x + 8',
                'y = -4/5 x + 5'
            ],
            correct: 'y = -5/4 x + 15'
        },
        {
            id: 'u6_q4',
            text: "4. (a) Is the point (-1, -4) on the line y = 3x - 1?\\n(b) Find the equation of the line that is parallel to x + 2y + 8 = 0 and passes through (-2, -3).",
            options: [
                '(a) Yes, (b) x + 2y + 8 = 0',
                '(a) Yes, (b) x + 2y + 4 = 0',
                '(a) No, (b) x - 2y - 4 = 0',
                '(a) Yes, (b) 2x + y + 7 = 0'
            ],
            correct: '(a) Yes, (b) x + 2y + 8 = 0'
        },
        {
            id: 'u6_q5',
            text: "5. Given that the line y = 3x + a passes through (1, 4), find the value of a.",
            options: ['a = 1', 'a = -1', 'a = 7', 'a = 4'],
            correct: 'a = 1'
        }
    ];

    const [answers, setAnswers] = useState({});
    const handleChange = (qId, option) => setAnswers({ ...answers, [qId]: option });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct) correctCount++; });
        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 6 Test: Linear & Quadratic Functions</h1>
            {score !== null && (
                <div className={"exam-result interactive-card " + (score >= 50 ? "success" : "fail")}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                </div>
            )}
            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) { optionLabelStyle.backgroundColor = '#d4edda'; optionLabelStyle.color = '#155724'; optionLabelStyle.fontWeight = 'bold'; }
                                        else if (answers[q.id] === opt && opt !== q.correct) { optionLabelStyle.backgroundColor = '#f8d7da'; optionLabelStyle.color = '#721c24'; }
                                    }
                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input type="radio" checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} disabled={isSubmitted} style={{ marginRight: '10px' }} />
                                            {opt}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam} disabled={isSubmitted}>
                {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
        </div>
    );
};

const Senior3MathUnit7Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questions = [
        {
            id: 'u7_q1',
            text: "1. After the prices of fuel increased by 15% a family's annual heating bill was 1654 FRW. What would the bill have been without the increase in price? (Approximate to nearest FRW)",
            options: ['1438 FRW', '1406 FRW', '1500 FRW', '1480 FRW'],
            correct: '1438 FRW'
        },
        {
            id: 'u7_q2',
            text: "2. Large borrows 16000 FRW to buy a TV set at 10% p.a. compound interest. He repays 980 FRW at the end of each year. How much does he still owe at the end of 3 years?",
            options: ['18063 FRW', '18991 FRW', '20300 FRW', '19652 FRW'],
            correct: '18063 FRW'
        },
        {
            id: 'u7_q3',
            text: "3. If 12000 FRW is invested at 12% p.a. compounded quarterly, find the accumulated amount after one year to the nearest Francs.",
            options: ['13506 FRW', '13440 FRW', '13550 FRW', '12800 FRW'],
            correct: '13506 FRW'
        },
        {
            id: 'u7_q4',
            text: "4. A sum of money is invested at compound interest and it amounts to 420 FRW at the end of the first year and 441 FRW at the end of the second year. Determine:\\n(a) the rate in percent\\n(b) the sum of money invested.",
            options: [
                '(a) 5%, (b) 400 FRW',
                '(a) 10%, (b) 380 FRW',
                '(a) 4%, (b) 404 FRW',
                '(a) 6%, (b) 396 FRW'
            ],
            correct: '(a) 5%, (b) 400 FRW'
        },
        {
            id: 'u7_q5',
            text: "5. Working alone, Alex can do some job in 6 days. John, also working alone, can do the same job in 9 days. Alex starts alone, but is joined by John after 1 day. How long do they take to finish the work together?",
            options: ['3 days', '4 days', '2.5 days', '3.5 days'],
            correct: '3 days'
        }
    ];

    const [answers, setAnswers] = useState({});
    const handleChange = (qId, option) => setAnswers({ ...answers, [qId]: option });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct) correctCount++; });
        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 7 Test: Compound Interest & Proportions</h1>
            {score !== null && (
                <div className={"exam-result interactive-card " + (score >= 50 ? "success" : "fail")}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                </div>
            )}
            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) { optionLabelStyle.backgroundColor = '#d4edda'; optionLabelStyle.color = '#155724'; optionLabelStyle.fontWeight = 'bold'; }
                                        else if (answers[q.id] === opt && opt !== q.correct) { optionLabelStyle.backgroundColor = '#f8d7da'; optionLabelStyle.color = '#721c24'; }
                                    }
                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input type="radio" checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} disabled={isSubmitted} style={{ marginRight: '10px' }} />
                                            {opt}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam} disabled={isSubmitted}>
                {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
        </div>
    );
};

const Senior3MathUnit8Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questions = [
        {
            id: 'u8_q1',
            text: "1. A ladder which is 6 m long leans against a wall. If the top of the ladder is 4 m above the ground, how far from the wall is the foot of the ladder? (Approximate to 2 decimal places)",
            options: ['4.47 m', '2.00 m', '5.00 m', '4.90 m'],
            correct: '4.47 m'
        },
        {
            id: 'u8_q2',
            text: "2. In a right-angled triangle, the median to the hypotenuse is 6.4 cm. What is the length of the hypotenuse?",
            options: ['12.8 cm', '3.2 cm', '6.4 cm', '10.0 cm'],
            correct: '12.8 cm'
        },
        {
            id: 'u8_q3',
            text: "3. In a right-angled triangle the length of the median to the hypotenuse is (3x - 7) cm long. The hypotenuse is (5x - 4) cm long. Find the length of the hypotenuse.",
            options: ['46 cm', '10 cm', '23 cm', '20 cm'],
            correct: '46 cm'
        },
        {
            id: 'u8_q4',
            text: "4. A right-angled triangle ABC has its leg a = 5 cm long and altitude to the hypotenuse h = 3 cm. Find the length of side c (the hypotenuse) approximately.",
            options: ['6.25 cm', '5.83 cm', '7.00 cm', '4.00 cm'],
            correct: '6.25 cm'
        },
        {
            id: 'u8_q5',
            text: "5. Two tall buildings A and B are 40 m apart. From foot A, the angle of elevation of the top of B is 60°. From the top of A, the angle of depression of the top of B is 30°. Find the heights of A and B, to the nearest 1 m.",
            options: [
                'A = 92 m, B = 69 m',
                'A = 40 m, B = 60 m',
                'A = 69 m, B = 92 m',
                'A = 50 m, B = 30 m'
            ],
            correct: 'A = 92 m, B = 69 m'
        }
    ];

    const [answers, setAnswers] = useState({});
    const handleChange = (qId, option) => setAnswers({ ...answers, [qId]: option });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct) correctCount++; });
        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 8 Test: Right-Angled Triangles</h1>
            {score !== null && (
                <div className={"exam-result interactive-card " + (score >= 50 ? "success" : "fail")}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                </div>
            )}
            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) { optionLabelStyle.backgroundColor = '#d4edda'; optionLabelStyle.color = '#155724'; optionLabelStyle.fontWeight = 'bold'; }
                                        else if (answers[q.id] === opt && opt !== q.correct) { optionLabelStyle.backgroundColor = '#f8d7da'; optionLabelStyle.color = '#721c24'; }
                                    }
                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input type="radio" checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} disabled={isSubmitted} style={{ marginRight: '10px' }} />
                                            {opt}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam} disabled={isSubmitted}>
                {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
        </div>
    );
};
`;

let newContent = content.replace(
    'const isSenior3MathUnit3 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 3");',
    `const isSenior3MathUnit3 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 3");
    const isSenior3MathUnit4 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 4");
    const isSenior3MathUnit5 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 5");
    const isSenior3MathUnit6 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 6");
    const isSenior3MathUnit7 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 7");
    const isSenior3MathUnit8 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 8");`
);

newContent = newContent.replace(
    'if (isSenior3MathUnit3) CurrentExam = Senior3MathUnit3Exam;',
    `if (isSenior3MathUnit3) CurrentExam = Senior3MathUnit3Exam;
    if (isSenior3MathUnit4) CurrentExam = Senior3MathUnit4Exam;
    if (isSenior3MathUnit5) CurrentExam = Senior3MathUnit5Exam;
    if (isSenior3MathUnit6) CurrentExam = Senior3MathUnit6Exam;
    if (isSenior3MathUnit7) CurrentExam = Senior3MathUnit7Exam;
    if (isSenior3MathUnit8) CurrentExam = Senior3MathUnit8Exam;`
);

if (!newContent.includes('const Senior3MathUnit4Exam = () => {')) {
    newContent = newContent.replace('const Assessment = () => {', s3MathUnits4to8 + '\\n\\nconst Assessment = () => {');
}

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected Units 4 to 8.');
