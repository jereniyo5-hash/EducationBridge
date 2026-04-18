const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const s3MathUnits9to13 = `
const Senior3MathUnit9Exam = () => {
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
            id: 'u9_q1',
            text: "1. [Refer to Fig. 9.106 in Textbook] Find the angles marked with letters a, b, c, d and e in the given circle figure.",
            options: ['Option A (Visual Problem)', 'Option B (Cannot be determined without image)', 'Option C', 'Option D'],
            correct: 'Option A (Visual Problem)'
        },
        {
            id: 'u9_q2',
            text: "2. [Refer to Fig. 9.107 in Textbook] Find the angles marked by the letters a, b, c and d.",
            options: ['Option A', 'Option B (Requires Textbook Fig 9.107)', 'Option C', 'Option D'],
            correct: 'Option B (Requires Textbook Fig 9.107)'
        },
        {
            id: 'u9_q3',
            text: "3. A chord of a circle of length 15 cm subtends an angle of 120° at the centre. Calculate the radius of the circle.",
            options: ['Approx 8.66 cm', 'Approx 15.00 cm', 'Approx 10.50 cm', 'Approx 12.25 cm'],
            correct: 'Approx 8.66 cm'
        },
        {
            id: 'u9_q4',
            text: "4. The angles of a cyclic quadrilateral are 6x, 3x, x + y and 3x + 4y in that order. Determine the values of x and y.",
            options: ['x = 24.5, y = 8.2', 'x = 22.0, y = 10.0', 'x = 25.0, y = 5.0', 'x = 18.0, y = 12.0'],
            correct: 'x = 24.5, y = 8.2'
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 9 Test: Circle Theorem</h1>
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

const Senior3MathUnit10Exam = () => {
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
            id: 'u10_q1',
            text: "1. Find the value of t such that a = (-1/5) and b = (2/t) are orthogonal.",
            options: ['t = 2/5', 't = 5/2', 't = 10', 't = 1/10'],
            correct: 't = 2/5'
        },
        {
            id: 'u10_q2',
            text: "2. Are the following vectors orthogonal? a = (-9, -4) and b = (2, 4)",
            options: ['True (They are orthogonal)', 'False (They are not orthogonal)'],
            correct: 'False (They are not orthogonal)'
        },
        {
            id: 'u10_q3',
            text: "3. Find the value of n for which the vectors a = (-15, n) and b = (2, 19) are orthogonal.",
            options: ['n = 30/19', 'n = 19/30', 'n = -30/19', 'n = 15/19'],
            correct: 'n = 30/19'
        },
        {
            id: 'u10_q4',
            text: "4. What is the value of n for which the vectors a = (13, 19) and b = (n, -6) are orthogonal?",
            options: ['n = 114/13', 'n = -114/13', 'n = 13/114', 'n = 6/19'],
            correct: 'n = 114/13'
        },
        {
            id: 'u10_q5',
            text: "5. Find the value of x at which the vectors a = (9, x) and b = (4, 13) are orthogonal.",
            options: ['x = -36/13', 'x = 36/13', 'x = -13/36', 'x = 9/4'],
            correct: 'x = -36/13'
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 10 Test: Collinear Points and Orthogonal Vectors</h1>
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

const Senior3MathUnit11Exam = () => {
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
            id: 'u11_q1',
            text: "1. The volumes of two similar cuboids are 500 cm³ and 108 cm³ respectively. Find the ratio of their volumes.",
            options: ['125:27', '500:108', '25:9', '5:3'],
            correct: '125:27' // 500/4 = 125, 108/4 = 27
        },
        {
            id: 'u11_q2',
            text: "2. The volumes of two similar cuboids are 500 cm³ and 108 cm³ respectively. Find the ratio of their surface areas.",
            options: ['25:9', '125:27', '5:3', '10:6'],
            correct: '25:9' // V ratio = a^3 : b^3 => 125:27 => a=5, b=3. Area ratio = a^2:b^2 = 25:9
        },
        {
            id: 'u11_q3',
            text: "3. If the larger cuboid has a total surface area 400 cm², find the surface area of the smaller cuboid. (Using volume ratio 125:27)",
            options: ['144 cm²', '108 cm²', '216 cm²', '160 cm²'],
            correct: '144 cm²' // 400 * (9/25) = 16 * 9 = 144
        },
        {
            id: 'u11_q4',
            text: "4. A bowl in the shape of a hemisphere has a radius of length 10 cm. A similar bowl has a radius of length 20 cm. Calculate the circumference of the larger bowl if that of the smaller one is 64 cm.",
            options: ['128 cm', '64 cm', '256 cm', '320 cm'],
            correct: '128 cm' // Linear scale factor 2. 64 * 2 = 128
        },
        {
            id: 'u11_q5',
            text: "5. Calculate the surface area of the larger bowl (r=20cm) if that of the smaller one (r=10cm) is 629 cm².",
            options: ['2516 cm²', '1258 cm²', '1887 cm²', '3145 cm²'],
            correct: '2516 cm²' // Area scale factor 2^2 = 4. 629 * 4 = 2516
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 11 Test: Enlargement and Similarity in 2D</h1>
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

const Senior3MathUnit12Exam = () => {
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
            id: 'u12_q1',
            text: "1. Draw triangle XYZ with vertices at X(–2, 4), Y(–2, 1), Z(–4, 1). Find the image of XYZ under a reflection in the line x = 0.",
            options: [
                'X(2, 4), Y(2, 1), Z(4, 1)',
                'X(–2, –4), Y(–2, –1), Z(–4, –1)',
                'X(4, 2), Y(1, 2), Z(1, 4)',
                'X(2, –4), Y(2, –1), Z(4, –1)'
            ],
            correct: 'X(2, 4), Y(2, 1), Z(4, 1)'
        },
        {
            id: 'u12_q2',
            text: "2. Find the image of the same triangle XYZ under a rotation through an angle of 180º about (0, 0).",
            options: [
                'X(2, -4), Y(2, -1), Z(4, -1)',
                'X(4, 2), Y(1, 2), Z(1, 4)',
                'X(-2, 4), Y(-2, 1), Z(-4, 1)',
                'X(2, 4), Y(2, 1), Z(4, 1)'
            ],
            correct: 'X(2, -4), Y(2, -1), Z(4, -1)'
        },
        {
            id: 'u12_q3',
            text: "3. Plot triangle PQR at P(2, 2), Q(6, 2), R(6, 4). Find the image of point P under a translation vector (2, 4) followed by a reflection in the line x = 3. Write down the co-ordinates of the final image of point P.",
            options: [
                '(2, 6)',
                '(4, 6)',
                '(0, 2)',
                '(2, -2)'
            ],
            correct: '(2, 6)' // Translation: (2,2) -> (4,6). Reflection in x=3: 4 is 1 unit right of 3, so new x is 3-1=2. Result: (2,6)
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 12 Test: Inverse and Composite Transformations</h1>
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

const Senior3MathUnit13Exam = () => {
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
            id: 'u13_q1',
            text: "1. Data below was collected from a certain supermarket in Kigali City.\\nCommodity prices (May 2016): A=12, B=15, C=30, D=21, E=9, F=27.\\nCalculate the average price for all commodities in May 2016.",
            options: ['19 FRW', '18 FRW', '20 FRW', '21 FRW'],
            correct: '19 FRW' // 114 / 6 = 19
        },
        {
            id: 'u13_q2',
            text: "2. Commodity prices (June 2016): A=18, B=24, C=36, D=42, E=18, F=36.\\nCalculate the average price for all commodities in June 2016.",
            options: ['29 FRW', '28 FRW', '30 FRW', '25 FRW'],
            correct: '29 FRW' // 174 / 6 = 29
        },
        {
            id: 'u13_q3',
            text: "3. Calculate the mean of x from the data: x = [5, 7, 9, 12], y = [6, 5, 3, 6]",
            options: ['8.25', '8.00', '7.75', '8.50'],
            correct: '8.25' // 33 / 4 = 8.25
        },
        {
            id: 'u13_q4',
            text: "4. Calculate the mean of y from the data: x = [5, 7, 9, 12], y = [6, 5, 3, 6]",
            options: ['5.00', '4.50', '5.50', '6.00'],
            correct: '5.00' // 20 / 4 = 5
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 13 Test: Statistics (Bivariate Data)</h1>
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
    'const isSenior3MathUnit8 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 8");',
    `const isSenior3MathUnit8 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 8");
    const isSenior3MathUnit9 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 9");
    const isSenior3MathUnit10 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 10");
    const isSenior3MathUnit11 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 11");
    const isSenior3MathUnit12 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 12");
    const isSenior3MathUnit13 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 13");`
);

newContent = newContent.replace(
    'if (isSenior3MathUnit8) CurrentExam = Senior3MathUnit8Exam;',
    `if (isSenior3MathUnit8) CurrentExam = Senior3MathUnit8Exam;
    if (isSenior3MathUnit9) CurrentExam = Senior3MathUnit9Exam;
    if (isSenior3MathUnit10) CurrentExam = Senior3MathUnit10Exam;
    if (isSenior3MathUnit11) CurrentExam = Senior3MathUnit11Exam;
    if (isSenior3MathUnit12) CurrentExam = Senior3MathUnit12Exam;
    if (isSenior3MathUnit13) CurrentExam = Senior3MathUnit13Exam;`
);

if (!newContent.includes('const Senior3MathUnit9Exam = () => {')) {
    newContent = newContent.replace('const Assessment = () => {', s3MathUnits9to13 + '\\n\\nconst Assessment = () => {');
}

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected Units 9 to 13.');
