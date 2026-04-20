const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const s3MathUnit2 = `
const Senior3MathUnit2Exam = () => {
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
            id: 'q1',
            text: "1. Add 3554_six to 44_six giving your answer in the same base.",
            options: ['4042_six', '3642_six', '4204_six', '4122_six'],
            correct: '4042_six'
        },
        {
            id: 'q2',
            text: "2. (a) Express 101_eight in base 2.\\n(b) Calculate 110_two × 1010_two giving your answer in base two and also in base ten.",
            options: [
                '(a) 1000001_two, (b) 111100_two and 60_ten',
                '(a) 101001_two, (b) 111000_two and 56_ten',
                '(a) 1000101_two, (b) 101100_two and 44_ten',
                '(a) 110001_two, (b) 110100_two and 52_ten'
            ],
            correct: '(a) 1000001_two, (b) 111100_two and 60_ten'
        },
        {
            id: 'q3',
            text: "3. Write 230_n as an algebraic expression in terms of n.",
            options: ['2n^2 + 3n', '2n^3 + 3n^2', '2n + 3', '2n^2 + 3'],
            correct: '2n^2 + 3n'
        },
        {
            id: 'q4',
            text: "4. Given that 10022_three = 155_n, find the value of n.",
            options: ['n = 7', 'n = 5', 'n = 9', 'n = 8'],
            correct: 'n = 7'
        },
        {
            id: 'q5',
            text: "5. Write each of the numbers as a mixed number in the given base:\\n(a) 101.11_ten\\n(b) 21.01_five",
            options: [
                '(a) 101 11/100_ten, (b) 21 1/100_five',
                '(a) 10 111/1000_ten, (b) 2 101/1000_five',
                '(a) 101 1/11_ten, (b) 21 1/1_five',
                '(a) 101 11/10_ten, (b) 21 1/10_five'
            ],
            correct: '(a) 101 11/100_ten, (b) 21 1/100_five'
        },
        {
            id: 'q6',
            text: "6. If 13 × 21 = 303 find the base of the multiplication.",
            options: ['Base 7', 'Base 5', 'Base 8', 'Base 9'],
            correct: 'Base 7'
        },
        {
            id: 'q7',
            text: "7. In a binary addition, t and r stands for a particular digit i.e 0 or 1. Find t and r to complete the addition:\\n    1trrt\\n + 1trr\\n-----------\\n  100001",
            options: ['t=0, r=1', 't=1, r=0', 't=1, r=1', 't=0, r=0'],
            correct: 't=0, r=1'
        },
        {
            id: 'q8',
            text: "8. Carry out the following in base six:\\n(a) 115_six + 251_six + 251_six\\n(b) 53412_six - 34125_six\\n(c) 123_six × 54_six",
            options: [
                '(a) 1101_six, (b) 15243_six, (c) 11610_six',
                '(a) 1001_six, (b) 15233_six, (c) 11510_six',
                '(a) 1201_six, (b) 14243_six, (c) 11410_six',
                '(a) 1151_six, (b) 15443_six, (c) 10610_six'
            ],
            correct: '(a) 1101_six, (b) 15243_six, (c) 11610_six'
        },
        {
            id: 'q9',
            text: "9. If A stands for 10 and B stands for eleven, perform the following duodecimal calculation: 59A + AB",
            options: ['689', 'A89', 'B89', '4A9'],
            correct: '689'
        },
        {
            id: 'q10',
            text: "10. Solve the equation for x: 31_x - 17_x = 16_x",
            options: ['x = 12', 'x = 14', 'x = 8', 'x = 10'],
            correct: 'x = 12'
        }
    ];

    const [answers, setAnswers] = useState({});

    const handleChange = (qId, option) => {
        setAnswers({ ...answers, [qId]: option });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { 
            setShowConfetti(true); 
            setTimeout(() => setShowConfetti(false), 8000); 
        }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 2 Test: Number Bases</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Excellent work! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) {
                        const isCorrect = answers[q.id] === q.correct;
                        containerClass += isCorrect ? " correct-box" : " incorrect-box";
                    }

                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) {
                                            optionLabelStyle.backgroundColor = '#d4edda';
                                            optionLabelStyle.color = '#155724';
                                            optionLabelStyle.fontWeight = 'bold';
                                        } else if (answers[q.id] === opt && opt !== q.correct) {
                                            optionLabelStyle.backgroundColor = '#f8d7da';
                                            optionLabelStyle.color = '#721c24';
                                        }
                                    }

                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input 
                                                type="radio" 
                                                name={q.id} 
                                                checked={answers[q.id] === opt} 
                                                onChange={() => handleChange(q.id, opt)}
                                                disabled={isSubmitted}
                                                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                                            />
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
            <style>{ \`
                .correct-box { border: 2px solid #2ECC71 !important; background-color: rgba(46, 204, 113, 0.05); }
                .incorrect-box { border: 2px solid #E74C3C !important; background-color: rgba(231, 76, 60, 0.05); }
            \`}</style>
        </div>
    );
};

const Senior3MathUnit3Exam = () => {
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
            id: 'u3_q1',
            text: "1. Simplify each of the following algebraic fractions by expressing them as single fractions in their lowest terms:\\n(a) a/3 + a/4 + a/5\\n(b) x/2 + x/3 + x/4\\n(c) 1 + (x+2)/3\\n(d) x/3 + (2x-1)/4",
            options: [
                '(a) 47a/60, (b) 13x/12, (c) (x+5)/3, (d) (10x-3)/12',
                '(a) 3a/12, (b) 3x/9, (c) x/3, (d) (3x-1)/7',
                '(a) 15a/60, (b) 6x/12, (c) (x+3)/3, (d) (8x-3)/12',
                '(a) 47a/12, (b) 13x/24, (c) (2x+5)/3, (d) (10x+3)/12'
            ],
            correct: '(a) 47a/60, (b) 13x/12, (c) (x+5)/3, (d) (10x-3)/12'
        },
        {
            id: 'u3_q2',
            text: "2. Simplify each of the following algebraic fractions:\\n(a) 3a/4 - a/5\\n(b) x/2 - (y-4)/3\\n(c) 4x/3y - 2x/5y\\n(d) (x-3)/4 - x/3",
            options: [
                '(a) 11a/20, (b) (3x - 2y + 8)/6, (c) 14x/15y, (d) (-x - 9)/12',
                '(a) 2a/20, (b) (3x - 2y - 8)/6, (c) 2x/15y, (d) (x - 9)/12',
                '(a) 15a/20, (b) (x - 2y + 8)/6, (c) 14x/8y, (d) (-x + 9)/12',
                '(a) 11a/9, (b) (3x + 2y - 8)/6, (c) 10x/15y, (d) (-7x - 9)/12'
            ],
            correct: '(a) 11a/20, (b) (3x - 2y + 8)/6, (c) 14x/15y, (d) (-x - 9)/12'
        },
        {
            id: 'u3_q3',
            text: "3. Multiply and simplify:\\n(a) (8x / xy) × (2x / 4x)\\n(b) (ab² / bc²) ÷ (a² / 3bc³)",
            options: [
                '(a) 4/y, (b) 3b³c/a',
                '(a) 2x/y, (b) 3b/ac',
                '(a) 4x/y, (b) 3b³c/a²',
                '(a) 8/xy, (b) b³c/a'
            ],
            correct: '(a) 4/y, (b) 3b³c/a'
        },
        {
            id: 'u3_q4',
            text: "4. Solve the following equations:\\n(a) m/3 + m/5 = 2\\n(b) (3x+2)/(3x+4) = (x-1)/(x+1)",
            options: [
                '(a) m = 15/4, (b) x = -3/2',
                '(a) m = 15/8, (b) x = 3/2',
                '(a) m = 30/4, (b) x = -2/3',
                '(a) m = 10, (b) x = 2'
            ],
            correct: '(a) m = 15/4, (b) x = -3/2'
        },
        {
            id: 'u3_q5',
            text: "5. Simplify the expression and find restrictions:\\n(a) ((x+1)/(x²-1)) ÷ (3x/(x-1))",
            options: [
                '1/3x ; restrictions: x ≠ 0, x ≠ 1, x ≠ -1',
                '3x ; restrictions: x ≠ 0, x ≠ 1',
                '1/(x-1) ; restrictions: x ≠ 1, x ≠ -1',
                '1/3x ; no restrictions'
            ],
            correct: '1/3x ; restrictions: x ≠ 0, x ≠ 1, x ≠ -1'
        }
    ];

    const [answers, setAnswers] = useState({});

    const handleChange = (qId, option) => {
        setAnswers({ ...answers, [qId]: option });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const percent = (correctCount / questions.length) * 100;
        setScore(percent);
        if (percent >= 50) { 
            setShowConfetti(true); 
            setTimeout(() => setShowConfetti(false), 8000); 
        }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 3 Test: Algebraic Fractions</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Excellent work! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section">
                {questions.map((q, idx) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) {
                        const isCorrect = answers[q.id] === q.correct;
                        containerClass += isCorrect ? " correct-box" : " incorrect-box";
                    }

                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {q.options.map(opt => {
                                    let optionLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '5px' };
                                    if (isSubmitted) {
                                        if (opt === q.correct) {
                                            optionLabelStyle.backgroundColor = '#d4edda';
                                            optionLabelStyle.color = '#155724';
                                            optionLabelStyle.fontWeight = 'bold';
                                        } else if (answers[q.id] === opt && opt !== q.correct) {
                                            optionLabelStyle.backgroundColor = '#f8d7da';
                                            optionLabelStyle.color = '#721c24';
                                        }
                                    }

                                    return (
                                        <label key={opt} style={optionLabelStyle}>
                                            <input 
                                                type="radio" 
                                                name={q.id} 
                                                checked={answers[q.id] === opt} 
                                                onChange={() => handleChange(q.id, opt)}
                                                disabled={isSubmitted}
                                                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                                            />
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
            <style>{ \`
                .correct-box { border: 2px solid #2ECC71 !important; background-color: rgba(46, 204, 113, 0.05); }
                .incorrect-box { border: 2px solid #E74C3C !important; background-color: rgba(231, 76, 60, 0.05); }
            \`}</style>
        </div>
    );
};
`;

let newContent = content.replace('const Assessment = () => {', s3MathUnit2 + '\n\nconst Assessment = () => {');

// Inject logic
newContent = newContent.replace(
    'const isSenior3MathUnit1 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 1");',
    `const isSenior3MathUnit1 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 1");
    const isSenior3MathUnit2 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 2");
    const isSenior3MathUnit3 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 3");`
);

newContent = newContent.replace(
    'if (isSenior3MathUnit1) CurrentExam = Senior3MathUnit1Exam;',
    `if (isSenior3MathUnit1) CurrentExam = Senior3MathUnit1Exam;
    if (isSenior3MathUnit2) CurrentExam = Senior3MathUnit2Exam;
    if (isSenior3MathUnit3) CurrentExam = Senior3MathUnit3Exam;`
);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected Unit 2 and Unit 3.');
