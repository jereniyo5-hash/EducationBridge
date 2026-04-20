const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const exams = `
const Primary1KinyarwandaUnit1Exam = () => {
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
        c1: false, // Ca imirongo
        // ijwi i
        i1: false, i2: false, i3: false, i4: false, i5: false,
        // ijwi u
        u1: false, u2: false, u3: false, u4: false, u5: false,
        // Huza inyajwi i
        h1: '',
        // Huza inyajwi u
        h2: '',
        // inyuguti i I
        w1: false, w2: false, w3: false, w4: false, w5: false, w6: false,
        // inyuguti u U
        wu1: false, wu2: false, wu3: false, wu4: false, wu5: false, wu6: false,
        
        rd1: false, wr1: false // soma, andika
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnswers({ ...answers, [name]: type === 'checkbox' ? checked : value });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 20;

        if (answers.c1) correctAnswers++;
        
        // Ijwi i (Ijisho, Inzuki, Inanasi)
        if (answers.i1) correctAnswers++;
        if (answers.i2) correctAnswers++;
        if (answers.i3) correctAnswers++;
        
        // Ijwi u (Urufunguzo, Umukasi, Umugati, Ibikapu)
        if (answers.u1) correctAnswers++;
        if (answers.u2) correctAnswers++;
        if (answers.u4) correctAnswers++;
        if (answers.u5) correctAnswers++;

        // Huza
        if (answers.h1 === 'Indobo') correctAnswers++;
        if (answers.h2 === 'Isuka') correctAnswers++;
        
        // i I words (amababi, Imiti, Igiraneza, Ikibiriti)
        if (answers.w3) correctAnswers++;
        if (answers.w4) correctAnswers++;
        if (answers.w5) correctAnswers++;
        if (answers.w6) correctAnswers++;

        // u U words (Uwase, inkuru, Usanase, Umugani)
        if (answers.wu1) correctAnswers++;
        if (answers.wu2) correctAnswers++;
        if (answers.wu3) correctAnswers++;
        if (answers.wu4) correctAnswers++;

        if (answers.rd1) correctAnswers++;
        if (answers.wr1) correctAnswers++;

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Isuzuma risoza umutwe wa mbere</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Amanota y'isuzuma: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Ni byiza cyane! Watsinze! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Komeza witoze! usabwa 50% ngo utsinde. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Ca imirongo ikurikira mu ikayi yawe: ( |||| ---- UUU )</h3>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }}><input type="checkbox" name="c1" checked={answers.c1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Naciye imirongo mu ikayi yanjye</label>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Erekana amashusho arimo ijwi <strong>i</strong>.</h3>
                <p>Hitamo amagambo arimo ijwi 'i':</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '1.2rem' }}>
                    <label><input type="checkbox" name="i1" checked={answers.i1} onChange={handleChange} style={{marginRight:'10px'}} /> Ijisho (👁️)</label>
                    <label><input type="checkbox" name="i2" checked={answers.i2} onChange={handleChange} style={{marginRight:'10px'}} /> Inzuki (🐝)</label>
                    <label><input type="checkbox" name="i3" checked={answers.i3} onChange={handleChange} style={{marginRight:'10px'}} /> Inanasi (🍍)</label>
                    <label><input type="checkbox" name="i4" checked={answers.i4} onChange={handleChange} style={{marginRight:'10px'}} /> Urukwavu (🐇)</label>
                    <label><input type="checkbox" name="i5" checked={answers.i5} onChange={handleChange} style={{marginRight:'10px'}} /> Uruvu (🦎)</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>3. Erekana amashusho arimo ijwi <strong>u</strong>.</h3>
                 <p>Hitamo amagambo arimo ijwi 'u':</p>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '1.2rem' }}>
                    <label><input type="checkbox" name="u1" checked={answers.u1} onChange={handleChange} style={{marginRight:'10px'}} /> Urufunguzo (🔑)</label>
                    <label><input type="checkbox" name="u2" checked={answers.u2} onChange={handleChange} style={{marginRight:'10px'}} /> Umukasi (✂️)</label>
                    <label><input type="checkbox" name="u3" checked={answers.u3} onChange={handleChange} style={{marginRight:'10px'}} /> Agaseke</label>
                    <label><input type="checkbox" name="u4" checked={answers.u4} onChange={handleChange} style={{marginRight:'10px'}} /> Umugati (🍞)</label>
                    <label><input type="checkbox" name="u5" checked={answers.u5} onChange={handleChange} style={{marginRight:'10px'}} /> Ibikapu (🎒)</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>4. & 5. Huza inyajwi n’ishusho irimo iryo jwi.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '2rem' }}>i</span>
                        <select name="h1" value={answers.h1} onChange={handleChange} style={{ padding: '0.5rem', fontSize: '1.1rem' }}>
                            <option value="">-- Hitamo ishusho --</option>
                            <option value="Indobo">Indobo (🪣)</option>
                            <option value="Umutaka">Umutaka (☔)</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '2rem' }}>u</span>
                        <select name="h2" value={answers.h2} onChange={handleChange} style={{ padding: '0.5rem', fontSize: '1.1rem' }}>
                            <option value="">-- Hitamo ishusho --</option>
                            <option value="Isuka">Isuka (⛏️)</option>
                            <option value="Indabo">Indabo (🌺)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>6. Erekana inyuguti i I mu magambo akurikira.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) minmax(150px, 1fr)', gap: '1rem', fontSize: '1.2rem' }}>
                    <label><input type="checkbox" name="w1" checked={answers.w1} onChange={handleChange} style={{marginRight:'10px'}} /> amatama</label>
                    <label><input type="checkbox" name="w2" checked={answers.w2} onChange={handleChange} style={{marginRight:'10px'}} /> umutako</label>
                    <label><input type="checkbox" name="w3" checked={answers.w3} onChange={handleChange} style={{marginRight:'10px'}} /> amababi</label>
                    <label><input type="checkbox" name="w4" checked={answers.w4} onChange={handleChange} style={{marginRight:'10px'}} /> Imiti</label>
                    <label><input type="checkbox" name="w5" checked={answers.w5} onChange={handleChange} style={{marginRight:'10px'}} /> Igiraneza</label>
                    <label><input type="checkbox" name="w6" checked={answers.w6} onChange={handleChange} style={{marginRight:'10px'}} /> Ikibiriti</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>7. Erekana inyuguti u U mu magambo akurikira.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) minmax(150px, 1fr)', gap: '1rem', fontSize: '1.2rem' }}>
                    <label><input type="checkbox" name="wu1" checked={answers.wu1} onChange={handleChange} style={{marginRight:'10px'}} /> Uwase</label>
                    <label><input type="checkbox" name="wu2" checked={answers.wu2} onChange={handleChange} style={{marginRight:'10px'}} /> inkuru</label>
                    <label><input type="checkbox" name="wu3" checked={answers.wu3} onChange={handleChange} style={{marginRight:'10px'}} /> Usanase</label>
                    <label><input type="checkbox" name="wu4" checked={answers.wu4} onChange={handleChange} style={{marginRight:'10px'}} /> Umugani</label>
                    <label><input type="checkbox" name="wu5" checked={answers.wu5} onChange={handleChange} style={{marginRight:'10px'}} /> Igi</label>
                    <label><input type="checkbox" name="wu6" checked={answers.wu6} onChange={handleChange} style={{marginRight:'10px'}} /> amakara</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>8. & 9. Gusoma no kwandika</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="rd1" checked={answers.rd1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nasomye inyajwi zikurikira: u I i U u i</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="wr1" checked={answers.wr1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nanditse inyajwi mu ikayi yanjye</label>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Ohereza Ibisubizo</button>
        </div>
    );
};

const Primary1KinyarwandaUnit2Exam = () => {
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
        s1: false, s2: false, s3: false, // soma amagambo
        // Kirabo
        q1: '', q2: '',
        // Karera
        q3: '', q4: '',
        // Kabera
        q5: '', q6: '',
        w1: false, w2: false // andika nyuguti
    });

    const isCorrectText = (input, expectedStrings) => {
        const cleaned = input.toLowerCase().trim();
        return expectedStrings.some(str => cleaned.includes(str));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnswers({ ...answers, [name]: type === 'checkbox' ? checked : value });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 11; 

        if (answers.s1) correctAnswers++;
        if (answers.s2) correctAnswers++;
        if (answers.s3) correctAnswers++;

        if (isCorrectText(answers.q1, ['ariruka'])) correctAnswers++;
        if (isCorrectText(answers.q2, ['arakaraba ukuboko', 'ukuboko', 'arakaraba'])) correctAnswers++;
        if (isCorrectText(answers.q3, ['akubura', 'akaraba'])) correctAnswers++;
        if (isCorrectText(answers.q4, ['akuba', 'urubobi'])) correctAnswers++;
        if (isCorrectText(answers.q5, ['yego'])) correctAnswers++;
        if (isCorrectText(answers.q6, ['ikiraro', 'arubaka'])) correctAnswers++;

        if (answers.w1) correctAnswers++;
        if (answers.w2) correctAnswers++;

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        if (percent >= 50) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000); }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'phrase-box';
        let isCorrect = false;
        if (name === 'q1') isCorrect = isCorrectText(answers.q1, ['ariruka']);
        if (name === 'q2') isCorrect = isCorrectText(answers.q2, ['arakaraba ukuboko', 'ukuboko', 'arakaraba']);
        if (name === 'q3') isCorrect = isCorrectText(answers.q3, ['akubura', 'akaraba']);
        if (name === 'q4') isCorrect = isCorrectText(answers.q4, ['akuba', 'urubobi']);
        if (name === 'q5') isCorrect = isCorrectText(answers.q5, ['yego']);
        if (name === 'q6') isCorrect = isCorrectText(answers.q6, ['ikiraro', 'arubaka']);
        return \`phrase-box \${isCorrect ? 'correct' : 'incorrect'}\`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Isuzuma risoza umutwe wa kabiri</h1>

            {score !== null && (
                <div className={\`exam-result interactive-card \${score >= 50 ? 'success' : 'fail'}\`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Amanota y'isuzuma: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Ni byiza cyane! Watsinze! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Komeza witoze! usabwa 50% ngo utsinde. 💪</p>}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>1. Soma amagambo akurikira.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="s1" checked={answers.s1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nasomye: urukero, ikiraro, ibara, ikibero, ubukire</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="s2" checked={answers.s2} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nasomye: ikara, uburara, ururo, ukuboko, irerero</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="s3" checked={answers.s3} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nasomye: kubara, uburiri, iriba, ikibabi, abana</label>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>2. Soma udukuru dukurikira maze usubize ibibazo.</h3>
                
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#2ECC71' }}>Kirabo</h4>
                    <p>Kirabo ariruka. Arerekera ku iriba. Kirabo ararora Karori. Karori arakaraba ukuboko.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                        <div>a. Kirabo arakora iki? <input name="q1" value={answers.q1} onChange={handleChange} className={getInputClass('q1')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                        <div>b. Karori arakora iki? <input name="q2" value={answers.q2} onChange={handleChange} className={getInputClass('q2')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    </div>
                </div>

                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#2ECC71' }}>Karera</h4>
                    <p>Karera arara i Rukara. Karera akubura kare. Karara akuba urubobi. Karera akaraba kare.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                        <div>a. Karera akora iki? <input name="q3" value={answers.q3} onChange={handleChange} className={getInputClass('q3')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                        <div>b. Karara akora iki? <input name="q4" value={answers.q4} onChange={handleChange} className={getInputClass('q4')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    </div>
                </div>

                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '10px' }}>
                    <h4 style={{ color: '#2ECC71' }}>Kabera</h4>
                    <p>Kabera aba i Burera. Kabera arorora. Kabera arubaka ikiraro. Ikiraro kiri kure.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                        <div>a. Kabera aba i Burera? <input name="q5" value={answers.q5} onChange={handleChange} className={getInputClass('q5')} style={{ width: '100%', maxWidth: '300px' }} placeholder="Yego/Oya" /></div>
                        <div>b. Kabera arubaka iki? <input name="q6" value={answers.q6} onChange={handleChange} className={getInputClass('q6')} style={{ width: '100%', maxWidth: '300px' }} /></div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3 style={{ color: '#6c63ff' }}>3. & 4. Kwandika</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="w1" checked={answers.w1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nanditse inyuguti nto (i, u, o, a, e, r, k, b) mu ikayi</label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" name="w2" checked={answers.w2} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} /> Nanditse inyuguti nkuru (I, U, O, A, E, R, K, B) mu ikayi</label>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>Ohereza Ibisubizo</button>
        </div>
    );
};
`;

let newContent = content.replace('const Assessment = () => {', exams + '\n\nconst Assessment = () => {');

newContent = newContent.replace('const isPrimary1EnglishUnit10 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 10");',
`const isPrimary1EnglishUnit10 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 10");
    const isPrimary1KinyarwandaUnit1 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("ambere");
    const isPrimary1KinyarwandaUnit2 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("kabiri");`);

newContent = newContent.replace('if (isPrimary1EnglishUnit10) CurrentExam = Primary1EnglishUnit10Exam;',
`if (isPrimary1EnglishUnit10) CurrentExam = Primary1EnglishUnit10Exam;
    if (isPrimary1KinyarwandaUnit1) CurrentExam = Primary1KinyarwandaUnit1Exam;
    if (isPrimary1KinyarwandaUnit2) CurrentExam = Primary1KinyarwandaUnit2Exam;`);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected Kinyarwanda exams Unit 1 and 2');
