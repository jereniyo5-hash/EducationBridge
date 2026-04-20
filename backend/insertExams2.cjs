const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const exams = `
const Primary1EnglishUnit6Exam = () => {
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
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '',
        q10: '', q11: '', q12: ''
    });

    const correctMap = {
        q1: 'blackboard', q2: 'book', q3: 'table', q4: 'desk', q5: 'chair', 
        q6: 'cupboard', q7: 'chalk', q8: 'pen', q9: 'pencil',
        q10: 'u', q11: 'u', q12: 'u'
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

    const getInputClass = (name, baseClass = 'num-box small') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 6</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Name the objects:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>📓 Blackboard</span> <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1', 'phrase-box')} placeholder="blackboard" /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>📗 Book</span> <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🪑 Table</span> <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🪑 Desk</span> <input name="q4" value={answers.q4} onChange={handleChange} className={getInputClass('q4', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🪑 Chair</span> <input name="q5" value={answers.q5} onChange={handleChange} className={getInputClass('q5', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🗄️ Cupboard</span> <input name="q6" value={answers.q6} onChange={handleChange} className={getInputClass('q6', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🖍️ Chalk</span> <input name="q7" value={answers.q7} onChange={handleChange} className={getInputClass('q7', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>🖊️ Pen</span> <input name="q8" value={answers.q8} onChange={handleChange} className={getInputClass('q8', 'phrase-box')} placeholder="..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '150px' }}>✏️ Pencil</span> <input name="q9" value={answers.q9} onChange={handleChange} className={getInputClass('q9', 'phrase-box')} placeholder="..." /></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Fill in /u/ sound and read.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">a) <input name="q10" value={answers.q10} onChange={handleChange} className={getInputClass('q10')} maxLength={1} /> nity.</div>
                    <div className="math-row">b) <input name="q11" value={answers.q11} onChange={handleChange} className={getInputClass('q11')} maxLength={1} /> niform.</div>
                    <div className="math-row">c) <input name="q12" value={answers.q12} onChange={handleChange} className={getInputClass('q12')} maxLength={1} /> se.</div>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit7Exam = () => {
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
        m1: '', m2: '', m3: '', m4: '', m5: '', m6: '',
        k1: '', k2: '', k3: '', k4: '',
        c1: '', c2: '', c3: ''
    });

    const correctMap = {
        m1: 'Bed', m2: 'Lamp', m3: 'Table', m4: 'Chair', m5: 'Mat', m6: 'Mosquito net',
        k1: 'i', k2: 'o', k3: 'a', k4: 'o',
        c1: 'ch', c2: 'ch', c3: 'ch'
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

    const getInputClass = (name, baseClass = 'num-box small') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 7</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Match the object with the correct word.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '1rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>🛏️ (Bed)</span> <select name="m1" value={answers.m1} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>🪔 (Lamp)</span> <select name="m2" value={answers.m2} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>🪑 (Table)</span> <select name="m3" value={answers.m3} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>🪑 (Chair)</span> <select name="m4" value={answers.m4} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>🟥 (Mat)</span> <select name="m5" value={answers.m5} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ minWidth: '100px' }}>⛺ (Net)</span> <select name="m6" value={answers.m6} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}><option value="">--Select--</option><option value="Table">Table</option><option value="Mosquito net">Mosquito net</option><option value="Lamp">Lamp</option><option value="Chair">Chair</option><option value="Bed">Bed</option><option value="Mat">Mat</option></select></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Name the objects in the picture. Write the missing letter.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">1) Kn <input name="k1" value={answers.k1} onChange={handleChange} className={getInputClass('k1')} maxLength={1} /> fe (🔪)</div>
                    <div className="math-row">2) Sp <input name="k2" value={answers.k2} onChange={handleChange} className={getInputClass('k2')} maxLength={1} /> on (🥄)</div>
                    <div className="math-row">3) T <input name="k3" value={answers.k3} onChange={handleChange} className={getInputClass('k3')} maxLength={1} /> ble (🪑)</div>
                    <div className="math-row">4) F <input name="k4" value={answers.k4} onChange={handleChange} className={getInputClass('k4')} maxLength={1} /> rk (🍴)</div>
                </div>
            </div>
            
            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>3. Fill in /ch/ sound and read the words.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">a) <input name="c1" value={answers.c1} onChange={handleChange} className={getInputClass('c1', 'num-box')} maxLength={2} style={{width: '70px'}} /> urch</div>
                    <div className="math-row">b) <input name="c2" value={answers.c2} onChange={handleChange} className={getInputClass('c2', 'num-box')} maxLength={2} style={{width: '70px'}} /> air.</div>
                    <div className="math-row">c) tea <input name="c3" value={answers.c3} onChange={handleChange} className={getInputClass('c3', 'num-box')} maxLength={2} style={{width: '70px'}} /> er.</div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit8Exam = () => {
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
        l1: '', s1: '',
        l2: '', s2: '',
        l3: '', s3: '',
        l4: '', s4: '',
        l5: '', s5: '',
        t1: '', t2: ''
    });

    const correctMap = {
        l1: 'o', s1: 'Moo',
        l2: 'o', s2: 'Bark',
        l3: 'a', s3: 'Meow',
        l4: 'i', s4: 'Cluck',
        l5: 'o', s5: 'Bray',
        t1: 'th', t2: 'th'
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

    const getInputClass = (name, baseClass = 'num-box small') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    const soundOptions = (
        <>
            <option value="">-Sound-</option>
            <option value="Bark">Bark</option>
            <option value="Cluck">Cluck</option>
            <option value="Bray">Bray</option>
            <option value="Moo">Moo</option>
            <option value="Meow">Meow</option>
        </>
    );

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 8</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Write the missing letter. Match the animal with the sound.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '1rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ minWidth: '100px' }}>🐄 C <input name="l1" value={answers.l1} onChange={handleChange} className={getInputClass('l1')} maxLength={1} style={{width:'30px', height:'30px', fontSize:'1rem', padding: '0'}} /> w</span> <select name="s1" value={answers.s1} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}>{soundOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ minWidth: '100px' }}>🐕 D <input name="l2" value={answers.l2} onChange={handleChange} className={getInputClass('l2')} maxLength={1} style={{width:'30px', height:'30px', fontSize:'1rem', padding: '0'}} /> g</span> <select name="s2" value={answers.s2} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}>{soundOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ minWidth: '100px' }}>🐈 C <input name="l3" value={answers.l3} onChange={handleChange} className={getInputClass('l3')} maxLength={1} style={{width:'30px', height:'30px', fontSize:'1rem', padding: '0'}} /> t</span> <select name="s3" value={answers.s3} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}>{soundOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ minWidth: '100px' }}>🐓 Ch <input name="l4" value={answers.l4} onChange={handleChange} className={getInputClass('l4')} maxLength={1} style={{width:'30px', height:'30px', fontSize:'1rem', padding: '0'}} /> cken</span> <select name="s4" value={answers.s4} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}>{soundOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ minWidth: '100px' }}>🫏 D <input name="l5" value={answers.l5} onChange={handleChange} className={getInputClass('l5')} maxLength={1} style={{width:'30px', height:'30px', fontSize:'1rem', padding: '0'}} /> nkey</span> <select name="s5" value={answers.s5} onChange={handleChange} style={{ padding: '5px', fontSize: '1rem', flex: 1 }}>{soundOptions}</select></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Fill in /th/ sound and read.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">a) <input name="t1" value={answers.t1} onChange={handleChange} className={getInputClass('t1', 'num-box')} maxLength={2} style={{width: '70px'}} /> ank.</div>
                    <div className="math-row">b) <input name="t2" value={answers.t2} onChange={handleChange} className={getInputClass('t2', 'num-box')} maxLength={2} style={{width: '70px'}} /> an.</div>
                </div>
            </div>
            
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};
`;

let newContent = content.replace('const Assessment = () => {', exams + '\n\nconst Assessment = () => {');

newContent = newContent.replace('const isPrimary1EnglishUnit5 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 5");',
`const isPrimary1EnglishUnit5 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 5");
    const isPrimary1EnglishUnit6 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 6");
    const isPrimary1EnglishUnit7 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 7");
    const isPrimary1EnglishUnit8 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 8");`);

newContent = newContent.replace('if (isPrimary1EnglishUnit5) CurrentExam = Primary1EnglishUnit5Exam;',
`if (isPrimary1EnglishUnit5) CurrentExam = Primary1EnglishUnit5Exam;
    if (isPrimary1EnglishUnit6) CurrentExam = Primary1EnglishUnit6Exam;
    if (isPrimary1EnglishUnit7) CurrentExam = Primary1EnglishUnit7Exam;
    if (isPrimary1EnglishUnit8) CurrentExam = Primary1EnglishUnit8Exam;`);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected English exams Unit 6 to 8');
