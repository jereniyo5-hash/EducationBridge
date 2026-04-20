const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const exams = `
const Primary1EnglishUnit9Exam = () => {
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
        q1: '', q2: '', q3: '',
        t1: '', t2: '', t3: '', t4: '', t5: ''
    });

    const checkTime = (input, validOptions) => {
        const val = input.toLowerCase().trim();
        return validOptions.some(opt => val.includes(opt));
    };

    const isCorrect = (name) => {
        const val = answers[name];
        if (name === 'q1') return checkTime(val, ['4', 'four']);
        if (name === 'q2') return checkTime(val, ['6:35', 'thirty five', 'thirty-five', 'twenty-five', 'twenty five']);
        if (name === 'q3') return checkTime(val, ['1:05', 'one five', 'five past one', 'one oh five']);
        if (name === 't1') return checkTime(val, ['7:30', 'seven thirty', 'half past seven']);
        if (name === 't2') return checkTime(val, ['8:45', 'eight forty', 'quarter to nine']);
        if (name === 't3') return checkTime(val, ['5:15', 'five fifteen', 'quarter past five']);
        if (name === 't4') return checkTime(val, ['4:50', 'four fifty', 'ten to five']);
        if (name === 't5') return checkTime(val, ['9:45', 'nine forty', 'quarter to ten']);
        return false;
    };

    const handleChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let keys = Object.keys(answers);
        let totalQuestions = keys.length; 

        keys.forEach(k => { if (isCorrect(k)) correctAnswers++; });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name, baseClass = 'phrase-box') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${isCorrect(name) ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 9</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Telling Time</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', color: 'red' }}>What time is it? (Clock shows 4:20)</div>
                        It is twenty past <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1')} style={{ width: '150px' }} />.
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', color: 'red' }}>What time is it? (Clock shows 6:35)</div>
                        It is <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2')} style={{ width: '250px' }} />.
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', color: 'red' }}>What time is it? (Clock shows 1:05)</div>
                        It is <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3')} style={{ width: '250px' }} />.
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Telling Time (Activities)</h3>
                <p>Example: (Clock 7:00) I wake up at seven o'clock.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div>
                        <div>(Clock 7:30) Eating breakfast...</div>
                        I eat breakfast at <input name="t1" value={answers.t1} onChange={handleChange} className={getInputClass('t1')} style={{ width: '250px' }} placeholder="e.g. 7:30" />.
                    </div>
                    <div>
                        <div>(Clock 8:45) Going to the farm...</div>
                        I go to the farm at <input name="t2" value={answers.t2} onChange={handleChange} className={getInputClass('t2')} style={{ width: '250px' }} placeholder="e.g. 8:45" />.
                    </div>
                    <div>
                        <div>(Clock 5:15) Cleaning the bathroom...</div>
                        I clean the bathroom at <input name="t3" value={answers.t3} onChange={handleChange} className={getInputClass('t3')} style={{ width: '250px' }} placeholder="e.g. 5:15" />.
                    </div>
                    <div>
                        <div>(Clock 4:50) Going out to play...</div>
                        I go out to play at <input name="t4" value={answers.t4} onChange={handleChange} className={getInputClass('t4')} style={{ width: '250px' }} placeholder="e.g. 4:50" />.
                    </div>
                    <div>
                        <div>(Clock 9:45) Doing homework...</div>
                        I do my homework at <input name="t5" value={answers.t5} onChange={handleChange} className={getInputClass('t5')} style={{ width: '250px' }} placeholder="e.g. 9:45" />.
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};

const Primary1EnglishUnit10Exam = () => {
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
        s1: '', s2: '', s3: '', s4: '', s5: '', s6: '', // story elements a-f
        d1: '', d2: '', d3: '', d4: '', d5: '', d6: '', d7: '', // days of week
        cb1: false, cb2: false, cb3: false, cb4: false, cb5: false, cb6: false, cb7: false, // listen and repeat
        f1: '', f2: '', f3: '', f4: '', f5: '', f6: '', f7: '', f8: '', f9: '', f10: '' // fill missing
    });

    const fMap = {
        f1: 'i', f2: 'e', f3: 'h', f4: 'a', f5: 'o', f6: 'o', f7: 'r', f8: 'h', f9: 'h', f10: 'h'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnswers({ ...answers, [name]: type === 'checkbox' ? checked : value });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 30; // 6 story + 7 days + 7 checks + 10 fills

        // Subjective check for story & days: just need to provide some answer
        ['s1','s2','s3','s4','s5','s6', 'd1','d2','d3','d4','d5','d6','d7'].forEach(k => {
            if (answers[k].trim().length > 0) correctAnswers++;
        });

        // Checks
        ['cb1','cb2','cb3','cb4','cb5','cb6','cb7'].forEach(k => {
            if (answers[k]) correctAnswers++;
        });

        // Exact match
        Object.keys(fMap).forEach(k => {
            if (answers[k].trim().toLowerCase() === fMap[k].toLowerCase()) correctAnswers++;
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'num-box small';
        return \`num-box small \${answers[name].trim().toLowerCase() === fMap[name].toLowerCase() ? 'correct' : 'incorrect'}\`;
    };

    const getSubjectiveClass = (name, baseClass = 'phrase-box') => {
        if (!isSubmitted) return baseClass;
        return \`\${baseClass} \${answers[name].trim().length > 0 ? 'correct' : 'incorrect'}\`;
    };

    const storyOptions = (
        <>
            <option value="">-Select-</option>
            <option value="a">Picture a</option>
            <option value="b">Picture b</option>
            <option value="c">Picture c</option>
            <option value="d">Picture d</option>
            <option value="e">Picture e</option>
            <option value="f">Picture f</option>
        </>
    );

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 10</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Rearrange the pictures to retell the story</h3>
                <p>Select the sequence of pictures to tell a story.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr)', gap: '1rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>1st: <select name="s1" value={answers.s1} onChange={handleChange} className={getSubjectiveClass('s1', '')}>{storyOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>2nd: <select name="s2" value={answers.s2} onChange={handleChange} className={getSubjectiveClass('s2', '')}>{storyOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>3rd: <select name="s3" value={answers.s3} onChange={handleChange} className={getSubjectiveClass('s3', '')}>{storyOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>4th: <select name="s4" value={answers.s4} onChange={handleChange} className={getSubjectiveClass('s4', '')}>{storyOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>5th: <select name="s5" value={answers.s5} onChange={handleChange} className={getSubjectiveClass('s5', '')}>{storyOptions}</select></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>6th: <select name="s6" value={answers.s6} onChange={handleChange} className={getSubjectiveClass('s6', '')}>{storyOptions}</select></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Can you tell another story?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.2rem', paddingLeft: '1rem' }}>
                    <div>1) What do you do on Monday? <input name="d1" value={answers.d1} onChange={handleChange} className={getSubjectiveClass('d1')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>2) What do you do on Tuesday? <input name="d2" value={answers.d2} onChange={handleChange} className={getSubjectiveClass('d2')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>3) What do you do on Wednesday? <input name="d3" value={answers.d3} onChange={handleChange} className={getSubjectiveClass('d3')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>4) What do you do on Thursday? <input name="d4" value={answers.d4} onChange={handleChange} className={getSubjectiveClass('d4')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>5) What do you do on Friday? <input name="d5" value={answers.d5} onChange={handleChange} className={getSubjectiveClass('d5')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>6) What do you do on Saturday? <input name="d6" value={answers.d6} onChange={handleChange} className={getSubjectiveClass('d6')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    <div>7) What do you do on Sunday? <input name="d7" value={answers.d7} onChange={handleChange} className={getSubjectiveClass('d7')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>3. Listen and repeat</h3>
                <p>Check the box after repeating the word to your teacher.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb1" checked={answers.cb1} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 1) Fish pond</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb2" checked={answers.cb2} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 2) Veterinary officer</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb3" checked={answers.cb3} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 3) Church</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb4" checked={answers.cb4} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 4) Cat</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb5" checked={answers.cb5} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 5) Cow</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb6" checked={answers.cb6} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 6) Dog</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="cb7" checked={answers.cb7} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '1rem' }} /> 7) Birds</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>4. Fill in the missing letter</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                    <div className="math-row">1) F <input name="f1" value={answers.f1} onChange={handleChange} className={getInputClass('f1')} maxLength={1} /> sh pond</div>
                    <div className="math-row">2) V <input name="f2" value={answers.f2} onChange={handleChange} className={getInputClass('f2')} maxLength={1} /> terinary officer</div>
                    <div className="math-row">3) C <input name="f3" value={answers.f3} onChange={handleChange} className={getInputClass('f3')} maxLength={1} /> urch</div>
                    <div className="math-row">4) C <input name="f4" value={answers.f4} onChange={handleChange} className={getInputClass('f4')} maxLength={1} /> t</div>
                    <div className="math-row">5) C <input name="f5" value={answers.f5} onChange={handleChange} className={getInputClass('f5')} maxLength={1} /> w</div>
                    <div className="math-row">6) D <input name="f6" value={answers.f6} onChange={handleChange} className={getInputClass('f6')} maxLength={1} /> g</div>
                    <div className="math-row">7) Bi <input name="f7" value={answers.f7} onChange={handleChange} className={getInputClass('f7')} maxLength={1} /> ds</div>
                    <div className="math-row">8) Fat <input name="f8" value={answers.f8} onChange={handleChange} className={getInputClass('f8')} maxLength={1} /> er</div>
                    <div className="math-row">9) Brot <input name="f9" value={answers.f9} onChange={handleChange} className={getInputClass('f9')} maxLength={1} /> er</div>
                    <div className="math-row">10) Bat <input name="f10" value={answers.f10} onChange={handleChange} className={getInputClass('f10')} maxLength={1} /> ing</div>
                </div>
            </div>
            
            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Submit Answers</button>
        </div>
    );
};
`;

let newContent = content.replace('const Assessment = () => {', exams + '\n\nconst Assessment = () => {');

newContent = newContent.replace('const isPrimary1EnglishUnit8 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 8");',
`const isPrimary1EnglishUnit8 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 8");
    const isPrimary1EnglishUnit9 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 9");
    const isPrimary1EnglishUnit10 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 10");`);

newContent = newContent.replace('if (isPrimary1EnglishUnit8) CurrentExam = Primary1EnglishUnit8Exam;',
`if (isPrimary1EnglishUnit8) CurrentExam = Primary1EnglishUnit8Exam;
    if (isPrimary1EnglishUnit9) CurrentExam = Primary1EnglishUnit9Exam;
    if (isPrimary1EnglishUnit10) CurrentExam = Primary1EnglishUnit10Exam;`);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected English exams Unit 9 and 10');
