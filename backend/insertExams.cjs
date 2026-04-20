const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const exams = `
const Primary1EnglishUnit2Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [answers, setAnswers] = useState({
        q1_1: '', q1_2: '', q1_3: '', q1_4: '', q1_5: '', q1_6: '',
        q2_1: '', q2_2: '', q2_3: '', q2_4: '', q2_5: ''
    });

    const correctMap = {
        q1_1: 'orange', q1_2: 'yellow', q1_3: 'green', q1_4: 'blue', q1_5: 'indigo', q1_6: 'violet',
        q2_1: 'u', q2_2: 'e', q2_3: 'e', q2_4: 'a', q2_5: 'e'
    };

    const handleChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length; 

        Object.keys(correctMap).forEach(key => {
            if (answers[key].trim().toLowerCase() === correctMap[key].toLowerCase()) correctAnswers++;
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 2</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Name the colours of the rainbow below:</h3>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Red &rarr; 🌈</div>
                    <div className="q2-grid" style={{ gap: '1rem', gridTemplateColumns: 'minmax(120px, 1fr)' }}>
                        <input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1', 'phrase-box')} placeholder="2nd colour" />
                        <input name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2', 'phrase-box')} placeholder="3rd colour" />
                        <input name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3', 'phrase-box')} placeholder="4th colour" />
                        <input name="q1_4" value={answers.q1_4} onChange={handleChange} className={getInputClass('q1_4', 'phrase-box')} placeholder="5th colour" />
                        <input name="q1_5" value={answers.q1_5} onChange={handleChange} className={getInputClass('q1_5', 'phrase-box')} placeholder="6th colour" />
                        <input name="q1_6" value={answers.q1_6} onChange={handleChange} className={getInputClass('q1_6', 'phrase-box')} placeholder="7th colour" />
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Fill in the missing letters.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', fontSize: '1.5rem' }}>
                    <div className="math-row">1) r <input name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1', 'num-box small')} maxLength={1} /> ler (📏)</div>
                    <div className="math-row">2) p <input name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2', 'num-box small')} maxLength={1} /> n (🖊️)</div>
                    <div className="math-row">3) d <input name="q2_3" value={answers.q2_3} onChange={handleChange} className={getInputClass('q2_3', 'num-box small')} maxLength={1} /> sk (🪑)</div>
                    <div className="math-row">4) b <input name="q2_4" value={answers.q2_4} onChange={handleChange} className={getInputClass('q2_4', 'num-box small')} maxLength={1} /> g (🎒)</div>
                    <div className="math-row">5) r <input name="q2_5" value={answers.q2_5} onChange={handleChange} className={getInputClass('q2_5', 'num-box small')} maxLength={1} /> d (🟥)</div>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit3Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '' });
    const correctMap = { q1: 'e', q2: 'l', q3: 'o', q4: 'y', q5: 'x', q6: 'l' };

    const handleChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length; 

        Object.keys(correctMap).forEach(key => {
            if (answers[key].trim().toLowerCase() === correctMap[key].toLowerCase()) correctAnswers++;
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'num-box small';
        return \`num-box small \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 3</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>Fill in the missing letters</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">1) My nam <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1')} maxLength={1} /> is Joseph.</div>
                    <div className="math-row">2) I am seven years o <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2')} maxLength={1} /> d.</div>
                    <div className="math-row">3) I am a b <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3')} maxLength={1} /> y.</div>
                    <div className="math-row">4) M <input name="q4" value={answers.q4} onChange={handleChange} className={getInputClass('q4')} maxLength={1} /> name is Kathy.</div>
                    <div className="math-row">5) I am si <input name="q5" value={answers.q5} onChange={handleChange} className={getInputClass('q5')} maxLength={1} /> years old.</div>
                    <div className="math-row">6) I am a gir <input name="q6" value={answers.q6} onChange={handleChange} className={getInputClass('q6')} maxLength={1} /> .</div>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit4Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '',
        a1: false, a2: false
    });
    const correctMap = { q1: 'y', q2: 'a', q3: 'o', q4: 'r', q5: 'i', q6: 'e', q7: 'o' };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnswers({ ...answers, [name]: type === 'checkbox' ? checked : value });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length + 2; 

        Object.keys(correctMap).forEach(key => {
            if (answers[key].trim().toLowerCase() === correctMap[key].toLowerCase()) correctAnswers++;
        });

        if (answers.a1) correctAnswers++;
        if (answers.a2) correctAnswers++;

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'num-box small';
        return \`num-box small \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 4</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1) Body parts: Write the missing letter</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr)', gap: '1.5rem', marginBottom: '2rem', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">E <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1')} maxLength={1} /> e (👁️)</div>
                    <div className="math-row">E <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2')} maxLength={1} /> r (👂)</div>
                    <div className="math-row">M <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3')} maxLength={1} /> uth (👄)</div>
                    <div className="math-row">A <input name="q4" value={answers.q4} onChange={handleChange} className={getInputClass('q4')} maxLength={1} /> m (💪)</div>
                    <div className="math-row">F <input name="q5" value={answers.q5} onChange={handleChange} className={getInputClass('q5')} maxLength={1} /> nger (☝️)</div>
                    <div className="math-row">L <input name="q6" value={answers.q6} onChange={handleChange} className={getInputClass('q6')} maxLength={1} /> g (🦵)</div>
                    <div className="math-row">Fo <input name="q7" value={answers.q7} onChange={handleChange} className={getInputClass('q7')} maxLength={1} /> t (🦶)</div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2) Clothes: Listen and repeat. Say what they are wearing.</h3>
                <p style={{ fontWeight: 'bold' }}>Check the box once you have listened and repeated to your teacher.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' }}>
                        <input type="checkbox" name="a1" checked={answers.a1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>This is Keza. Keza is wearing a brown hat.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' }}>
                        <input type="checkbox" name="a2" checked={answers.a2} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>This is Davis. Davis is wearing a red shirt.</span>
                    </label>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit5Exam = () => {
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' });

    const checkAns = (ans, expectedNum, expectedWord) => {
        const clean = ans.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
        return clean === \`\${expectedNum} children like \${expectedWord}\`;
    };

    const handleChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 7; 

        if (checkAns(answers.q1, '20', 'rice')) correctAnswers++;
        if (checkAns(answers.q2, '25', 'beans')) correctAnswers++;
        if (checkAns(answers.q3, '15', 'eggs')) correctAnswers++;
        if (checkAns(answers.q4, '35', 'cabbage')) correctAnswers++;
        if (checkAns(answers.q5, '10', 'meat')) correctAnswers++;
        if (checkAns(answers.q6, '30', 'milk')) correctAnswers++;
        if (checkAns(answers.q7, '5', 'soda')) correctAnswers++;

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name, expectedNum, expectedWord) => {
        if (!isSubmitted) return 'phrase-box';
        return \`phrase-box \${checkAns(answers[name], expectedNum, expectedWord) ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 5</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>How many children like this food? Answer in full sentences.</h3>
                <p><strong>Example:</strong> How many children like bananas? <em>40 children like bananas</em></p>
                <div style={{ 
                    marginTop: '2rem', marginBottom: '2rem', 
                    padding: '1.5rem', background: '#f8f9fa', borderRadius: '15px',
                    border: '1px solid var(--tab-border)'
                }}>
                    <h4 style={{textAlign:'center', marginBottom: '1rem'}}>Food Preferences Chart</h4>
                    <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', borderLeft: '2px solid black', borderBottom: '2px solid black', paddingBottom: '5px', gap: '5px'}}>
                        <div style={{width:'30px', height: '100%', background: 'navy', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>40</span></div>
                        <div style={{width:'30px', height: '50%', background: 'orange', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>20</span></div>
                        <div style={{width:'30px', height: '62.5%', background: '#00BFFF', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>25</span></div>
                        <div style={{width:'30px', height: '37.5%', background: 'green', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>15</span></div>
                        <div style={{width:'30px', height: '87.5%', background: 'purple', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>35</span></div>
                        <div style={{width:'30px', height: '25%', background: 'red', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>10</span></div>
                        <div style={{width:'30px', height: '75%', background: 'black', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>30</span></div>
                        <div style={{width:'30px', height: '12.5%', background: 'yellow', position: 'relative'}}><span style={{position:'absolute', top: '-25px', left: '-5px', fontWeight: 'bold'}}>5</span></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        <span>Bananas</span><span>Rice</span><span>Beans</span><span>Eggs</span><span>Cabbage</span><span>Meat</span><span>Milk</span><span>Soda</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.2rem' }}>
                    <div>
                        <div>How many children like rice?</div>
                        <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1', '20', 'rice')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like rice" />
                    </div>
                    <div>
                        <div>How many children like beans?</div>
                        <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2', '25', 'beans')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like beans" />
                    </div>
                    <div>
                        <div>How many children like eggs?</div>
                        <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3', '15', 'eggs')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like eggs" />
                    </div>
                    <div>
                        <div>How many children like cabbage?</div>
                        <input name="q4" value={answers.q4} onChange={handleChange} className={getInputClass('q4', '35', 'cabbage')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like cabbage" />
                    </div>
                    <div>
                        <div>How many children like meat?</div>
                        <input name="q5" value={answers.q5} onChange={handleChange} className={getInputClass('q5', '10', 'meat')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like meat" />
                    </div>
                    <div>
                        <div>How many children like milk?</div>
                        <input name="q6" value={answers.q6} onChange={handleChange} className={getInputClass('q6', '30', 'milk')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like milk" />
                    </div>
                    <div>
                        <div>How many children like soda?</div>
                        <input name="q7" value={answers.q7} onChange={handleChange} className={getInputClass('q7', '5', 'soda')} style={{ width: '100%', maxWidth: '400px' }} placeholder="... children like soda" />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};
`;

let newContent = content.replace('const Assessment = () => {', exams + '\n\nconst Assessment = () => {');

newContent = newContent.replace('const isPrimary1EnglishUnit1 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 1");',
`const isPrimary1EnglishUnit1 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 1");
    const isPrimary1EnglishUnit2 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 2");
    const isPrimary1EnglishUnit3 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 3");
    const isPrimary1EnglishUnit4 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 4");
    const isPrimary1EnglishUnit5 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 5");`);

newContent = newContent.replace('if (isPrimary1EnglishUnit1) CurrentExam = Primary1EnglishUnit1Exam;',
`if (isPrimary1EnglishUnit1) CurrentExam = Primary1EnglishUnit1Exam;
    if (isPrimary1EnglishUnit2) CurrentExam = Primary1EnglishUnit2Exam;
    if (isPrimary1EnglishUnit3) CurrentExam = Primary1EnglishUnit3Exam;
    if (isPrimary1EnglishUnit4) CurrentExam = Primary1EnglishUnit4Exam;
    if (isPrimary1EnglishUnit5) CurrentExam = Primary1EnglishUnit5Exam;`);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected English exams Unit 2 to 5');
