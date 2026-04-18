const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const s3MathUnit1 = `
const Senior3MathUnit1Exam = () => {
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
            text: "In a survey of 110 pupils: 63 like engineering, 55 like medicine and 34 like neither. How many pupils like Engineering or Medicine?",
            options: ['42', '76', '13', '55'],
            correct: '76'
        },
        {
            id: 'q2',
            text: "From the same survey (110 pupils, 63 engineering, 55 medicine, 34 neither), how many pupils like both Engineering and Medicine?",
            options: ['21', '34', '42', '13'],
            correct: '42'
        },
        {
            id: 'q3',
            text: "From the same survey, how many pupils like only Medicine?",
            options: ['42', '13', '55', '34'],
            correct: '13'
        },
        {
            id: 'q4',
            text: "Out of 79 customers, 52 bought milk, 32 bought bread, and 15 bought neither. How many bought both bread and milk?",
            options: ['20', '32', '15', '52'],
            correct: '20'
        },
        {
            id: 'q5',
            text: "From the same customer survey (79 customers, 52 milk, 32 bread, 15 neither), how many bought milk only?",
            options: ['20', '12', '32', '52'],
            correct: '32'
        },
        {
            id: 'q6',
            text: "In a survey of 150 students, 83 want to join Engineering, 58 want Medical, and 36 want neither. Find the number of students who wish to join both careers.",
            options: ['83', '36', '27', '58'],
            correct: '27'
        },
        {
            id: 'q7',
            text: "A survey on 50 people about hotels H, S, and L shows: 15 eat at H, 30 at S, 19 at L. 8 eat at H and S, 12 at H and L, 7 at S and L. 5 eat at all three. How many people eat only at Hotel H?",
            options: ['15', '0', '3', '7'],
            correct: '0'
        },
        {
            id: 'q8',
            text: "From the hotel survey, how many people eat at hotels H and S, but not at L?",
            options: ['8', '5', '3', '12'],
            correct: '3'
        },
        {
            id: 'q9',
            text: "From the hotel survey, how many people don't eat at any of the three hotels?",
            options: ['5', '8', '42', '10'],
            correct: '8'
        },
        {
            id: 'q10',
            text: "In a survey of 50 students, 21 like Kiswahili and 32 like Mathematics. Assuming every student likes at least one subject, how many students like only one subject?",
            options: ['47', '50', '29', '18'],
            correct: '47'
        },
        {
            id: 'q11',
            text: "Out of 50 people: 25 read politics, 16 read advertisements, 14 read sports. 5 read politics and ads, 4 read ads and sports, 6 read politics and sports, 2 read all three. How many read at least one of the three sections?",
            options: ['42', '50', '31', '16'],
            correct: '42'
        },
        {
            id: 'q12',
            text: "From the newspaper survey, how many people read only one of the three sections?",
            options: ['16', '31', '9', '6'],
            correct: '31'
        },
        {
            id: 'q13',
            text: "Given that n(A U B) = 29, n(A) = 21, n(B) = 17, and n(A ∩ B) = x. What is the value of x?",
            options: ['9', '29', '38', '4'],
            correct: '9'
        },
        {
            id: 'q14',
            text: "In a group of 60 students: 7 take Math, Physics AND Chem. 9 take Physics & Chem only. 8 take Physics & Math. 5 take Math & Chem only. 11 take Math only. 2 take Physics only. 15 take Chem only. Find the number of those who do not take any of the subjects.",
            options: ['10', '7', '0', '50'],
            correct: '10'
        },
        {
            id: 'q15',
            text: "From the same 60 students survey, find the number of students who take Mathematics.",
            options: ['11', '24', '8', '5'],
            correct: '24'
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
            <h1 className="exam-title gradient-text text-center mb-loose">Unit 1 Test: Problems on Sets</h1>

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
                                {idx + 1}. {q.text}
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

let newContent = content.replace('const Assessment = () => {', s3MathUnit1 + '\n\nconst Assessment = () => {');

// Inject routing conditions
newContent = newContent.replace(
    'const isPrimary1KinyarwandaUnit2 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("kabiri");',
    `const isPrimary1KinyarwandaUnit2 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("kabiri");
    const isSenior3MathUnit1 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 1");`
);

newContent = newContent.replace(
    'if (isPrimary1KinyarwandaUnit2) CurrentExam = Primary1KinyarwandaUnit2Exam;',
    `if (isPrimary1KinyarwandaUnit2) CurrentExam = Primary1KinyarwandaUnit2Exam;
    if (isSenior3MathUnit1) CurrentExam = Senior3MathUnit1Exam;`
);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected Senior 3 Mathematics Unit 1');
