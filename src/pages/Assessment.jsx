import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Assessment.css';

const Primary1MathUnit2Exam = () => {
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
        q1_add_1: '', q1_add_2: '',
        q1_sub_1: '', q1_sub_2: '',
        q2_1: '', q2_2: '', q2_3: '', q2_4: '', q2_5: '', q2_6: '', q2_7: '', q2_8: '',
        pz_1: '', pz_2: '', pz_3: '', pz_4: ''
    });

    const correctMap = {
        q1_add_1: '3', q1_add_2: '9',
        q1_sub_1: '3', q1_sub_2: '6',
        q2_1: '<', q2_2: '<', q2_3: '>', q2_4: '<', q2_5: '>', q2_6: '>', q2_7: '<', q2_8: '<',
        pz_1: '3', pz_2: '4', pz_3: '4', pz_4: '9'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 16; 

        Object.keys(correctMap).forEach(key => {
            if (answers[key] === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment</h1>

            {/* Score Result Banner */}
            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed the assessment! <i className="uil uil-award"></i></p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Count balls. Fill in the boxes with the correct numbers</h3>
                <div className="q1-container">
                    <div className="q1-box">
                        <div className="balls-group">
                            <span>⚽⚽⚽</span>
                            <span>⚽⚽⚽</span>
                        </div>
                        <div className="balls-group isolated">
                            <span>⚽</span><span>⚽</span><span>⚽</span>
                        </div>
                        <div className="math-row" style={{ marginTop: '2rem' }}>
                            <span className="big-red">6</span> <span className="sign">+</span> 
                            <input name="q1_add_1" className={getInputClass('q1_add_1')} value={answers.q1_add_1} onChange={handleChange} />
                            <span className="sign">=</span>
                            <input name="q1_add_2" className={getInputClass('q1_add_2')} value={answers.q1_add_2} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="boundary"></div>
                    <div className="q1-box">
                        <div className="balls-group crossed">
                            <span>⚽<div className="slash"></div></span><span>⚽<div className="slash"></div></span><span>⚽<div className="slash"></div></span>
                            <span>⚽</span><span>⚽</span><span>⚽</span>
                            <span>⚽</span><span>⚽</span><span>⚽</span>
                        </div>
                        <div className="math-row" style={{ marginTop: '2rem' }}>
                            <span className="big-red">9</span> <span className="sign">-</span> 
                            <input name="q1_sub_1" className={getInputClass('q1_sub_1')} value={answers.q1_sub_1} onChange={handleChange} />
                            <span className="sign">=</span>
                            <input name="q1_sub_2" className={getInputClass('q1_sub_2')} value={answers.q1_sub_2} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Compare these numbers using the symbol {'<'}, = or {'>'}</h3>
                <div className="q2-grid">
                    <div className="compare-row">
                        <span className="num">4</span> <input name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1', 'compare-box num-box')} maxLength={1} /> <span className="num">6</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">2</span> <input name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2', 'compare-box num-box')} maxLength={1} /> <span className="num">4</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">9</span> <input name="q2_3" value={answers.q2_3} onChange={handleChange} className={getInputClass('q2_3', 'compare-box num-box')} maxLength={1} /> <span className="num">8</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">3</span> <input name="q2_4" value={answers.q2_4} onChange={handleChange} className={getInputClass('q2_4', 'compare-box num-box')} maxLength={1} /> <span className="num">8</span>
                    </div>
                    
                    <div className="compare-row">
                        <span className="num">5</span> <input name="q2_5" value={answers.q2_5} onChange={handleChange} className={getInputClass('q2_5', 'compare-box num-box')} maxLength={1} /> <span className="num">2</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">9</span> <input name="q2_6" value={answers.q2_6} onChange={handleChange} className={getInputClass('q2_6', 'compare-box num-box')} maxLength={1} /> <span className="num">6</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">6</span> <input name="q2_7" value={answers.q2_7} onChange={handleChange} className={getInputClass('q2_7', 'compare-box num-box')} maxLength={1} /> <span className="num">7</span>
                    </div>
                    <div className="compare-row">
                        <span className="num">1</span> <input name="q2_8" value={answers.q2_8} onChange={handleChange} className={getInputClass('q2_8', 'compare-box num-box')} maxLength={1} /> <span className="num">7</span>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Add and subtract in this puzzle</h3>
                <div className="puzzle-grid text-center">
                     <p style={{ color: 'var(--text-secondary)' }}>Fill in the missing numbers to make the equations true.</p>
                     
                     <div className="puzzle-row math-row" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                         <span className="num">1</span> <span className="sign">+</span> <input name="pz_1" className={getInputClass('pz_1', 'num-box small')} value={answers.pz_1} onChange={handleChange} /> <span className="sign">=</span> <input name="pz_2" className={getInputClass('pz_2', 'num-box small')} value={answers.pz_2} onChange={handleChange} />
                     </div>
                     <div className="puzzle-row math-row" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                         <span className="num">6</span> <span className="sign">-</span> <input name="pz_3" className={getInputClass('pz_3', 'num-box small')} value={answers.pz_3} onChange={handleChange} /> <span className="sign">=</span> <span className="num">2</span>
                     </div>
                     <div className="puzzle-row math-row" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                         <span className="num">1</span> <span className="sign">+</span> <span className="num">8</span> <span className="sign">=</span> <input name="pz_4" className={getInputClass('pz_4', 'num-box small')} value={answers.pz_4} onChange={handleChange} />
                     </div>
                     
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
}

const Primary1MathUnit1Exam = () => {
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
        // Section 1
        s1_2_1: '', s1_2_2: '', s1_2_3: '',
        s1_3_1: '', s1_3_2: '', s1_3_3: '',
        s1_4_1: '', s1_4_2: '', s1_4_3: '',
        s1_5_1: '', s1_5_2: '', s1_5_3: '',
        // Section 2
        m_4_m_2: '', m_3_m_1: '', m_5_p_2: '', m_4_p_1: '', m_5_m_3: '', m_5_p_4: '', m_5_p_1: '', m_3_m_2: '', m_4_m_3: '', m_3_p_1: '',
        // Section 3
        lb_1: '', lb_2: '', lb_3: '', lb_4: '', lb_5: '',
        // Section 4
        wp_1: '', wp_2: ''
    });

    const correctMap = {
        s1_2_1: '2', s1_2_2: '2', s1_2_3: '2',
        s1_3_1: '3', s1_3_2: '3', s1_3_3: '3',
        s1_4_1: '4', s1_4_2: '4', s1_4_3: '4',
        s1_5_1: '5', s1_5_2: '5', s1_5_3: '5',
        m_4_m_2: '2', m_3_m_1: '2', m_5_p_2: '7', m_4_p_1: '5', m_5_m_3: '2', m_5_p_4: '9', m_5_p_1: '6', m_3_m_2: '1', m_4_m_3: '1', m_3_p_1: '4',
        lb_1: '1', lb_2: '0', lb_3: '2', lb_4: '2', lb_5: '1',
        wp_1: '4', wp_2: '2'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length; 

        Object.keys(correctMap).forEach(key => {
            if (answers[key] === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 1</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Count and write numbers from 1 to 5.</h3>
                <table className="number-table">
                    <tbody>
                        <tr>
                            <td className="icon-col">☕</td>
                            <td><span className="num">1</span></td><td><span className="num">1</span></td><td><span className="num">1</span></td><td><span className="num">1</span></td>
                        </tr>
                        <tr>
                            <td className="icon-col">🍍🍍</td>
                            <td><span className="num">2</span></td>
                            <td><input name="s1_2_1" value={answers.s1_2_1} onChange={handleChange} className={getInputClass('s1_2_1')} /></td>
                            <td><input name="s1_2_2" value={answers.s1_2_2} onChange={handleChange} className={getInputClass('s1_2_2')} /></td>
                            <td><input name="s1_2_3" value={answers.s1_2_3} onChange={handleChange} className={getInputClass('s1_2_3')} /></td>
                        </tr>
                        <tr>
                            <td className="icon-col">🗝️🗝️🗝️</td>
                            <td><span className="num">3</span></td>
                            <td><input name="s1_3_1" value={answers.s1_3_1} onChange={handleChange} className={getInputClass('s1_3_1')} /></td>
                            <td><input name="s1_3_2" value={answers.s1_3_2} onChange={handleChange} className={getInputClass('s1_3_2')} /></td>
                            <td><input name="s1_3_3" value={answers.s1_3_3} onChange={handleChange} className={getInputClass('s1_3_3')} /></td>
                        </tr>
                        <tr>
                            <td className="icon-col">🥄🥄🥄🥄</td>
                            <td><span className="num">4</span></td>
                            <td><input name="s1_4_1" value={answers.s1_4_1} onChange={handleChange} className={getInputClass('s1_4_1')} /></td>
                            <td><input name="s1_4_2" value={answers.s1_4_2} onChange={handleChange} className={getInputClass('s1_4_2')} /></td>
                            <td><input name="s1_4_3" value={answers.s1_4_3} onChange={handleChange} className={getInputClass('s1_4_3')} /></td>
                        </tr>
                        <tr>
                            <td className="icon-col">⚽⚽⚽⚽⚽</td>
                            <td><span className="num">5</span></td>
                            <td><input name="s1_5_1" value={answers.s1_5_1} onChange={handleChange} className={getInputClass('s1_5_1')} /></td>
                            <td><input name="s1_5_2" value={answers.s1_5_2} onChange={handleChange} className={getInputClass('s1_5_2')} /></td>
                            <td><input name="s1_5_3" value={answers.s1_5_3} onChange={handleChange} className={getInputClass('s1_5_3')} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Add and subtract the following numbers:</h3>
                <div className="mouse-grid">
                    <div className="bubble">4 - 2 = <input name="m_4_m_2" value={answers.m_4_m_2} onChange={handleChange} className={getInputClass('m_4_m_2', 'bubble-box')} /></div>
                    <div className="bubble">3 - 1 = <input name="m_3_m_1" value={answers.m_3_m_1} onChange={handleChange} className={getInputClass('m_3_m_1', 'bubble-box')} /></div>
                    <div className="bubble">5 + 2 = <input name="m_5_p_2" value={answers.m_5_p_2} onChange={handleChange} className={getInputClass('m_5_p_2', 'bubble-box')} /></div>
                    <div className="bubble">4 + 1 = <input name="m_4_p_1" value={answers.m_4_p_1} onChange={handleChange} className={getInputClass('m_4_p_1', 'bubble-box')} /></div>
                    <div className="bubble">3 + 1 = <input name="m_3_p_1" value={answers.m_3_p_1} onChange={handleChange} className={getInputClass('m_3_p_1', 'bubble-box')} /></div>
                    <div className="bubble">5 - 3 = <input name="m_5_m_3" value={answers.m_5_m_3} onChange={handleChange} className={getInputClass('m_5_m_3', 'bubble-box')} /></div>
                    <div className="bubble">5 + 4 = <input name="m_5_p_4" value={answers.m_5_p_4} onChange={handleChange} className={getInputClass('m_5_p_4', 'bubble-box')} /></div>
                    <div className="bubble">3 - 2 = <input name="m_3_m_2" value={answers.m_3_m_2} onChange={handleChange} className={getInputClass('m_3_m_2', 'bubble-box')} /></div>
                    <div className="bubble">4 - 3 = <input name="m_4_m_3" value={answers.m_4_m_3} onChange={handleChange} className={getInputClass('m_4_m_3', 'bubble-box')} /></div>
                    <div className="bubble">5 + 1 = <input name="m_5_p_1" value={answers.m_5_p_1} onChange={handleChange} className={getInputClass('m_5_p_1', 'bubble-box')} /></div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Count and fill in the missing numbers (Ladybirds)</h3>
                <div className="bonds-grid">
                    <div className="bond-box">
                        <p>Total: 4 (Parts: 1 and 3)</p>
                        <p>Total: 1 (Parts: <input name="lb_1" value={answers.lb_1} onChange={handleChange} className={getInputClass('lb_1', 'num-box small')} /> and 0)</p>
                    </div>
                    <div className="bond-box">
                        <p>Total: 1 (Parts: 1 and <input name="lb_2" value={answers.lb_2} onChange={handleChange} className={getInputClass('lb_2', 'num-box small')} />)</p>
                        <p>Total: 2 (Parts: 1 and <input name="lb_3" value={answers.lb_3} onChange={handleChange} className={getInputClass('lb_3', 'num-box small')} />)</p>
                    </div>
                    <div className="bond-box">
                        <p>Total: <input name="lb_4" value={answers.lb_4} onChange={handleChange} className={getInputClass('lb_4', 'num-box small')} /> (Parts: 0 and 2)</p>
                        <p>Total: <input name="lb_5" value={answers.lb_5} onChange={handleChange} className={getInputClass('lb_5', 'num-box small')} /> (Parts: 1 and 0)</p>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Do these word problems</h3>
                <div className="wp-box">
                    <p>🐐 Minani has <span className="big-red">2</span> big goats and <span className="big-red">2</span> small goats.</p>
                    <p>How many goats does Minani have altogether?</p>
                    <input name="wp_1" value={answers.wp_1} onChange={handleChange} className={getInputClass('wp_1')} /> goats.
                </div>
                <div className="wp-box" style={{ marginTop: '1rem' }}>
                    <p>🌳 Fiona has <span className="big-red">3</span> trees in her garden.</p>
                    <p>A goat damages <span className="big-red">1</span> tree and Fiona cuts it off.</p>
                    <p>How many trees does Fiona remain with?</p>
                    <input name="wp_2" value={answers.wp_2} onChange={handleChange} className={getInputClass('wp_2')} /> trees.
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
}

const Primary1MathUnit3Exam = () => {
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
        q1_1: '', q1_2: '', q1_3: '',
        q2_1: '', q2_2: '', q2_3: '', q2_4: '',
        q3_1: '', q3_2: '', q3_3: '', q3_4: '',
        q4_b1: '', q4_b2: '', q4_b3: '',
        q4_m1: '', q4_m2: '', q4_m3: '',
        q4_a1: '', q4_a2: '', q4_a3: '',
        q5_1: '', q5_2: '', q5_3: '', q5_4: '', q5_5: '', q5_6: '', q5_7: ''
    });

    const correctMap = {
        q1_1: '6', q1_2: '4', q1_3: '10',
        q2_1: '1', q2_2: '7', q2_3: '6', q2_4: '11',
        q3_1: '4', q3_2: '2', q3_3: '10', q3_4: '7',
        q4_b1: '5', q4_b2: '4', q4_b3: '3',
        q4_m1: '3', q4_m2: '4', q4_m3: '2',
        q4_a1: '7', q4_a2: '6', q4_a3: '5',
        q5_1: '10', q5_2: '4', q5_3: '2', q5_4: '3', q5_5: '2', q5_6: '5', q5_7: '4'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key] === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 3</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Count. Fill in the box with the correct numbers</h3>
                <div className="q1-container text-center">
                     <div className="balls-group" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                         🐓🐓🐓🐓🐓🐓  &nbsp;&nbsp;+&nbsp;&nbsp;  🐓🐓🐓🐓
                     </div>
                     <div className="math-row" style={{ justifyContent: 'center' }}>
                         <input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1')} />
                         <span className="sign">+</span>
                         <input name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2')} />
                         <span className="sign">=</span>
                         <input name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3')} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Substract:</h3>
                <div className="q2-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span className="num">6</span> <span className="sign">-</span> <span className="num">5</span> <span className="sign">=</span> <input name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span className="num">10</span> <span className="sign">-</span> <span className="num">3</span> <span className="sign">=</span> <input name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span className="num">5</span> <span className="sign">+</span> <span className="num">1</span> <span className="sign">=</span> <input name="q2_3" value={answers.q2_3} onChange={handleChange} className={getInputClass('q2_3', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span className="num">8</span> <span className="sign">+</span> <span className="num">3</span> <span className="sign">=</span> <input name="q2_4" value={answers.q2_4} onChange={handleChange} className={getInputClass('q2_4', 'num-box small')} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Complete with the missing number</h3>
                <div className="q2-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span className="num">6</span> <span className="sign">-</span> <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1', 'num-box small')} /> <span className="sign">=</span> <span className="num">2</span>
                     </div>
                     <div className="math-row">
                         <span className="num">4</span> <span className="sign">+</span> <input name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2', 'num-box small')} /> <span className="sign">=</span> <span className="num">6</span>
                     </div>
                     <div className="math-row">
                         <input name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3', 'num-box small')} /> <span className="sign">-</span> <span className="num">3</span> <span className="sign">=</span> <span className="num">7</span>
                     </div>
                     <div className="math-row">
                         <input name="q3_4" value={answers.q3_4} onChange={handleChange} className={getInputClass('q3_4', 'num-box small')} /> <span className="sign">+</span> <span className="num">3</span> <span className="sign">=</span> <span className="num">10</span>
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Find the number before, between or after</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
                    <div className="before-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>BEFORE</h4>
                        <div className="math-row"><span className="num" style={{ color: 'red' }}>8</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">9</span></div>
                        <div className="math-row"><input name="q4_b1" value={answers.q4_b1} onChange={handleChange} className={getInputClass('q4_b1', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">6</span></div>
                        <div className="math-row"><input name="q4_b2" value={answers.q4_b2} onChange={handleChange} className={getInputClass('q4_b2', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">5</span></div>
                        <div className="math-row"><input name="q4_b3" value={answers.q4_b3} onChange={handleChange} className={getInputClass('q4_b3', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">4</span></div>
                    </div>
                    
                    <div className="between-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>BETWEEN</h4>
                        <div className="math-row"><span className="num">8</span> <span className="num" style={{ color: 'red', margin: '0 10px' }}>9</span> <span className="num">10</span></div>
                        <div className="math-row"><span className="num">2</span> <input name="q4_m1" value={answers.q4_m1} onChange={handleChange} className={getInputClass('q4_m1', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">4</span></div>
                        <div className="math-row"><span className="num">3</span> <input name="q4_m2" value={answers.q4_m2} onChange={handleChange} className={getInputClass('q4_m2', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">5</span></div>
                        <div className="math-row"><span className="num">1</span> <input name="q4_m3" value={answers.q4_m3} onChange={handleChange} className={getInputClass('q4_m3', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">3</span></div>
                    </div>

                    <div className="after-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>AFTER</h4>
                        <div className="math-row"><span className="num">9</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <span className="num" style={{ color: 'red' }}>10</span></div>
                        <div className="math-row"><span className="num">6</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q4_a1" value={answers.q4_a1} onChange={handleChange} className={getInputClass('q4_a1', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">5</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q4_a2" value={answers.q4_a2} onChange={handleChange} className={getInputClass('q4_a2', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">4</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q4_a3" value={answers.q4_a3} onChange={handleChange} className={getInputClass('q4_a3', 'num-box small')} /></div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>5. Follow the rule. Find the missing numbers</h3>
                <div style={{ padding: '1rem', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '2rem' }}>🦋</span> 
                        <span className="num-box small" style={{ borderColor: '#00bf8e' }}>3</span> <span style={{ color: '#00bf8e', fontWeight: "bold" }}>+4 &rarr;</span> 
                        <span className="num-box small" style={{ borderColor: '#00bf8e', color: 'red' }}>7</span> <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-2 &rarr;</span> 
                        <span className="num-box small" style={{ borderColor: '#00bf8e', color: 'red' }}>5</span> <span style={{ color: '#00bf8e', fontWeight: "bold" }}>+5 &rarr;</span> 
                        <input name="q5_1" value={answers.q5_1} onChange={handleChange} className={getInputClass('q5_1', 'num-box small')} /> <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-4 &rarr;</span> 
                        <span className="num-box small" style={{ borderColor: '#00bf8e', color: '#00bf8e' }}>6</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginTop: '1rem', flexDirection: 'row-reverse', whiteSpace: 'nowrap' }}>
                        <span className="num-box small" style={{ borderColor: '#00bf8e', color: '#00bf8e' }}>6</span> 
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>&larr; +3</span> <input name="q5_4" value={answers.q5_4} onChange={handleChange} className={getInputClass('q5_4', 'num-box small')} />
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>&larr; +1</span> <input name="q5_3" value={answers.q5_3} onChange={handleChange} className={getInputClass('q5_3', 'num-box small')} />
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>&larr; -2</span> <input name="q5_2" value={answers.q5_2} onChange={handleChange} className={getInputClass('q5_2', 'num-box small')} />
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>&larr; -2</span>
                        <span style={{ visibility: 'hidden' }} className="num-box small">6</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginTop: '1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ visibility: 'hidden' }} className="num-box small">6</span>
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-3 &rarr;</span> <span className="num-box small" style={{ borderColor: '#00bf8e', color: '#00bf8e' }}>3</span>
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-1 &rarr;</span> <input name="q5_5" value={answers.q5_5} onChange={handleChange} className={getInputClass('q5_5', 'num-box small')} />
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>+8 &rarr;</span> <span className="num-box small" style={{ borderColor: '#00bf8e', color: '#00bf8e' }}>10</span>
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-5 &rarr;</span> <input name="q5_6" value={answers.q5_6} onChange={handleChange} className={getInputClass('q5_6', 'num-box small')} />
                        <span style={{ color: '#00bf8e', fontWeight: "bold" }}>-1 &rarr;</span> <input name="q5_7" value={answers.q5_7} onChange={handleChange} className={getInputClass('q5_7', 'num-box small')} />
                        <span style={{ fontSize: '2rem' }}>🌸</span> 
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
}

const Primary1MathUnit4Exam = () => {
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
        q1_b1: '', q1_b2: '', q1_b3: '', q1_b4: '', q1_b5: '',
        q1_m1: '', q1_m2: '', q1_m3: '', q1_m4: '', q1_m5: '', q1_m6: '',
        q1_a1: '', q1_a2: '', q1_a3: '', q1_a4: '', q1_a5: '', q1_a6: '',
        q2_tom_num: '',
        q2_tri_1: '', q2_tri_2: '', q2_tri_num: '',
        q2_tree_1: '', q2_tree_2: '', q2_tree_num: '',
        q2_star_1: '', q2_star_2: '', q2_star_num: '',
        q3_1: '', q3_2: '', q3_3: '', q3_4: '', q3_5: '',
        q4a_1: '', q4a_2: '', q4a_3: '',
        q4b_1: '', q4b_2: '', q4b_3: '', q4b_4: '', q4b_5: '', q4b_6: '', q4b_7: '', q4b_8: '',
        q5_ans: ''
    });

    const correctMap = {
        q1_b1: '14', q1_b2: '19', q1_b3: '17', q1_b4: '11', q1_b5: '6',
        q1_m1: '15', q1_m2: '6', q1_m3: '14', q1_m4: '9', q1_m5: '17', 
        q1_a1: '20', q1_a2: '14', q1_a3: '5', q1_a4: '18', q1_a5: '12', q1_a6: '16',
        q2_tom_num: '15',
        q2_tri_1: '10', q2_tri_2: '4', q2_tri_num: '14',
        q2_tree_1: '10', q2_tree_2: '1', q2_tree_num: '11',
        q2_star_1: '10', q2_star_2: '6', q2_star_num: '16',
        q3_1: '7', q3_2: '15', q3_3: '20', q3_4: '17', q3_5: '12',
        q4a_1: '8', q4a_2: '9', q4a_3: '4',
        q4b_1: '11', q4b_2: '13', q4b_3: '7', q4b_4: '5', q4b_5: '9', q4b_6: '8', q4b_7: '6', q4b_8: '4',
        q5_ans: '15'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key] === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 4</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Find the number before, between or after</h3>
                <div className="q4-grid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
                    <div className="before-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>BEFORE</h4>
                        <div className="math-row"><span className="num" style={{ color: 'red' }}>8</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">9</span></div>
                        <div className="math-row"><input name="q1_b1" value={answers.q1_b1} onChange={handleChange} className={getInputClass('q1_b1', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">15</span></div>
                        <div className="math-row"><input name="q1_b2" value={answers.q1_b2} onChange={handleChange} className={getInputClass('q1_b2', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">20</span></div>
                        <div className="math-row"><input name="q1_b3" value={answers.q1_b3} onChange={handleChange} className={getInputClass('q1_b3', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">18</span></div>
                        <div className="math-row"><input name="q1_b4" value={answers.q1_b4} onChange={handleChange} className={getInputClass('q1_b4', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">12</span></div>
                        <div className="math-row"><input name="q1_b5" value={answers.q1_b5} onChange={handleChange} className={getInputClass('q1_b5', 'num-box small')} /> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&larr;</span> <span className="num">7</span></div>
                    </div>
                    
                    <div className="between-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>BETWEEN</h4>
                        <div className="math-row"><span className="num">10</span> <span className="num" style={{ color: 'red', margin: '0 10px' }}>11</span> <span className="num">12</span></div>
                        <div className="math-row"><span className="num">14</span> <input name="q1_m1" value={answers.q1_m1} onChange={handleChange} className={getInputClass('q1_m1', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">16</span></div>
                        <div className="math-row"><span className="num">5</span> <input name="q1_m2" value={answers.q1_m2} onChange={handleChange} className={getInputClass('q1_m2', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">7</span></div>
                        <div className="math-row"><span className="num">13</span> <input name="q1_m3" value={answers.q1_m3} onChange={handleChange} className={getInputClass('q1_m3', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">15</span></div>
                        <div className="math-row"><span className="num">8</span> <input name="q1_m4" value={answers.q1_m4} onChange={handleChange} className={getInputClass('q1_m4', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">10</span></div>
                        <div className="math-row"><span className="num">16</span> <input name="q1_m5" value={answers.q1_m5} onChange={handleChange} className={getInputClass('q1_m5', 'num-box small')} style={{ margin: '0 10px' }} /> <span className="num">18</span></div>
                    </div>

                    <div className="after-col">
                        <h4 className="text-center" style={{ color: '#00bf8e' }}>AFTER</h4>
                        <div className="math-row"><span className="num">19</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <span className="num" style={{ color: 'red' }}>20</span></div>
                        <div className="math-row"><span className="num">13</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q1_a1" value={answers.q1_a1} onChange={handleChange} className={getInputClass('q1_a1', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">4</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q1_a2" value={answers.q1_a2} onChange={handleChange} className={getInputClass('q1_a2', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">17</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q1_a3" value={answers.q1_a3} onChange={handleChange} className={getInputClass('q1_a3', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">11</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q1_a4" value={answers.q1_a4} onChange={handleChange} className={getInputClass('q1_a4', 'num-box small')} /></div>
                        <div className="math-row"><span className="num">15</span> <span style={{ color: '#00bf8e', margin: '0 10px' }}>&rarr;</span> <input name="q1_a5" value={answers.q1_a5} onChange={handleChange} className={getInputClass('q1_a5', 'num-box small')} /></div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Look at the pictures. Read the numbers. Write them.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <span style={{ minWidth: '100px' }}>Sticks</span>
                        <div style={{ flex: 1, border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>🖍️x10 &nbsp; 🖍️x2</div>
                        <div className="math-row" style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                            <span className="num" style={{ color: 'red' }}>10</span> <span className="sign">+</span> <span className="num" style={{ color: 'red' }}>2</span>
                        </div>
                        <div style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Number</div>
                            <span className="num">12</span>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <span style={{ minWidth: '100px' }}>Tomatoes</span>
                        <div style={{ flex: 1, border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>🍅x10 &nbsp; 🍅x5</div>
                        <div className="math-row" style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                            <span className="num" style={{ color: 'red' }}>10</span> <span className="sign">+</span> <span className="num" style={{ color: 'red' }}>5</span>
                        </div>
                        <div style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Number</div>
                            <input name="q2_tom_num" value={answers.q2_tom_num} onChange={handleChange} className={getInputClass('q2_tom_num', 'num-box small')} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <span style={{ minWidth: '100px' }}>Triangles</span>
                        <div style={{ flex: 1, border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>🔺x10 &nbsp; 🔺x4</div>
                        <div className="math-row" style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                            <input name="q2_tri_1" value={answers.q2_tri_1} onChange={handleChange} className={getInputClass('q2_tri_1', 'num-box small')} /> <span className="sign">+</span> <input name="q2_tri_2" value={answers.q2_tri_2} onChange={handleChange} className={getInputClass('q2_tri_2', 'num-box small')} />
                        </div>
                        <div style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Number</div>
                            <input name="q2_tri_num" value={answers.q2_tri_num} onChange={handleChange} className={getInputClass('q2_tri_num', 'num-box small')} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <span style={{ minWidth: '100px' }}>Tree tomatoes</span>
                        <div style={{ flex: 1, border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>🍎x10 &nbsp; 🍎x1</div>
                        <div className="math-row" style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                            <input name="q2_tree_1" value={answers.q2_tree_1} onChange={handleChange} className={getInputClass('q2_tree_1', 'num-box small')} /> <span className="sign">+</span> <input name="q2_tree_2" value={answers.q2_tree_2} onChange={handleChange} className={getInputClass('q2_tree_2', 'num-box small')} />
                        </div>
                        <div style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Number</div>
                            <input name="q2_tree_num" value={answers.q2_tree_num} onChange={handleChange} className={getInputClass('q2_tree_num', 'num-box small')} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <span style={{ minWidth: '100px' }}>Stars</span>
                        <div style={{ flex: 1, border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>⭐x10 &nbsp; ⭐x6</div>
                        <div className="math-row" style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                            <input name="q2_star_1" value={answers.q2_star_1} onChange={handleChange} className={getInputClass('q2_star_1', 'num-box small')} /> <span className="sign">+</span> <input name="q2_star_2" value={answers.q2_star_2} onChange={handleChange} className={getInputClass('q2_star_2', 'num-box small')} />
                        </div>
                        <div style={{ border: '2px solid #e2e8f0', padding: '10px', borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Number</div>
                            <input name="q2_star_num" value={answers.q2_star_num} onChange={handleChange} className={getInputClass('q2_star_num', 'num-box small')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Substract or add:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr)', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span>i)</span> <span className="num">15</span> <span className="sign">-</span> <span className="num">8</span> <span className="sign">=</span> <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>ii)</span> <span className="num">20</span> <span className="sign">-</span> <span className="num">5</span> <span className="sign">=</span> <input name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>iii)</span> <span className="num">15</span> <span className="sign">+</span> <span className="num">5</span> <span className="sign">=</span> <input name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>iv)</span> <span className="num">9</span> <span className="sign">+</span> <span className="num">8</span> <span className="sign">=</span> <input name="q3_4" value={answers.q3_4} onChange={handleChange} className={getInputClass('q3_4', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>v)</span> <span className="num">18</span> <span className="sign">-</span> <span className="num">6</span> <span className="sign">=</span> <input name="q3_5" value={answers.q3_5} onChange={handleChange} className={getInputClass('q3_5', 'num-box small')} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Complete with the missing number</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '1rem', maxWidth: '400px', margin: '0 auto', marginBottom: '2rem' }}>
                     <div className="math-row">
                         <span>i)</span> <span className="num">19</span> <span className="sign">-</span> <input name="q4a_1" value={answers.q4a_1} onChange={handleChange} className={getInputClass('q4a_1', 'num-box small')} /> <span className="sign">=</span> <span className="num">11</span>
                     </div>
                     <div className="math-row">
                         <span>ii)</span> <span className="num">7</span> <span className="sign">+</span> <input name="q4a_2" value={answers.q4a_2} onChange={handleChange} className={getInputClass('q4a_2', 'num-box small')} /> <span className="sign">=</span> <span className="num">16</span>
                     </div>
                     <div className="math-row">
                         <span>iii)</span> <span className="num">9</span> <span className="sign">+</span> <input name="q4a_3" value={answers.q4a_3} onChange={handleChange} className={getInputClass('q4a_3', 'num-box small')} /> <span className="sign">=</span> <span className="num">13</span>
                     </div>
                </div>

                <h3>Find the missing numbers to make 20</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ border: '2px solid #fad390', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="math-row"><span className="num">9</span> <span className="sign">+</span> <input name="q4b_1" value={answers.q4b_1} onChange={handleChange} className={getInputClass('q4b_1', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">7</span> <span className="sign">+</span> <input name="q4b_2" value={answers.q4b_2} onChange={handleChange} className={getInputClass('q4b_2', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">13</span> <span className="sign">+</span> <input name="q4b_3" value={answers.q4b_3} onChange={handleChange} className={getInputClass('q4b_3', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">15</span> <span className="sign">+</span> <input name="q4b_4" value={answers.q4b_4} onChange={handleChange} className={getInputClass('q4b_4', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                    </div>
                    <div style={{ border: '2px solid #fad390', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="math-row"><span className="num">11</span> <span className="sign">+</span> <input name="q4b_5" value={answers.q4b_5} onChange={handleChange} className={getInputClass('q4b_5', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">12</span> <span className="sign">+</span> <input name="q4b_6" value={answers.q4b_6} onChange={handleChange} className={getInputClass('q4b_6', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">14</span> <span className="sign">+</span> <input name="q4b_7" value={answers.q4b_7} onChange={handleChange} className={getInputClass('q4b_7', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                        <div className="math-row"><span className="num">16</span> <span className="sign">+</span> <input name="q4b_8" value={answers.q4b_8} onChange={handleChange} className={getInputClass('q4b_8', 'num-box small')} /> <span className="sign">=</span> <span className="num">20</span></div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>5. Do these word problems</h3>
                <div style={{ border: '2px solid #78e08f', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <div style={{ padding: '1rem', borderRight: '2px solid #78e08f' }}>
                            <h4 style={{ margin: '0 0 1rem 0' }}>Kamana brings 7 goats,</h4>
                            <div style={{ fontSize: '2rem' }}>🐐🐐🐐<br/>🐐🐐🐐<br/>🐐</div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h4 style={{ margin: '0 0 1rem 0' }}>Kabatesi brings 8 goats,</h4>
                            <div style={{ fontSize: '2rem' }}>🐐🐐🐐🐐<br/>🐐🐐🐐🐐</div>
                        </div>
                    </div>
                    <div style={{ padding: '1rem', borderTop: '2px solid #78e08f', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                        <h4 style={{ margin: '0 0 1rem 0' }}>How many goats do Kamana and Kabatesi have in total?</h4>
                        <div className="math-row" style={{ justifyContent: 'center' }}>
                            <input name="q5_ans" value={answers.q5_ans} onChange={handleChange} className={getInputClass('q5_ans', 'num-box')} /> <span style={{ marginLeft: '10px' }}>goats</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
}

const Primary1MathUnit5Exam = () => {
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
        q1_a: '', q1_b: '', q1_c: '', q1_d: '',
        q2_i: '', q2_ii: ''
    });

    const correctMap = {
        q1_a: '6', q1_b: '16', q1_c: '5', q1_d: '9',
        q2_i: '18', q2_ii: '8'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key] === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 5</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. work out:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px', margin: '0 auto', fontSize: '1.5rem' }}>
                     <div className="math-row" style={{ justifyContent: 'center' }}>
                         <span style={{ marginRight: '1rem' }}>a)</span> <span className="num">2</span> <span className="sign">x</span> <span className="num">3</span> <span className="sign">=</span> <input name="q1_a" value={answers.q1_a} onChange={handleChange} className={getInputClass('q1_a', 'num-box')} />
                     </div>
                     <div className="math-row" style={{ justifyContent: 'center' }}>
                         <span style={{ marginRight: '1rem' }}>b)</span> <span className="num">2</span> <span className="sign">x</span> <span className="num">8</span> <span className="sign">=</span> <input name="q1_b" value={answers.q1_b} onChange={handleChange} className={getInputClass('q1_b', 'num-box')} />
                     </div>
                     <div className="math-row" style={{ justifyContent: 'center' }}>
                         <span style={{ marginRight: '1rem' }}>c)</span> <span className="num">10</span> <span className="sign">&divide;</span> <span className="num">2</span> <span className="sign">=</span> <input name="q1_c" value={answers.q1_c} onChange={handleChange} className={getInputClass('q1_c', 'num-box')} />
                     </div>
                     <div className="math-row" style={{ justifyContent: 'center' }}>
                         <span style={{ marginRight: '1rem' }}>d)</span> <span className="num">18</span> <span className="sign">&divide;</span> <span className="num">2</span> <span className="sign">=</span> <input name="q1_d" value={answers.q1_d} onChange={handleChange} className={getInputClass('q1_d', 'num-box')} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Do these</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                    
                    <div style={{ border: '2px solid #78e08f', borderRadius: '8px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>i) Nine children plant trees.</h4>
                            <h4 style={{ margin: '0 0 1rem 0' }}>Every child plants 2 trees.</h4>
                            <p style={{ fontWeight: 'bold' }}>How many trees do they plant altogether?</p>
                            <div className="math-row">
                                <input name="q2_i" value={answers.q2_i} onChange={handleChange} className={getInputClass('q2_i', 'num-box')} /> <span style={{ marginLeft: '10px' }}>trees</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '2rem', flex: 1, minWidth: '200px', textAlign: 'center' }}>
                            🌳🌳🌳🌳🌳🌳🌳🌳🌳
                        </div>
                    </div>

                    <div style={{ border: '2px solid #f6b93b', borderRadius: '8px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>ii) Mico has 16 oranges.</h4>
                            <h4 style={{ margin: '0 0 1rem 0' }}>He shares them equally among 2 children.</h4>
                            <p style={{ fontWeight: 'bold' }}>How many oranges does each child get?</p>
                            <div className="math-row">
                                <input name="q2_ii" value={answers.q2_ii} onChange={handleChange} className={getInputClass('q2_ii', 'num-box')} /> <span style={{ marginLeft: '10px' }}>oranges</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '2rem', flex: 1, minWidth: '200px', textAlign: 'center' }}>
                            🍊🍊🍊🍊🍊🍊🍊🍊<br/>🍊🍊🍊🍊🍊🍊🍊🍊
                        </div>
                    </div>

                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
}


const Primary1MathUnit6Exam = () => {
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
        q1_a1: '', q1_a2: '', q1_a3: '',
        q1_b1: '', q1_b2: '', q1_b3: '',
        q1_c1: '', q1_c2: '', q1_c3: '',
        q1_d1: '', q1_d2: '', q1_d3: '',
        q1_e1: '', q1_e2: '', q1_e3: '',
        q2_i: '', q2_ii: '', q2_iii: '', q2_iv: '', q2_v: '', q2_vi: '',
        q3_1: '', q3_2: '', q3_3: '',
        q4_r2_1: '', q4_r2_ex1: '', q4_r2_ex2: '', q4_r2_ex3: '',
        q4_r3_n: '', q4_r3_1: '', q4_r3_2: '', q4_r3_ex1: '', q4_r3_ex2: '', q4_r3_ex3: '',
        q4_r4_n: '', q4_r4_1: '', q4_r4_2: '', q4_r4_ex1: '', q4_r4_ex2: '', q4_r4_ex3: '',
        q4_r5_n: '', q4_r5_1: '', q4_r5_2: '', q4_r5_ex1: '', q4_r5_ex2: '', q4_r5_ex3: '',
        q4_r6_1: '', q4_r6_ex1: '', q4_r6_ex2: '',
        q4_r7_1: '', q4_r7_2: '', q4_r7_ex1: '', q4_r7_ex2: '', q4_r7_ex3: '',
        q5_1t: '', q5_1o: '', q5_2t: '', q5_2o: '', q5_3t: '', q5_3o: '', q5_4t: '', q5_4o: '',
        q5_5t: '', q5_5o: '', q5_6t: '', q5_6o: '', q5_7t: '', q5_7o: '', q5_8t: '', q5_8o: '',
        q6_ans: ''
    });

    const correctMap = {
        q1_a1: '26', q1_a2: '2', q1_a3: '6',
        q1_b1: '27', q1_b2: '2', q1_b3: '7',
        q1_c1: '28', q1_c2: '2', q1_c3: '8',
        q1_d1: '29', q1_d2: '2', q1_d3: '9',
        q1_e1: '30', q1_e2: '3', q1_e3: '0',
        q2_i: '39', q2_ii: '10', q2_iii: '45', q2_iv: '16', q2_v: '13', q2_vi: '50',
        q3_1: 'correct', q3_2: 'correct', q3_3: 'incorrect',
        q4_r2_1: '1', q4_r2_ex1: '10', q4_r2_ex2: '8', q4_r2_ex3: '18',
        q4_r3_n: '23', q4_r3_1: '2', q4_r3_2: '3', q4_r3_ex1: '20', q4_r3_ex2: '3', q4_r3_ex3: '23',
        q4_r4_n: '34', q4_r4_1: '3', q4_r4_2: '4', q4_r4_ex1: '30', q4_r4_ex2: '4', q4_r4_ex3: '34',
        q4_r5_n: '45', q4_r5_1: '4', q4_r5_2: '5', q4_r5_ex1: '40', q4_r5_ex2: '5', q4_r5_ex3: '45',
        q4_r6_1: '4', q4_r6_ex1: '6', q4_r6_ex2: '46',
        q4_r7_1: '5', q4_r7_2: '6', q4_r7_ex1: '50', q4_r7_ex2: '6', q4_r7_ex3: '56',
        q5_1t: '2', q5_1o: '4', q5_2t: '3', q5_2o: '6', q5_3t: '2', q5_3o: '6', q5_4t: '4', q5_4o: '5',
        q5_5t: '4', q5_5o: '8', q5_6t: '4', q5_6o: '1', q5_7t: '3', q5_7o: '2', q5_8t: '1', q5_8o: '5',
        q6_ans: '34'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name]?.toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key]?.toLowerCase() === correctMap[key]?.toLowerCase()) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const renderBundles = (bundleCount, singleCount) => (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', justifyContent: 'center' }}>
            {Array.from({ length: bundleCount }).map((_, i) => (
                <div key={`b${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '2px', backgroundColor: '#dca060', padding: '4px', borderRadius: '4px', border: '1px solid #c88a4a' }}>
                    {Array.from({ length: 10 }).map((_, j) => <div key={`s${j}`} style={{ width: '4px', height: '20px', backgroundColor: '#e2b77a', borderRadius: '2px' }}></div>)}
                </div>
            ))}
            <div style={{ display: 'flex', gap: '4px', marginLeft: '10px' }}>
                {Array.from({ length: singleCount }).map((_, i) => (
                    <div key={`s_${i}`} style={{ width: '4px', height: '20px', backgroundColor: '#e2b77a', borderRadius: '2px', alignSelf: 'flex-end' }}></div>
                ))}
            </div>
        </div>
    );
    
    // For Place values (Squares instead of sticks)
    const renderTensBlocks = (tens, ones) => (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {Array.from({ length: tens }).map((_, i) => (
                <div key={`tb${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {Array.from({ length: 10 }).map((_, j) => <div key={`tbs${j}`} style={{ width: '12px', height: '12px', backgroundColor: '#3498db', border: '1px solid rgba(0,0,0,0.1)' }}></div>)}
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginLeft: '10px' }}>
                {Array.from({ length: ones }).map((_, i) => (
                    <div key={`obs${i}`} style={{ width: '12px', height: '12px', backgroundColor: '#e74c3c', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                ))}
            </div>
        </div>
    );

    const renderRowTensBlocksHorizontal = (tens, ones) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {Array.from({ length: tens }).map((_, i) => (
                    <div key={`tbh${i}`} style={{ display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 10 }).map((_, j) => <div key={`tbs${j}`} style={{ width: '15px', height: '15px', backgroundColor: '#00a8ff', border: '1px solid #0097e6' }}></div>)}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '40px' }}>
                {Array.from({ length: ones }).map((_, i) => (
                    <div key={`obs${i}`} style={{ width: '15px', height: '15px', backgroundColor: '#e84118', border: '1px solid #c23616' }}></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 6</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Count the bundles of sticks and the single sticks.</h3>
                <p>Write the number. Say how many tens and ones.</p>
                <div style={{ border: '2px solid #ff4757', borderRadius: '8px', overflow: 'hidden' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr', borderBottom: '2px solid #ff4757' }}>
                        <div style={{ padding: '15px', borderRight: '2px solid #ff4757', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {renderBundles(2, 6)}
                            <div className="math-row">
                                <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>20</span> <span className="sign" style={{color: '#ff4757'}}>+</span> <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>6</span> <span className="sign" style={{color: '#ff4757'}}>=</span>
                                <input name="q1_a1" value={answers.q1_a1} onChange={handleChange} className={getInputClass('q1_a1', 'num-box rounded-circle border-info')} style={{ width: '50px', height: '50px', borderRadius: '50%', borderColor: '#1e90ff' }} />
                            </div>
                        </div>
                        <div style={{ padding: '15px', color: '#ff4757', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', justifyContent: 'space-around' }}>
                            <span style={{ fontSize: '1.2rem' }}>Tens &nbsp; ones</span>
                            <div className="math-row" style={{ gap: '15px' }}>
                                <input name="q1_a2" value={answers.q1_a2} onChange={handleChange} className={getInputClass('q1_a2', 'num-box small')} style={{borderColor: '#ff4757'}} />
                                <input name="q1_a3" value={answers.q1_a3} onChange={handleChange} className={getInputClass('q1_a3', 'num-box small')} style={{borderColor: '#ff4757'}} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr', borderBottom: '2px solid #ff4757' }}>
                        <div style={{ padding: '15px', borderRight: '2px solid #ff4757', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {renderBundles(2, 7)}
                            <div className="math-row">
                                <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>20</span> <span className="sign" style={{color: '#ff4757'}}>+</span> <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>7</span> <span className="sign" style={{color: '#ff4757'}}>=</span>
                                <input name="q1_b1" value={answers.q1_b1} onChange={handleChange} className={getInputClass('q1_b1', 'num-box rounded-circle border-info')} style={{ width: '50px', height: '50px', borderRadius: '50%', borderColor: '#1e90ff' }} />
                            </div>
                        </div>
                        <div style={{ padding: '15px', color: '#ff4757', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', justifyContent: 'space-around' }}>
                            <span style={{ fontSize: '1.2rem' }}>Tens &nbsp; ones</span>
                            <div className="math-row" style={{ gap: '15px' }}>
                                <input name="q1_b2" value={answers.q1_b2} onChange={handleChange} className={getInputClass('q1_b2', 'num-box small')} style={{borderColor: '#ff4757'}} />
                                <input name="q1_b3" value={answers.q1_b3} onChange={handleChange} className={getInputClass('q1_b3', 'num-box small')} style={{borderColor: '#ff4757'}} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr', borderBottom: '2px solid #ff4757' }}>
                        <div style={{ padding: '15px', borderRight: '2px solid #ff4757', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {renderBundles(2, 8)}
                            <div className="math-row">
                                <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>20</span> <span className="sign" style={{color: '#ff4757'}}>+</span> <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>8</span> <span className="sign" style={{color: '#ff4757'}}>=</span>
                                <input name="q1_c1" value={answers.q1_c1} onChange={handleChange} className={getInputClass('q1_c1', 'num-box rounded-circle border-info')} style={{ width: '50px', height: '50px', borderRadius: '50%', borderColor: '#1e90ff' }} />
                            </div>
                        </div>
                        <div style={{ padding: '15px', color: '#ff4757', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', justifyContent: 'space-around' }}>
                            <span style={{ fontSize: '1.2rem' }}>Tens &nbsp; ones</span>
                            <div className="math-row" style={{ gap: '15px' }}>
                                <input name="q1_c2" value={answers.q1_c2} onChange={handleChange} className={getInputClass('q1_c2', 'num-box small')} style={{borderColor: '#ff4757'}} />
                                <input name="q1_c3" value={answers.q1_c3} onChange={handleChange} className={getInputClass('q1_c3', 'num-box small')} style={{borderColor: '#ff4757'}} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr', borderBottom: '2px solid #ff4757' }}>
                        <div style={{ padding: '15px', borderRight: '2px solid #ff4757', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {renderBundles(2, 9)}
                            <div className="math-row">
                                <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>20</span> <span className="sign" style={{color: '#ff4757'}}>+</span> <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>9</span> <span className="sign" style={{color: '#ff4757'}}>=</span>
                                <input name="q1_d1" value={answers.q1_d1} onChange={handleChange} className={getInputClass('q1_d1', 'num-box rounded-circle border-info')} style={{ width: '50px', height: '50px', borderRadius: '50%', borderColor: '#1e90ff' }} />
                            </div>
                        </div>
                        <div style={{ padding: '15px', color: '#ff4757', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', justifyContent: 'space-around' }}>
                            <span style={{ fontSize: '1.2rem' }}>Tens &nbsp; ones</span>
                            <div className="math-row" style={{ gap: '15px' }}>
                                <input name="q1_d2" value={answers.q1_d2} onChange={handleChange} className={getInputClass('q1_d2', 'num-box small')} style={{borderColor: '#ff4757'}} />
                                <input name="q1_d3" value={answers.q1_d3} onChange={handleChange} className={getInputClass('q1_d3', 'num-box small')} style={{borderColor: '#ff4757'}} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr' }}>
                        <div style={{ padding: '15px', borderRight: '2px solid #ff4757', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {renderBundles(2, 0)}
                                {renderBundles(1, 0).props.children[0]} 
                            </div>
                            <div className="math-row">
                                <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>20</span> <span className="sign" style={{color: '#ff4757'}}>+</span> <span className="num-box small" style={{borderColor: '#ff4757', color: '#ff4757'}}>10</span> <span className="sign" style={{color: '#ff4757'}}>=</span>
                                <input name="q1_e1" value={answers.q1_e1} onChange={handleChange} className={getInputClass('q1_e1', 'num-box rounded-circle border-info')} style={{ width: '50px', height: '50px', borderRadius: '50%', borderColor: '#1e90ff' }} />
                            </div>
                        </div>
                        <div style={{ padding: '15px', color: '#ff4757', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', justifyContent: 'space-around' }}>
                            <span style={{ fontSize: '1.2rem' }}>Tens &nbsp; ones</span>
                            <div className="math-row" style={{ gap: '15px' }}>
                                <input name="q1_e2" value={answers.q1_e2} onChange={handleChange} className={getInputClass('q1_e2', 'num-box small')} style={{borderColor: '#ff4757'}} />
                                <input name="q1_e3" value={answers.q1_e3} onChange={handleChange} className={getInputClass('q1_e3', 'num-box small')} style={{borderColor: '#ff4757'}} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Find the missing number.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span>i)</span> <span className="num">22</span> <span className="sign">+</span> <span className="num">17</span> <span className="sign">=</span> <input name="q2_i" value={answers.q2_i} onChange={handleChange} className={getInputClass('q2_i', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>iv)</span> <span className="num">37</span> <span className="sign">-</span> <span className="num">21</span> <span className="sign">=</span> <input name="q2_iv" value={answers.q2_iv} onChange={handleChange} className={getInputClass('q2_iv', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>ii)</span> <input name="q2_ii" value={answers.q2_ii} onChange={handleChange} className={getInputClass('q2_ii', 'num-box small')} /> <span className="sign">+</span> <span className="num">20</span> <span className="sign">=</span> <span className="num">30</span>
                     </div>
                     <div className="math-row">
                         <span>v)</span> <span className="num">45</span> <span className="sign">-</span> <input name="q2_v" value={answers.q2_v} onChange={handleChange} className={getInputClass('q2_v', 'num-box small')} /> <span className="sign">=</span> <span className="num">32</span>
                     </div>
                     <div className="math-row">
                         <span>iii)</span> <span className="num">23</span> <span className="sign">+</span> <input name="q2_iii" value={answers.q2_iii} onChange={handleChange} className={getInputClass('q2_iii', 'num-box small')} /> <span className="sign">=</span> <span className="num">68</span>
                     </div>
                     <div className="math-row">
                         <span>vi)</span> <input name="q2_vi" value={answers.q2_vi} onChange={handleChange} className={getInputClass('q2_vi', 'num-box small')} /> <span className="sign">-</span> <span className="num">28</span> <span className="sign">=</span> <span className="num">22</span>
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Use the table of place values. Verify if the comparison of numbers is correct.</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                     <div className="math-row" style={{ justifyContent: 'space-between' }}>
                         <span style={{ fontSize: '1.2rem' }}>i) 36 &gt; 28</span> 
                         <select name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1', 'num-box')} style={{ width: '120px' }}>
                             <option value="">Select</option>
                             <option value="correct">correct</option>
                             <option value="incorrect">incorrect</option>
                         </select>
                     </div>
                     <div className="math-row" style={{ justifyContent: 'space-between' }}>
                         <span style={{ fontSize: '1.2rem' }}>ii) 45 = 45</span> 
                         <select name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2', 'num-box')} style={{ width: '120px' }}>
                             <option value="">Select</option>
                             <option value="correct">correct</option>
                             <option value="incorrect">incorrect</option>
                         </select>
                     </div>
                     <div className="math-row" style={{ justifyContent: 'space-between' }}>
                         <span style={{ fontSize: '1.2rem' }}>iii) 27 &lt; 29</span> 
                         <select name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3', 'num-box')} style={{ width: '120px' }}>
                             <option value="">Select</option>
                             <option value="correct">correct</option>
                             <option value="incorrect">incorrect</option>
                         </select>
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card" style={{ overflowX: 'auto' }}>
                <h3>4. Fill in the table below:</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '1.1rem' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#81ecec', border: '1px solid #63cdd7', padding: '10px' }}>Number</th>
                            <th style={{ backgroundColor: '#81ecec', border: '1px solid #63cdd7', padding: '10px' }}>Words</th>
                            <th style={{ backgroundColor: '#81ecec', border: '1px solid #63cdd7', padding: '10px' }}>Picture</th>
                            <th style={{ backgroundColor: '#81ecec', border: '1px solid #63cdd7', padding: '10px' }}>Expanded Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center', fontSize: '1.8rem' }}>12</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px', marginBottom: '5px' }}>1</div> tens <br/>
                                <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px', borderBottom: '2px solid black' }}>2</div> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}>{renderRowTensBlocksHorizontal(1, 2)}</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px' }}>10</div> <span className="sign">+</span> <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px' }}>2</div> <span className="sign">=</span> <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px' }}>12</div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center', fontSize: '1.8rem' }}>18</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r2_1" value={answers.q4_r2_1} onChange={handleChange} className={getInputClass('q4_r2_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px', borderBottom: '2px solid black' }}>8</div> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}></td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r2_ex1" value={answers.q4_r2_ex1} onChange={handleChange} className={getInputClass('q4_r2_ex1', 'num-box small')} /> <span className="sign">+</span> <input name="q4_r2_ex2" value={answers.q4_r2_ex2} onChange={handleChange} className={getInputClass('q4_r2_ex2', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r2_ex3" value={answers.q4_r2_ex3} onChange={handleChange} className={getInputClass('q4_r2_ex3', 'num-box small')} />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r3_n" value={answers.q4_r3_n} onChange={handleChange} className={getInputClass('q4_r3_n', 'num-box')} />
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r3_1" value={answers.q4_r3_1} onChange={handleChange} className={getInputClass('q4_r3_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <input name="q4_r3_2" value={answers.q4_r3_2} onChange={handleChange} className={getInputClass('q4_r3_2')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}>{renderRowTensBlocksHorizontal(2, 3)}</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r3_ex1" value={answers.q4_r3_ex1} onChange={handleChange} className={getInputClass('q4_r3_ex1', 'num-box small')} /> <span className="sign">+</span> <input name="q4_r3_ex2" value={answers.q4_r3_ex2} onChange={handleChange} className={getInputClass('q4_r3_ex2', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r3_ex3" value={answers.q4_r3_ex3} onChange={handleChange} className={getInputClass('q4_r3_ex3', 'num-box small')} />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r4_n" value={answers.q4_r4_n} onChange={handleChange} className={getInputClass('q4_r4_n', 'num-box')} />
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r4_1" value={answers.q4_r4_1} onChange={handleChange} className={getInputClass('q4_r4_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <input name="q4_r4_2" value={answers.q4_r4_2} onChange={handleChange} className={getInputClass('q4_r4_2')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}>{renderRowTensBlocksHorizontal(3, 4)}</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r4_ex1" value={answers.q4_r4_ex1} onChange={handleChange} className={getInputClass('q4_r4_ex1', 'num-box small')} /> <span className="sign">+</span> <input name="q4_r4_ex2" value={answers.q4_r4_ex2} onChange={handleChange} className={getInputClass('q4_r4_ex2', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r4_ex3" value={answers.q4_r4_ex3} onChange={handleChange} className={getInputClass('q4_r4_ex3', 'num-box small')} />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r5_n" value={answers.q4_r5_n} onChange={handleChange} className={getInputClass('q4_r5_n', 'num-box')} />
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r5_1" value={answers.q4_r5_1} onChange={handleChange} className={getInputClass('q4_r5_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <input name="q4_r5_2" value={answers.q4_r5_2} onChange={handleChange} className={getInputClass('q4_r5_2')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}>{renderRowTensBlocksHorizontal(4, 5)}</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r5_ex1" value={answers.q4_r5_ex1} onChange={handleChange} className={getInputClass('q4_r5_ex1', 'num-box small')} /> <span className="sign">+</span> <input name="q4_r5_ex2" value={answers.q4_r5_ex2} onChange={handleChange} className={getInputClass('q4_r5_ex2', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r5_ex3" value={answers.q4_r5_ex3} onChange={handleChange} className={getInputClass('q4_r5_ex3', 'num-box small')} />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r6_ex2" value={answers.q4_r6_ex2} onChange={handleChange} className={getInputClass('q4_r6_ex2', 'num-box')} />
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r6_1" value={answers.q4_r6_1} onChange={handleChange} className={getInputClass('q4_r6_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <div style={{ border: '1px solid #bdc3c7', display: 'inline-block', padding: '2px 8px', borderBottom: '2px solid black' }}>6</div> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}></td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                40 <span className="sign">+</span> <input name="q4_r6_ex1" value={answers.q4_r6_ex1} onChange={handleChange} className={getInputClass('q4_r6_ex1', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r6_ex2" value={answers.q4_r6_ex2} onChange={handleChange} className={getInputClass('q4_r6_ex2', 'num-box small')} />  
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center', fontSize: '1.8rem' }}>56</td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r7_1" value={answers.q4_r7_1} onChange={handleChange} className={getInputClass('q4_r7_1')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> tens <br/>
                                <input name="q4_r7_2" value={answers.q4_r7_2} onChange={handleChange} className={getInputClass('q4_r7_2')} style={{ width: '30px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #555' }} /> ones
                            </td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px' }}></td>
                            <td style={{ border: '1px solid #dcdde1', padding: '10px', textAlign: 'center' }}>
                                <input name="q4_r7_ex1" value={answers.q4_r7_ex1} onChange={handleChange} className={getInputClass('q4_r7_ex1', 'num-box small')} /> <span className="sign">+</span> <input name="q4_r7_ex2" value={answers.q4_r7_ex2} onChange={handleChange} className={getInputClass('q4_r7_ex2', 'num-box small')} /> <span className="sign">=</span> <input name="q4_r7_ex3" value={answers.q4_r7_ex3} onChange={handleChange} className={getInputClass('q4_r7_ex3', 'num-box small')} />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="exam-section interactive-card">
                <h3>5. Count and write tens and ones</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', border: '2px solid #2f3542', borderBottom: 'none', borderRight: 'none' }}>
                    
                    {[
                        { q: 'q5_1', t: 2, o: 4, num: 1 },
                        { q: 'q5_2', t: 3, o: 6, num: 5 },
                        { q: 'q5_3', t: 2, o: 6, num: 2 },
                        { q: 'q5_4', t: 4, o: 1, num: 6 },
                        { q: 'q5_5', t: 2, o: 6, num: 3 },
                        { q: 'q5_6', t: 3, o: 2, num: 7 },
                        { q: 'q5_7', t: 4, o: 5, num: 4 },
                        { q: 'q5_8', t: 1, o: 5, num: 8 }
                    ].map((item, idx) => (
                        <div key={idx} style={{ borderBottom: '2px solid #2f3542', borderRight: '2px solid #2f3542', display: 'flex', position: 'relative' }}>
                            <div style={{ padding: '10px', flex: 1, display: 'flex', gap: '10px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.num}.</span>
                                {renderTensBlocks(item.t, item.o)}
                            </div>
                            <div style={{ borderLeft: '2px solid #2f3542', backgroundColor: '#f1f2f6', width: '100px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', borderBottom: '2px solid #2f3542' }}>
                                    <div style={{ flex: 1, borderRight: '2px solid #2f3542', textAlign: 'center', fontSize: '0.8rem', padding: '2px 0' }}>tens</div>
                                    <div style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', padding: '2px 0' }}>ones</div>
                                </div>
                                <div style={{ display: 'flex', flex: 1 }}>
                                    <div style={{ flex: 1, borderRight: '2px solid #2f3542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <input name={`${item.q}t`} value={answers[`${item.q}t`]} onChange={handleChange} className={getInputClass(`${item.q}t`, 'num-box small')} style={{border: 'none', borderBottom: '1px solid #555', backgroundColor: 'transparent'}} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <input name={`${item.q}o`} value={answers[`${item.q}o`]} onChange={handleChange} className={getInputClass(`${item.q}o`, 'num-box small')} style={{border: 'none', borderBottom: '1px solid #555', backgroundColor: 'transparent'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>6. Do these</h3>
                <div style={{ border: '2px solid #f3a683', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>Mary buys 50 notebooks</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.5rem' }}>
                                {Array.from({ length: 50 }).map((_, i) => <i key={i} className="uil uil-book-alt" style={{ fontSize: '1.2rem', color: '#574b90' }}></i>)}
                            </div>
                            <h4 style={{ margin: '0', fontSize: '1.2rem' }}>How many notebooks does</h4>
                            <h4 style={{ margin: '0', fontSize: '1.2rem' }}>Mary remain with?</h4>
                            <div className="math-row" style={{ marginTop: '1rem' }}>
                                <input name="q6_ans" value={answers.q6_ans} onChange={handleChange} className={getInputClass('q6_ans')} />
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: '250px', border: '2px solid #2ed573', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.5rem' }}>
                                {Array.from({ length: 16 }).map((_, i) => <i key={i} className="uil uil-book-alt" style={{ fontSize: '1.2rem', color: '#574b90' }}></i>)}
                            </div>
                            <h4 style={{ margin: '0', fontSize: '1.2rem' }}>Mary gives 16 notebooks</h4>
                            <h4 style={{ margin: '0', fontSize: '1.2rem' }}>to Anitha.</h4>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit7Exam = () => {
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
        q1_1: '', q1_2: '', q1_3: '', q1_4: '', q1_5: '',
        q2_1: '', q2_2: '',
        q3_1: '', q3_2: '', q3_3: '', q3_4: '',
        q4_1t: '', q4_1o: '', q4_2: '',
        q5_1: '', q5_2: '', q5_3: '',
        q6_1: '', q6_2: '', q6_3: '', q6_4: '', q6_5: '', q6_6: '', q6_7: '', q6_8: '', q6_9: '',
        q7_1: '', q7_2: '', q7_3: '', q7_4: '', q7_5: '', q7_6: '', q7_7: '',
        q8_1: '', q8_2: ''
    });

    const correctMap = {
        q1_1: '55', q1_2: '36', q1_3: '46', q1_4: '23', q1_5: '59',
        q2_1: '>', q2_2: '=',
        q3_1: '35', q3_2: '51', q3_3: '57', q3_4: '60',
        q4_1t: '7', q4_1o: '6', q4_2: '53',
        q5_1: '42', q5_2: '84', q5_3: '26',
        q6_1: '17', q6_2: '24', q6_3: '34', q6_4: '43', q6_5: '45', q6_6: '53', q6_7: '66', q6_8: '71', q6_9: '99',
        q7_1: '99', q7_2: '70', q7_3: '38', q7_4: '28', q7_5: '11', q7_6: '5', q7_7: '0',
        q8_1: '68', q8_2: '33'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name]?.toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key]?.toLowerCase() === correctMap[key]?.toLowerCase()) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const renderAbacus = (tens, ones) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', borderBottom: '2px solid #2f3542', paddingBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>T</span>
                <span style={{ fontWeight: 'bold' }}>O</span>
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', height: '100px', position: 'relative' }}>
                <div style={{ width: '2px', backgroundColor: '#2f3542', height: '100%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
                    {Array.from({ length: tens }).map((_, i) => (
                        <div key={`t${i}`} style={{ width: '16px', height: '16px', backgroundColor: '#0984e3', borderRadius: '50%', border: '1px solid #74b9ff', margin: '-1px 0' }}></div>
                    ))}
                </div>
                <div style={{ width: '2px', backgroundColor: '#2f3542', height: '100%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
                    {Array.from({ length: ones }).map((_, i) => (
                        <div key={`o${i}`} style={{ width: '16px', height: '16px', backgroundColor: '#d63031', borderRadius: '50%', border: '1px solid #ff7675', margin: '-1px 0' }}></div>
                    ))}
                </div>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: '#2f3542' }}></div>
        </div>
    );

    const renderTensCircles = (tens, ones) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {Array.from({ length: tens }).map((_, i) => (
                    <div key={`tc${i}`} style={{ width: '30px', height: '30px', backgroundColor: '#eccc68', color: '#2f3542', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', border: '2px solid #ffa502' }}>10</div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '60px' }}>
                {Array.from({ length: ones }).map((_, i) => (
                    <div key={`oc${i}`} style={{ width: '24px', height: '24px', backgroundColor: '#ff7f50', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.7rem', border: '2px solid #e15f41' }}>1</div>
                ))}
            </div>
        </div>
    );

    const renderTensBlocksTower = (tens, ones) => (
         <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', justifyContent: 'center', height: '120px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: tens }).map((_, i) => (
                    <div key={`tt${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {Array.from({ length: 10 }).map((_, j) => <div key={`tts${j}`} style={{ width: '10px', height: '10px', backgroundColor: '#00a8ff', border: '1px solid rgba(0,0,0,0.1)' }}></div>)}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1px' }}>
                {Array.from({ length: ones }).map((_, i) => (
                    <div key={`ots${i}`} style={{ width: '10px', height: '10px', backgroundColor: '#e84118', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 7</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Work out:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span>i)</span> <span className="num">34</span> <span className="sign">+</span> <span className="num">21</span> <span className="sign">=</span> <input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1', 'num-box small')} />
                     </div>
                     <div className="math-row">
                         <span>iv)</span> <span className="num">55</span> <span className="sign">-</span> <input name="q1_4" value={answers.q1_4} onChange={handleChange} className={getInputClass('q1_4', 'num-box rounded-circle border-danger')} style={{ borderRadius: '50%', color: '#e84118' }} /> <span className="sign">=</span> <span className="num">32</span>
                     </div>
                     <div className="math-row">
                         <span>ii)</span> <span className="num">63</span> <span className="sign">+</span> <input name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2', 'num-box rounded-circle border-danger')} style={{ borderRadius: '50%', color: '#e84118' }} /> <span className="sign">=</span> <span className="num">99</span>
                     </div>
                     <div className="math-row">
                         <span>v)</span> <input name="q1_5" value={answers.q1_5} onChange={handleChange} className={getInputClass('q1_5', 'num-box rounded-circle border-danger')} style={{ borderRadius: '50%', color: '#e84118' }} /> <span className="sign">-</span> <span className="num">24</span> <span className="sign">=</span> <span className="num">35</span>
                     </div>
                     <div className="math-row">
                         <span>iii)</span> <span className="num">87</span> <span className="sign">-</span> <span className="num">41</span> <span className="sign">=</span> <input name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3', 'num-box small')} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Complete with the correct symbol (&lt;, &gt;, =)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                     <div className="math-row">
                         <span>i)</span> <span className="num">61</span> 
                         <select name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1', 'num-box rounded-circle')} style={{ width: '60px', height: '60px', borderRadius: '50%', appearance: 'none', textAlign: 'center', borderColor: '#e84118' }}>
                             <option value=""></option>
                             <option value="<">&lt;</option>
                             <option value=">">&gt;</option>
                             <option value="=">=</option>
                         </select>
                         <span className="num">57</span>
                     </div>
                     <div className="math-row">
                         <span>ii)</span> <span className="num">12</span> <span className="sign">+</span> <span className="num">24</span> 
                         <select name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2', 'num-box rounded-circle')} style={{ width: '60px', height: '60px', borderRadius: '50%', appearance: 'none', textAlign: 'center', borderColor: '#e84118' }}>
                             <option value=""></option>
                             <option value="<">&lt;</option>
                             <option value=">">&gt;</option>
                             <option value="=">=</option>
                         </select>
                         <span className="num">36</span>
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Order from smallest to the biggest number</h3>
                <div style={{ border: '2px solid #54a0ff', borderRadius: '24px', padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1.5rem', marginBottom: '2rem' }}>
                        <span>60</span> <span>35</span> <span>51</span> <span>57</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap' }}>
                        <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1')} style={{ width: '80px', borderRadius: '12px', border: '2px solid #f39c12', padding: '10px', textAlign: 'center', color: '#c0392b' }} />
                        <input name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2')} style={{ width: '80px', borderRadius: '12px', border: '2px solid #f39c12', padding: '10px', textAlign: 'center', color: '#c0392b' }} />
                        <input name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3')} style={{ width: '80px', borderRadius: '12px', border: '2px solid #f39c12', padding: '10px', textAlign: 'center', color: '#c0392b' }} />
                        <input name="q3_4" value={answers.q3_4} onChange={handleChange} className={getInputClass('q3_4')} style={{ width: '80px', borderRadius: '12px', border: '2px solid #f39c12', padding: '10px', textAlign: 'center', color: '#c0392b' }} />
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Find the numbers of ones and tens</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', margin: '0 auto' }}>
                     <div className="math-row" style={{ justifyContent: 'center', fontSize: '1.3rem' }}>
                         <span>i) 76 = </span> 
                         <input name="q4_1t" value={answers.q4_1t} onChange={handleChange} className={getInputClass('q4_1t')} style={{ width: '40px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000' }} /> tens  
                         <input name="q4_1o" value={answers.q4_1o} onChange={handleChange} className={getInputClass('q4_1o')} style={{ width: '40px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000', marginLeft: '10px' }} /> ones
                     </div>
                     <div className="math-row" style={{ justifyContent: 'center', fontSize: '1.3rem' }}>
                         <span>ii) 5 tens 3 ones = </span> 
                         <input name="q4_2" value={answers.q4_2} onChange={handleChange} className={getInputClass('q4_2')} style={{ width: '60px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000' }} />
                     </div>
                </div>
            </div>

            <div className="exam-section interactive-card" style={{ overflowX: 'auto' }}>
                <h3>5. Look at the number values below. Fill in the missing numbers</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', border: '3px solid #000' }}>
                    <thead>
                        <tr>
                            <td style={{ backgroundColor: '#c8d6e5', border: '2px solid #000', padding: '15px', textAlign: 'center', width: '25%' }}>
                                <div style={{ color: '#e84118', fontSize: '1rem', fontWeight: 'bold' }}>Example</div>
                                <div style={{ fontSize: '1.5rem' }}>__ 46 __</div>
                            </td>
                            <td style={{ backgroundColor: '#c8d6e5', border: '2px solid #000', padding: '15px', textAlign: 'center', width: '25%' }}>
                                <input name="q5_1" value={answers.q5_1} onChange={handleChange} className={getInputClass('q5_1', 'num-box')} style={{ width: '100px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000', backgroundColor: 'transparent' }} />
                            </td>
                            <td style={{ backgroundColor: '#c8d6e5', border: '2px solid #000', padding: '15px', textAlign: 'center', width: '25%' }}>
                                <input name="q5_2" value={answers.q5_2} onChange={handleChange} className={getInputClass('q5_2', 'num-box')} style={{ width: '100px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000', backgroundColor: 'transparent' }} />
                            </td>
                            <td style={{ backgroundColor: '#c8d6e5', border: '2px solid #000', padding: '15px', textAlign: 'center', width: '25%' }}>
                                <input name="q5_3" value={answers.q5_3} onChange={handleChange} className={getInputClass('q5_3', 'num-box')} style={{ width: '100px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px dotted #000', backgroundColor: 'transparent' }} />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '2px solid #000', padding: '20px', verticalAlign: 'top', minHeight: '150px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {renderAbacus(4, 6)}
                                </div>
                            </td>
                            <td style={{ border: '2px solid #000', padding: '20px', verticalAlign: 'top', minHeight: '150px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                    {renderTensCircles(4, 2)}
                                </div>
                            </td>
                            <td style={{ border: '2px solid #000', padding: '20px', verticalAlign: 'top', minHeight: '150px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                    {renderTensBlocksTower(8, 4)}
                                </div>
                            </td>
                            <td style={{ border: '2px solid #000', padding: '20px', verticalAlign: 'top', minHeight: '150px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {renderAbacus(2, 6)}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="exam-section interactive-card">
                <h3>6. Order these numbers from the smallest.</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginTop: '2rem' }}>
                    <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#0abde3', border: '8px solid #0984e3', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', padding: '15px', boxSizing: 'border-box', position: 'relative' }}>
                        {[34, 53, 43, 99, 66, 24, 71, 17, 45].map((n, i) => (
                            <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', color: '#2f3542' }}>{n}</div>
                        ))}
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', padding: '20px', border: '4px solid #000', borderLeft: 'none', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', borderTop: '40px solid transparent', borderBottom: '40px solid transparent', borderLeft: '40px solid #000' }}></div>
                        <div style={{ position: 'absolute', right: '-30px', top: '50%', transform: 'translateY(-50%)', borderTop: '30px solid transparent', borderBottom: '30px solid transparent', borderLeft: '30px solid #fff' }}></div>
                        
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                            <input key={i} name={`q6_${i}`} value={answers[`q6_${i}`]} onChange={handleChange} className={getInputClass(`q6_${i}`)} style={{ width: '50px', padding: '8px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: '2px solid #ccc', zIndex: 2 }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>7. Order these numbers from the biggest.</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginTop: '2rem', flexDirection: 'row-reverse' }}>
                    <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#0abde3', border: '8px solid #0984e3', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
                        {[70, 5, 0, 11, 99, 28, 38].map((n, i) => (
                            <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', fontSize: '1rem', fontWeight: 'bold', color: '#2f3542', flex: '1 0 30%', textAlign: 'center' }}>{n}</div>
                        ))}
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'flex-end', padding: '20px', border: '4px solid #000', borderRight: 'none', position: 'relative', flexDirection: 'row-reverse' }}>
                        <div style={{ position: 'absolute', left: '-40px', top: '50%', transform: 'translateY(-50%)', borderTop: '40px solid transparent', borderBottom: '40px solid transparent', borderRight: '40px solid #000' }}></div>
                        <div style={{ position: 'absolute', left: '-30px', top: '50%', transform: 'translateY(-50%)', borderTop: '30px solid transparent', borderBottom: '30px solid transparent', borderRight: '30px solid #fff' }}></div>
                        
                        {[1, 2, 3, 4, 5, 6, 7].map(i => (
                            <input key={i} name={`q7_${i}`} value={answers[`q7_${i}`]} onChange={handleChange} className={getInputClass(`q7_${i}`)} style={{ width: '50px', padding: '8px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: '2px solid #ccc', zIndex: 2 }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>8. Do these</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    <div style={{ border: '2px solid #55efc4', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f0fdf6', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 2, fontSize: '1.2rem', minWidth: '300px' }}>
                            <p><strong>A</strong> • Muneza plants 45 trees on Monday.</p>
                            <p>&nbsp;&nbsp;&nbsp;• On Thursday Murenzi plants 23 trees.</p>
                            <p>&nbsp;&nbsp;&nbsp;• How many trees does Murenzi plant altogether?</p>
                            <div className="math-row" style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                                <input name="q8_1" value={answers.q8_1} onChange={handleChange} className={getInputClass('q8_1')} /> <span style={{ marginLeft: '10px' }}>trees</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                             {Array.from({ length: 45 }).map((_, i) => <i key={`${i}a`} className="uil uil-trees" style={{ fontSize: '1.5rem', color: '#00b894' }}></i>)}
                        </div>
                    </div>

                    <div style={{ border: '2px solid #fab1a0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff5f5', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 2, fontSize: '1.2rem', minWidth: '300px' }}>
                            <p><strong>B</strong> • Judith has 58 eggs.</p>
                            <p>&nbsp;&nbsp;&nbsp;• Judith sells 25 eggs.</p>
                            <p>&nbsp;&nbsp;&nbsp;• How many eggs does Judith remain with?</p>
                            <div className="math-row" style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                                <input name="q8_2" value={answers.q8_2} onChange={handleChange} className={getInputClass('q8_2')} /> <span style={{ marginLeft: '10px' }}>eggs</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                             {Array.from({ length: 58 }).map((_, i) => <i key={`${i}b`} className="uil uil-asterisk" style={{ fontSize: '1.5rem', color: '#e17055' }}></i>)}
                        </div>
                    </div>

                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit8Exam = () => {
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
        q1_cir_1: false, q1_cir_2: false,
        q1_rec_1: false, q1_rec_2: false,
        q2_1n: '', q2_1d: '', q2_2n: '', q2_2d: '',
        q3_1: '', q3_2: '', q3_3: '', q3_4: '',
        q4_s1_p1: false, q4_s1_p2: false, q4_s1_p3: false, q4_s1_p4: false, q4_1n: '', q4_1d: '',
        q4_s2_p1: false, q4_s2_p2: false, q4_s2_p3: false, q4_s2_p4: false, q4_2n: '', q4_2d: '',
        q4_s3_p1: false, q4_s3_p2: false, q4_s3_p3: false, q4_s3_p4: false, q4_3n: '', q4_3d: '',
        q4_s4_p1: false, q4_s4_p2: false, q4_4n: '', q4_4d: '',
        q4_s5_p1: false, q4_s5_p2: false, q4_5n: '', q4_5d: '',
        q4_s6_p1: false, q4_s6_p2: false, q4_6n: '', q4_6d: '',
        q4_s7_p1: false, q4_s7_p2: false, q4_7n: '', q4_7d: ''
    });

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const toggleShade = (name) => {
        setAnswers({ ...answers, [name]: !answers[name] });
    };

    const validateAnswers = () => {
        let results = {};
        
        // Q1: Shade exactly 1 piece per shape
        let q1_cir_shaded = (answers.q1_cir_1 ? 1 : 0) + (answers.q1_cir_2 ? 1 : 0);
        results['q1_cir'] = q1_cir_shaded === 1;
        let q1_rec_shaded = (answers.q1_rec_1 ? 1 : 0) + (answers.q1_rec_2 ? 1 : 0);
        results['q1_rec'] = q1_rec_shaded === 1;

        // Q2
        results['q2_1'] = answers.q2_1n === '1' && answers.q2_1d === '2';
        results['q2_2'] = answers.q2_2n === '1' && answers.q2_2d === '4';

        // Q3
        results['q3_1'] = answers.q3_1.toUpperCase() === 'B';
        results['q3_2'] = answers.q3_2.toUpperCase() === 'A';
        results['q3_3'] = answers.q3_3.toUpperCase() === 'D';
        results['q3_4'] = answers.q3_4.toUpperCase() === 'C';

        // Q4 Custom grading logic
        const checkQ4 = (id, parts, T) => {
            let shaded = 0;
            for(let i=1; i<=parts; i++) {
                shaded += answers[`q4_s${id}_p${i}`] ? 1 : 0;
            }
            if (shaded === 0) return false;
            // Also accept simplified fractions e.g. 2/4 = 1/2
            const n = parseInt(answers[`q4_${id}n`]);
            const d = parseInt(answers[`q4_${id}d`]);
            return (n === shaded && d === T) || (shaded === 2 && T === 4 && n === 1 && d === 2);
        };

        results['q4_1'] = checkQ4(1, 4, 4);
        results['q4_2'] = checkQ4(2, 4, 4);
        results['q4_3'] = checkQ4(3, 4, 4);
        results['q4_4'] = checkQ4(4, 2, 2);
        results['q4_5'] = checkQ4(5, 2, 2);
        results['q4_6'] = checkQ4(6, 2, 2);
        results['q4_7'] = checkQ4(7, 2, 2);

        return results;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        const results = validateAnswers();
        const total = Object.keys(results).length;
        const correct = Object.values(results).filter(v => v).length;

        const percent = (correct / total) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const getFractionClass = (resultKey) => {
        if (!isSubmitted) return '';
        const results = validateAnswers();
        return results[resultKey] ? 'correct-fraction' : 'incorrect-fraction';
    };
    
    const getShapeClass = (resultKey) => {
        if (!isSubmitted) return '';
        const results = validateAnswers();
        return results[resultKey] ? 'correct-shape' : 'incorrect-shape';
    };

    const renderFractionInput = (nName, dName, resultKey) => (
        <div className={`${getFractionClass(resultKey)}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px', padding: '5px', borderRadius: '4px' }}>
            <input name={nName} value={answers[nName]} onChange={handleChange} style={{ width: '40px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '2px solid #000', marginBottom: '2px', fontSize: '1.2rem' }} />
            <input name={dName} value={answers[dName]} onChange={handleChange} style={{ width: '40px', textAlign: 'center', border: 'none', borderBottom: '1px solid #ccc', fontSize: '1.2rem' }} />
        </div>
    );

    return (
        <div className="exam-container">
            <style>
                {`
                    .correct-fraction input { border-color: #2ed573 !important; color: #2ed573; }
                    .incorrect-fraction input { border-color: #ff4757 !important; color: #ff4757; }
                    .correct-shape { box-shadow: 0 0 10px 3px rgba(46, 213, 115, 0.5); }
                    .incorrect-shape { box-shadow: 0 0 10px 3px rgba(255, 71, 87, 0.5); }
                    
                    .fraction-shape { transition: fill 0.3s, background-color 0.3s; cursor: pointer; }
                    .fraction-shape:hover { opacity: 0.8; }
                `}
            </style>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 8</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Shade and show 1/2</h3>
                <p>Click on the shapes below to shade exactly one half.</p>
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                     
                    {/* Circle horizontal split */}
                    <div className={getShapeClass('q1_cir')}>
                        <svg width="150" height="150" viewBox="0 0 100 100" style={{ border: '1px solid transparent' }}>
                            <path d="M 0 50 A 50 50 0 0 1 100 50 Z" className="fraction-shape" fill={answers.q1_cir_1 ? '#f6e58d' : '#fff'} stroke="#000" onClick={() => toggleShade('q1_cir_1')} />
                            <path d="M 0 50 A 50 50 0 0 0 100 50 Z" className="fraction-shape" fill={answers.q1_cir_2 ? '#f6e58d' : '#fff'} stroke="#000" onClick={() => toggleShade('q1_cir_2')} />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* Rectangle vertical split */}
                    <div className={getShapeClass('q1_rec')} style={{ display: 'flex', width: '200px', height: '100px', border: '1px solid #000' }}>
                        <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q1_rec_1 ? '#f6e58d' : '#fff', borderRight: '1px solid #000' }} onClick={() => toggleShade('q1_rec_1')}></div>
                        <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q1_rec_2 ? '#f6e58d' : '#fff' }} onClick={() => toggleShade('q1_rec_2')}></div>
                    </div>

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Write a fraction of the shaded part.</h3>
                <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <svg width="120" height="120" viewBox="0 0 100 100" style={{ border: '2px solid #000' }}>
                            <polygon points="0,0 100,100 0,100" fill="#fff" />
                            <polygon points="0,0 100,0 100,100" fill="#f9ca24" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="2" />
                        </svg>
                        {renderFractionInput("q2_1n", "q2_1d", "q2_1")}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <svg width="120" height="120" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="49" fill="#fff" stroke="#000" strokeWidth="2" />
                            <path d="M 50 50 L 50 100 A 49 49 0 0 1 1 50 Z" fill="#f9ca24" stroke="#000" strokeWidth="1" />
                            <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="2" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="2" />
                        </svg>
                        {renderFractionInput("q2_2n", "q2_2d", "q2_2")}
                    </div>

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Match each shape with its half</h3>
                <p>Select the corresponding letter of the matching half.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    
                    <div style={{ border: '4px solid #f6e58d', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <polygon points="50,10 90,90 10,90" fill="#fff" stroke="#000" strokeWidth="2" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#000" strokeWidth="2" />
                            </svg>
                            <select name="q3_1" value={answers.q3_1} onChange={handleChange} className={!isSubmitted ? 'num-box' : (validateAnswers()['q3_1'] ? 'num-box correct' : 'num-box incorrect')}>
                                <option value="">-</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
                            </select>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <rect x="10" y="10" width="80" height="80" fill="#fff" stroke="#000" strokeWidth="2" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#000" strokeWidth="2" />
                            </svg>
                            <select name="q3_2" value={answers.q3_2} onChange={handleChange} className={!isSubmitted ? 'num-box' : (validateAnswers()['q3_2'] ? 'num-box correct' : 'num-box incorrect')}>
                                <option value="">-</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <svg width="80" height="40" viewBox="0 0 160 80">
                                <rect x="5" y="5" width="150" height="70" fill="#fff" stroke="#000" strokeWidth="2" />
                                <line x1="5" y1="40" x2="155" y2="40" stroke="#000" strokeWidth="2" />
                            </svg>
                            <select name="q3_3" value={answers.q3_3} onChange={handleChange} className={!isSubmitted ? 'num-box' : (validateAnswers()['q3_3'] ? 'num-box correct' : 'num-box incorrect')}>
                                <option value="">-</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="#fff" stroke="#000" strokeWidth="2" />
                                <line x1="50" y1="5" x2="50" y2="95" stroke="#000" strokeWidth="2" />
                            </svg>
                            <select name="q3_4" value={answers.q3_4} onChange={handleChange} className={!isSubmitted ? 'num-box' : (validateAnswers()['q3_4'] ? 'num-box correct' : 'num-box incorrect')}>
                                <option value="">-</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
                            </select>
                        </div>

                    </div>

                    <div style={{ border: '4px solid #badc58', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6ab04c' }}>A</span>
                            <svg width="40" height="60" viewBox="0 0 60 100">
                                <rect x="5" y="10" width="50" height="80" fill="#fff" stroke="#000" strokeWidth="2" />
                            </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6ab04c' }}>B</span>
                            <svg width="40" height="60" viewBox="0 0 60 100">
                                <polygon points="50,10 50,90 10,90" fill="#fff" stroke="#000" strokeWidth="2" />
                            </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6ab04c' }}>C</span>
                            <svg width="40" height="60" viewBox="0 0 60 100">
                                <path d="M 10 10 A 40 40 0 0 0 10 90 Z" fill="#fff" stroke="#000" strokeWidth="2" />
                            </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6ab04c' }}>D</span>
                            <svg width="80" height="25" viewBox="0 0 160 50">
                                <rect x="5" y="5" width="150" height="40" fill="#fff" stroke="#000" strokeWidth="2" />
                            </svg>
                        </div>

                    </div>

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Shade halves or quarters. Write your fraction below.</h3>
                <p style={{ color: '#747d8c' }}>Click on the pieces to shade them, then write the fraction (e.g. 2 / 4 or 1 / 2) below the shape.</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', marginTop: '2rem' }}>
                    
                    {/* Ex 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_1')} style={{ width: '120px', height: '60px', border: '1px solid #000', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flex: 1, borderBottom: '1px solid #000' }}>
                                <div className="fraction-shape" style={{ flex: 1, borderRight: '1px solid #000', backgroundColor: answers.q4_s1_p1 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s1_p1')}></div>
                                <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q4_s1_p2 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s1_p2')}></div>
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                <div className="fraction-shape" style={{ flex: 1, borderRight: '1px solid #000', backgroundColor: answers.q4_s1_p3 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s1_p3')}></div>
                                <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q4_s1_p4 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s1_p4')}></div>
                            </div>
                        </div>
                        {renderFractionInput("q4_1n", "q4_1d", "q4_1")}
                    </div>

                    {/* Ex 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_2')}>
                            <svg width="80" height="80" viewBox="0 0 100 100" style={{ border: '1px solid transparent', borderRadius: '50%' }}>
                                <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="2" />
                                <path d="M 50 50 L 50 2 A 48 48 0 0 1 98 50 Z" className="fraction-shape" fill={answers.q4_s2_p1 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s2_p1')} />
                                <path d="M 50 50 L 98 50 A 48 48 0 0 1 50 98 Z" className="fraction-shape" fill={answers.q4_s2_p2 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s2_p2')} />
                                <path d="M 50 50 L 50 98 A 48 48 0 0 1 2 50 Z" className="fraction-shape" fill={answers.q4_s2_p3 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s2_p3')} />
                                <path d="M 50 50 L 2 50 A 48 48 0 0 1 50 2 Z" className="fraction-shape" fill={answers.q4_s2_p4 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s2_p4')} />
                            </svg>
                        </div>
                        {renderFractionInput("q4_2n", "q4_2d", "q4_2")}
                    </div>

                    {/* Ex 3 - Circle with X */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_3')}>
                            <svg width="80" height="80" viewBox="0 0 100 100" style={{ border: '1px solid transparent', borderRadius: '50%' }}>
                                <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="2" />
                                <path d="M 50 50 L 16 16 A 48 48 0 0 1 84 16 Z" className="fraction-shape" fill={answers.q4_s3_p1 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s3_p1')} />
                                <path d="M 50 50 L 84 16 A 48 48 0 0 1 84 84 Z" className="fraction-shape" fill={answers.q4_s3_p2 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s3_p2')} />
                                <path d="M 50 50 L 84 84 A 48 48 0 0 1 16 84 Z" className="fraction-shape" fill={answers.q4_s3_p3 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s3_p3')} />
                                <path d="M 50 50 L 16 84 A 48 48 0 0 1 16 16 Z" className="fraction-shape" fill={answers.q4_s3_p4 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s3_p4')} />
                            </svg>
                        </div>
                        {renderFractionInput("q4_3n", "q4_3d", "q4_3")}
                    </div>

                    {/* Ex 4 - Circle horizontal */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_4')}>
                            <svg width="80" height="80" viewBox="0 0 100 100" style={{ border: '1px solid transparent', borderRadius: '50%' }}>
                                <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="2" />
                                <path d="M 2 50 L 98 50 A 48 48 0 0 0 2 50 Z" className="fraction-shape" fill={answers.q4_s4_p1 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s4_p1')} />
                                <path d="M 2 50 L 98 50 A 48 48 0 0 1 2 50 Z" className="fraction-shape" fill={answers.q4_s4_p2 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s4_p2')} />
                            </svg>
                        </div>
                        {renderFractionInput("q4_4n", "q4_4d", "q4_4")}
                    </div>

                    {/* Ex 5 - Square vertical */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_5')} style={{ width: '80px', height: '80px', border: '1px solid #000', display: 'flex' }}>
                            <div className="fraction-shape" style={{ flex: 1, borderRight: '1px solid #000', backgroundColor: answers.q4_s5_p1 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s5_p1')}></div>
                            <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q4_s5_p2 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s5_p2')}></div>
                        </div>
                        {renderFractionInput("q4_5n", "q4_5d", "q4_5")}
                    </div>

                    {/* Ex 6 - Circle vertical */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_6')}>
                            <svg width="80" height="80" viewBox="0 0 100 100" style={{ border: '1px solid transparent', borderRadius: '50%' }}>
                                <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="2" />
                                <path d="M 50 2 L 50 98 A 48 48 0 0 0 50 2 Z" className="fraction-shape" fill={answers.q4_s6_p1 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s6_p1')} />
                                <path d="M 50 2 L 50 98 A 48 48 0 0 1 50 2 Z" className="fraction-shape" fill={answers.q4_s6_p2 ? '#f9ca24' : '#fff'} stroke="#000" onClick={() => toggleShade('q4_s6_p2')} />
                            </svg>
                        </div>
                        {renderFractionInput("q4_6n", "q4_6d", "q4_6")}
                    </div>

                    {/* Ex 7 - Rectangle vertical */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className={getShapeClass('q4_7')} style={{ width: '120px', height: '60px', border: '1px solid #000', display: 'flex' }}>
                            <div className="fraction-shape" style={{ flex: 1, borderRight: '1px solid #000', backgroundColor: answers.q4_s7_p1 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s7_p1')}></div>
                            <div className="fraction-shape" style={{ flex: 1, backgroundColor: answers.q4_s7_p2 ? '#f9ca24' : '#fff' }} onClick={() => toggleShade('q4_s7_p2')}></div>
                        </div>
                        {renderFractionInput("q4_7n", "q4_7d", "q4_7")}
                    </div>

                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit9Exam = () => {
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
        q1a_1: '', q1a_2: '', q1a_3: '', q1a_4: '',
        q1b_1: '', q1b_2: '', q1b_3: '', q1b_4: '', q1b_5: '',
        q4r1_1: '', q4r1_2: '', q4r1_3: '', q4r1_4: '', q4r1_5: '', q4r1_6: '',
        q4r2_1: '', q4r2_2: '', q4r2_3: '', q4r2_4: '', q4r2_5: '', q4r2_6: '',
        q4r3_1: '', q4r3_2: '', q4r3_3: '', q4r3_4: '', q4r3_5: '', q4r3_6: '',
        q4r4_1: '', q4r4_2: '', q4r4_3: '', q4r4_4: '', q4r4_5: '',
        q5_1: '', q5_2: '', q5_3: '',
        q6_1: ''
    });

    const correctMap = {
        q1a_1: '20', q1a_2: '40', q1a_3: '60', q1a_4: '80',
        q1b_1: '85', q1b_2: '75', q1b_3: '60', q1b_4: '55', q1b_5: '50',
        q4r1_1: '67', q4r1_2: '57', q4r1_3: '47', q4r1_4: '37', q4r1_5: '17', q4r1_6: '7',
        q4r2_1: '20', q4r2_2: '23', q4r2_3: '26', q4r2_4: '29', q4r2_5: '32', q4r2_6: '35',
        q4r3_1: '32', q4r3_2: '34', q4r3_3: '36', q4r3_4: '38', q4r3_5: '42', q4r3_6: '44',
        q4r4_1: '15', q4r4_2: '13', q4r4_3: '11', q4r4_4: '9', q4r4_5: '5',
        q5_1: '10', q5_2: '8', q5_3: '6',
        q6_1: '-10'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name]?.toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key]?.toLowerCase() === correctMap[key]?.toLowerCase()) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            <style>
                {`
                    .seq-table td { border: 1px solid #7ed6df; padding: 10px; text-align: center; }
                    .seq-input { width: 50px; border: none; border-bottom: 2px dotted #ff6b81; background: transparent; text-align: center; font-size: 1.1rem; color: #ff6b81; }
                    .seq-input:focus { outline: none; border-bottom-color: #ff4757; }
                    .seq-input.correct { border: 2px solid #2ed573 !important; color: #2f3542 !important; border-radius: 4px; }
                    .seq-input.incorrect { border: 2px solid #ff4757 !important; color: #2f3542 !important; border-radius: 4px; }
                    
                    .seq-box-container { display: flex; flex-wrap: wrap; border: 1px solid #2f3542; width: fit-content; }
                    .seq-box { width: 60px; height: 50px; border-right: 1px solid #2f3542; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
                    .seq-box:last-child { border-right: none; }
                    .seq-box input { width: 100%; height: 100%; border: none; text-align: center; font-size: 1.2rem; }
                    .seq-box input:focus { outline: 2px solid #54a0ff; }
                `}
            </style>

            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 9</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Fill in the blanks with the missing numbers</h3>
                
                <h4 style={{ margin: '1rem 0 0.5rem 0' }}>a.</h4>
                <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
                    <div className="seq-box-container">
                        <div className="seq-box">10</div>
                        <div className="seq-box"><input name="q1a_1" value={answers.q1a_1} onChange={handleChange} className={getInputClass('q1a_1', '')} /></div>
                        <div className="seq-box">30</div>
                        <div className="seq-box"><input name="q1a_2" value={answers.q1a_2} onChange={handleChange} className={getInputClass('q1a_2', '')} /></div>
                        <div className="seq-box">50</div>
                        <div className="seq-box"><input name="q1a_3" value={answers.q1a_3} onChange={handleChange} className={getInputClass('q1a_3', '')} /></div>
                        <div className="seq-box">70</div>
                        <div className="seq-box"><input name="q1a_4" value={answers.q1a_4} onChange={handleChange} className={getInputClass('q1a_4', '')} /></div>
                        <div className="seq-box">90</div>
                    </div>
                </div>

                <h4 style={{ margin: '1rem 0 0.5rem 0' }}>b.</h4>
                <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
                    <div className="seq-box-container">
                        <div className="seq-box">90</div>
                        <div className="seq-box"><input name="q1b_1" value={answers.q1b_1} onChange={handleChange} className={getInputClass('q1b_1', '')} /></div>
                        <div className="seq-box">80</div>
                        <div className="seq-box"><input name="q1b_2" value={answers.q1b_2} onChange={handleChange} className={getInputClass('q1b_2', '')} /></div>
                        <div className="seq-box">70</div>
                        <div className="seq-box">65</div>
                        <div className="seq-box"><input name="q1b_3" value={answers.q1b_3} onChange={handleChange} className={getInputClass('q1b_3', '')} /></div>
                        <div className="seq-box"><input name="q1b_4" value={answers.q1b_4} onChange={handleChange} className={getInputClass('q1b_4', '')} /></div>
                        <div className="seq-box"><input name="q1b_5" value={answers.q1b_5} onChange={handleChange} className={getInputClass('q1b_5', '')} /></div>
                        <div className="seq-box">45</div>
                    </div>
                </div>

            </div>

            <div className="exam-section interactive-card" style={{ overflowX: 'auto' }}>
                <h3>4. Fill in the missing numbers</h3>
                <table className="seq-table" style={{ borderCollapse: 'collapse', minWidth: '600px', fontSize: '1.2rem', marginTop: '1rem' }}>
                    <tbody>
                        <tr>
                            <td>87</td>
                            <td>77</td>
                            <td><input name="q4r1_1" value={answers.q4r1_1} onChange={handleChange} className={getInputClass('q4r1_1', 'seq-input')} /></td>
                            <td><input name="q4r1_2" value={answers.q4r1_2} onChange={handleChange} className={getInputClass('q4r1_2', 'seq-input')} /></td>
                            <td><input name="q4r1_3" value={answers.q4r1_3} onChange={handleChange} className={getInputClass('q4r1_3', 'seq-input')} /></td>
                            <td><input name="q4r1_4" value={answers.q4r1_4} onChange={handleChange} className={getInputClass('q4r1_4', 'seq-input')} /></td>
                            <td>27</td>
                            <td><input name="q4r1_5" value={answers.q4r1_5} onChange={handleChange} className={getInputClass('q4r1_5', 'seq-input')} /></td>
                            <td><input name="q4r1_6" value={answers.q4r1_6} onChange={handleChange} className={getInputClass('q4r1_6', 'seq-input')} /></td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>14</td>
                            <td>17</td>
                            <td><input name="q4r2_1" value={answers.q4r2_1} onChange={handleChange} className={getInputClass('q4r2_1', 'seq-input')} /></td>
                            <td><input name="q4r2_2" value={answers.q4r2_2} onChange={handleChange} className={getInputClass('q4r2_2', 'seq-input')} /></td>
                            <td><input name="q4r2_3" value={answers.q4r2_3} onChange={handleChange} className={getInputClass('q4r2_3', 'seq-input')} /></td>
                            <td><input name="q4r2_4" value={answers.q4r2_4} onChange={handleChange} className={getInputClass('q4r2_4', 'seq-input')} /></td>
                            <td><input name="q4r2_5" value={answers.q4r2_5} onChange={handleChange} className={getInputClass('q4r2_5', 'seq-input')} /></td>
                            <td><input name="q4r2_6" value={answers.q4r2_6} onChange={handleChange} className={getInputClass('q4r2_6', 'seq-input')} /></td>
                        </tr>
                        <tr>
                            <td>28</td>
                            <td>30</td>
                            <td><input name="q4r3_1" value={answers.q4r3_1} onChange={handleChange} className={getInputClass('q4r3_1', 'seq-input')} /></td>
                            <td><input name="q4r3_2" value={answers.q4r3_2} onChange={handleChange} className={getInputClass('q4r3_2', 'seq-input')} /></td>
                            <td><input name="q4r3_3" value={answers.q4r3_3} onChange={handleChange} className={getInputClass('q4r3_3', 'seq-input')} /></td>
                            <td><input name="q4r3_4" value={answers.q4r3_4} onChange={handleChange} className={getInputClass('q4r3_4', 'seq-input')} /></td>
                            <td>40</td>
                            <td><input name="q4r3_5" value={answers.q4r3_5} onChange={handleChange} className={getInputClass('q4r3_5', 'seq-input')} /></td>
                            <td><input name="q4r3_6" value={answers.q4r3_6} onChange={handleChange} className={getInputClass('q4r3_6', 'seq-input')} /></td>
                        </tr>
                        <tr>
                            <td>19</td>
                            <td>17</td>
                            <td><input name="q4r4_1" value={answers.q4r4_1} onChange={handleChange} className={getInputClass('q4r4_1', 'seq-input')} /></td>
                            <td><input name="q4r4_2" value={answers.q4r4_2} onChange={handleChange} className={getInputClass('q4r4_2', 'seq-input')} /></td>
                            <td><input name="q4r4_3" value={answers.q4r4_3} onChange={handleChange} className={getInputClass('q4r4_3', 'seq-input')} /></td>
                            <td><input name="q4r4_4" value={answers.q4r4_4} onChange={handleChange} className={getInputClass('q4r4_4', 'seq-input')} /></td>
                            <td>7</td>
                            <td><input name="q4r4_5" value={answers.q4r4_5} onChange={handleChange} className={getInputClass('q4r4_5', 'seq-input')} /></td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="exam-section interactive-card" style={{ overflowX: 'auto' }}>
                <h3>5. Do this</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', border: '2px solid #74b9ff' }}>
                    <tbody>
                        
                        <tr>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '1.2rem', verticalAlign: 'top', width: '50%' }}>
                                <p style={{ margin: '0 0 10px 0' }}>• Ana has 10 bananas.</p>
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '2rem', textAlign: 'center', width: '25%' }}>
                                🍌🍌🍌🍌🍌<br/>🍌🍌🍌🍌🍌
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', verticalAlign: 'top', width: '25%' }}>
                                <div>Bananas of Ana</div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <input name="q5_1" value={answers.q5_1} onChange={handleChange} className={getInputClass('q5_1')} style={{ width: '60px', padding: '5px', textAlign: 'center', border: '2px solid #ccc', borderRadius: '4px' }} />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '1.2rem', verticalAlign: 'top', width: '50%' }}>
                                <p style={{ margin: '0 0 10px 0' }}>• Monica has 2 less bananas than Ana.</p>
                                <p style={{ margin: 0 }}>How many bananas does Monica have?</p>
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '2rem', textAlign: 'center', width: '25%' }}>
                                🍌🍌🍌🍌<br/>🍌🍌🍌🍌
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', verticalAlign: 'top', width: '25%' }}>
                                <div>Bananas of Monica</div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <input name="q5_2" value={answers.q5_2} onChange={handleChange} className={getInputClass('q5_2')} style={{ width: '60px', padding: '5px', textAlign: 'center', border: '2px solid #ccc', borderRadius: '4px' }} />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '1.2rem', verticalAlign: 'top', width: '50%' }}>
                                <p style={{ margin: '0 0 10px 0' }}>• Sara has 2 less bananas than Monica.</p>
                                <p style={{ margin: 0 }}>How many bananas does Sara have?</p>
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', fontSize: '2rem', textAlign: 'center', width: '25%' }}>
                                🍌🍌🍌<br/>🍌🍌🍌
                            </td>
                            <td style={{ border: '1px solid #74b9ff', padding: '15px', verticalAlign: 'top', width: '25%' }}>
                                <div>Bananas of Sara</div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <input name="q5_3" value={answers.q5_3} onChange={handleChange} className={getInputClass('q5_3')} style={{ width: '60px', padding: '5px', textAlign: 'center', border: '2px solid #ccc', borderRadius: '4px' }} />
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="exam-section interactive-card">
                <h3>6. Find the rule for this number pattern:</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '1rem', fontSize: '1.4rem' }}>
                    <div style={{ backgroundColor: '#dfe6e9', padding: '10px 20px', borderRadius: '8px', border: '2px dashed #b2bec3' }}>
                        80; 70; 60; 50...
                    </div>
                    <div>
                        <select name="q6_1" value={answers.q6_1} onChange={handleChange} className={getInputClass('q6_1')} style={{ padding: '10px', fontSize: '1.2rem', border: '2px solid #fdcb6e', borderRadius: '8px', outline: 'none' }}>
                            <option value="">Select Rule...</option>
                            <option value="+10">+ 10  (add 10)</option>
                            <option value="+5">+ 5  (add 5)</option>
                            <option value="-10">- 10  (subtract 10)</option>
                            <option value="-5">- 5  (subtract 5)</option>
                        </select>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit10Exam = () => {
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
        q1_1: '', q1_2: '', q1_3: '',
        q2_r1_1: '', q2_r1_2: '',
        q2_r2_1: '', q2_r2_2: '', q2_r2_3: '',
        q2_r3_1: '', q2_r3_2: '', q2_r3_3: '', q2_r3_4: '',
        q2_r4_1: '', q2_r4_2: '', q2_r4_3: '', q2_r4_4: '', q2_r4_5: '',
        q3_1: ''
    });

    const correctMap = {
        q1_1: '10', q1_2: '6', q1_3: '3',
        q3_1: '9'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const validateAnswers = () => {
        let results = {};
        
        // Validate Section 1 & 3 strictly
        Object.keys(correctMap).forEach(key => {
            results[key] = answers[key]?.toLowerCase() === correctMap[key]?.toLowerCase();
        });

        // Validate Section 2 Dynamically
        const checkSum10 = (inputs) => {
            let sum = 0;
            for(let key of inputs) {
                if(answers[key] === '') return false; // Fail if any are empty
                let val = parseInt(answers[key]);
                if(isNaN(val)) return false;
                sum += val;
            }
            return sum === 10;
        };

        results['q2_r1'] = checkSum10(['q2_r1_1', 'q2_r1_2']);
        results['q2_r2'] = checkSum10(['q2_r2_1', 'q2_r2_2', 'q2_r2_3']);
        results['q2_r3'] = checkSum10(['q2_r3_1', 'q2_r3_2', 'q2_r3_3', 'q2_r3_4']);
        results['q2_r4'] = checkSum10(['q2_r4_1', 'q2_r4_2', 'q2_r4_3', 'q2_r4_4', 'q2_r4_5']);

        return results;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        const results = validateAnswers();
        const total = Object.keys(results).length;
        const correct = Object.values(results).filter(v => v).length;

        const percent = (correct / total) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        // Check if it's a dynamic validation component
        if(name.startsWith('q2_')) {
            const results = validateAnswers();
            return `${baseClass} ${results[name.substring(0, 5)] ? 'correct' : 'incorrect'}`;
        }
        // Strict mapping
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name]?.toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 10</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Work out these</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto', fontSize: '1.4rem' }}>
                    <div className="math-row">
                        <span>•</span> <span className="num">6 m</span> <span className="sign">+</span> <span className="num">4 m</span> <span className="sign">=</span> <input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1', 'num-box small')} /> <span className="num">m</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">10 m</span> <span className="sign">-</span> <span className="num">4 m</span> <span className="sign">=</span> <input name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2', 'num-box small')} /> <span className="num">m</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">6 m</span> <span className="sign">+</span> <input name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3', 'num-box small')} /> <span className="num">m</span> <span className="sign">=</span> <span className="num">9 m</span>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Look at the example. Find 4 different ways to make 10m with sticks</h3>
                
                <div style={{ padding: '1rem', backgroundColor: '#f1f2f6', borderRadius: '8px', border: '2px solid #dfe4ea', marginBottom: '2rem' }}>
                    <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold' }}>Example:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end', justifyContent: 'center' }}>
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                             <div style={{ width: '40px', height: '10px', backgroundColor: '#2ed573' }}></div>
                             <span>1m</span>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                             <div style={{ width: '40px', height: '10px', backgroundColor: '#2ed573' }}></div>
                             <span>1m</span>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                             <div style={{ width: '160px', height: '10px', backgroundColor: '#1e90ff' }}></div>
                             <span>4m</span>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                             <div style={{ width: '80px', height: '10px', backgroundColor: '#ff4757' }}></div>
                             <span>2m</span>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                             <div style={{ width: '80px', height: '10px', backgroundColor: '#ff4757' }}></div>
                             <span>2m</span>
                         </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', fontSize: '1.2rem' }}>
                    <p style={{ color: '#747d8c' }}>Fill in the boxes to design your own sticks summing to 10m!</p>
                    
                    {/* Way 1: 2 sticks */}
                    <div className="math-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span>Way 1:</span> 
                        <input name="q2_r1_1" value={answers.q2_r1_1} onChange={handleChange} className={getInputClass('q2_r1_1', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r1_2" value={answers.q2_r1_2} onChange={handleChange} className={getInputClass('q2_r1_2', 'num-box small')} /> <span>m</span>
                        <span className="sign">= 10m</span>
                    </div>

                    {/* Way 2: 3 sticks */}
                    <div className="math-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span>Way 2:</span> 
                        <input name="q2_r2_1" value={answers.q2_r2_1} onChange={handleChange} className={getInputClass('q2_r2_1', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r2_2" value={answers.q2_r2_2} onChange={handleChange} className={getInputClass('q2_r2_2', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r2_3" value={answers.q2_r2_3} onChange={handleChange} className={getInputClass('q2_r2_3', 'num-box small')} /> <span>m</span>
                        <span className="sign">= 10m</span>
                    </div>

                    {/* Way 3: 4 sticks */}
                    <div className="math-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span>Way 3:</span> 
                        <input name="q2_r3_1" value={answers.q2_r3_1} onChange={handleChange} className={getInputClass('q2_r3_1', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r3_2" value={answers.q2_r3_2} onChange={handleChange} className={getInputClass('q2_r3_2', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r3_3" value={answers.q2_r3_3} onChange={handleChange} className={getInputClass('q2_r3_3', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r3_4" value={answers.q2_r3_4} onChange={handleChange} className={getInputClass('q2_r3_4', 'num-box small')} /> <span>m</span>
                        <span className="sign">= 10m</span>
                    </div>

                    {/* Way 4: 5 sticks */}
                    <div className="math-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span>Way 4:</span> 
                        <input name="q2_r4_1" value={answers.q2_r4_1} onChange={handleChange} className={getInputClass('q2_r4_1', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r4_2" value={answers.q2_r4_2} onChange={handleChange} className={getInputClass('q2_r4_2', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r4_3" value={answers.q2_r4_3} onChange={handleChange} className={getInputClass('q2_r4_3', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r4_4" value={answers.q2_r4_4} onChange={handleChange} className={getInputClass('q2_r4_4', 'num-box small')} /> <span>m</span>
                        <span className="sign">+</span>
                        <input name="q2_r4_5" value={answers.q2_r4_5} onChange={handleChange} className={getInputClass('q2_r4_5', 'num-box small')} /> <span>m</span>
                        <span className="sign">= 10m</span>
                    </div>

                </div>

            </div>

            <div className="exam-section interactive-card">
                <h3>3. Do this</h3>
                <div style={{ border: '2px solid #a29bfe', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#e056fd0a', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p style={{ margin: 0 }}>• Mary needs <strong>4m</strong> of cloth for tailoring shorts.</p>
                    <p style={{ margin: 0 }}>• Mary needs <strong>5 m</strong> of cloth for tailoring a coat.</p>
                    <p style={{ margin: 0 }}>• How many meters of cloth does Mary need to buy?</p>
                    
                    <div className="math-row" style={{ marginTop: '1.5rem', justifyContent: 'center' }}>
                        <i className="uil uil-ruler-combined" style={{ fontSize: '2rem', color: '#6c5ce7', marginRight: '1rem' }}></i>
                        <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1')} style={{ width: '80px', textAlign: 'center' }} />
                        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>meters</span>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit11Exam = () => {
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
        q1_r1_1: '', q1_r1_2: '', q1_r1_3: '',
        q1_r2_1: '', q1_r2_2: '', q1_r2_3: '',
        q1_r3_1: '', q1_r3_2: '', q1_r3_3: '',
        q1_r4_1: '', q1_r4_2: '', q1_r4_3: ''
    });

    const correctMap = {
        q1_r1_1: 'wednesday', q1_r1_2: 'thursday', q1_r1_3: 'friday',
        q1_r2_1: 'sunday', q1_r2_2: 'monday', q1_r2_3: 'tuesday',
        q1_r3_1: 'wednesday', q1_r3_2: 'thursday', q1_r3_3: 'saturday',
        q1_r4_1: 'wednesday', q1_r4_2: 'friday', q1_r4_3: 'saturday'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'day-input') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key]?.toLowerCase() === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="exam-container">
            <style>
                {`
                    .day-box { display: flex; align-items: center; justify-content: center; padding: 15px; font-size: 1.2rem; min-width: 140px; text-align: center; }
                    .bg-green-light { background-color: #e8f5e9; color: #2f3542; }
                    .bg-blue-light { background-color: #bbdefb; color: #2f3542; }
                    .day-input { width: 100%; height: 100%; border: none; background: transparent; text-align: center; font-size: 1.2rem; outline: none; border-bottom: 2px solid #ccc; }
                    .day-input:focus { border-bottom: 2px solid #54a0ff; }
                    .day-input.correct { border: 2px solid #2ed573; background-color: #fff; border-radius: 4px; }
                    .day-input.incorrect { border: 2px solid #ff4757; background-color: #fff; border-radius: 4px; }
                    .row-container { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 15px; }
                `}
            </style>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 11</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card" style={{ overflowX: 'auto' }}>
                <h3>Look at the example. Fill in the gaps with the days of week</h3>
                
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '650px' }}>
                    {/* Example */}
                    <div className="row-container" style={{ alignItems: 'center' }}>
                        <strong style={{ color: '#ff4757', fontSize: '1.4rem', marginRight: '1rem', width: '100px' }}>Example:</strong>
                        <div className="day-box bg-green-light">Saturday</div>
                        <div className="day-box bg-green-light">Sunday</div>
                        <div className="day-box bg-green-light">Monday</div>
                        <div className="day-box bg-green-light">Tuesday</div>
                    </div>

                    {/* Row 1 */}
                    <div className="row-container" style={{ marginLeft: '110px' }}>
                        <div className="day-box bg-blue-light">Tuesday</div>
                        <div className="day-box bg-blue-light"><input name="q1_r1_1" value={answers.q1_r1_1} onChange={handleChange} className={getInputClass('q1_r1_1')} placeholder="?" /></div>
                        <div className="day-box bg-blue-light"><input name="q1_r1_2" value={answers.q1_r1_2} onChange={handleChange} className={getInputClass('q1_r1_2')} placeholder="?" /></div>
                        <div className="day-box bg-blue-light"><input name="q1_r1_3" value={answers.q1_r1_3} onChange={handleChange} className={getInputClass('q1_r1_3')} placeholder="?" /></div>
                    </div>

                    {/* Row 2 */}
                    <div className="row-container" style={{ marginLeft: '110px' }}>
                        <div className="day-box bg-green-light"><input name="q1_r2_1" value={answers.q1_r2_1} onChange={handleChange} className={getInputClass('q1_r2_1')} placeholder="?" /></div>
                        <div className="day-box bg-green-light"><input name="q1_r2_2" value={answers.q1_r2_2} onChange={handleChange} className={getInputClass('q1_r2_2')} placeholder="?" /></div>
                        <div className="day-box bg-green-light"><input name="q1_r2_3" value={answers.q1_r2_3} onChange={handleChange} className={getInputClass('q1_r2_3')} placeholder="?" /></div>
                        <div className="day-box bg-green-light">Wednesday</div>
                    </div>

                    {/* Row 3 */}
                    <div className="row-container" style={{ marginLeft: '110px' }}>
                        <div className="day-box bg-blue-light"><input name="q1_r3_1" value={answers.q1_r3_1} onChange={handleChange} className={getInputClass('q1_r3_1')} placeholder="?" /></div>
                        <div className="day-box bg-blue-light"><input name="q1_r3_2" value={answers.q1_r3_2} onChange={handleChange} className={getInputClass('q1_r3_2')} placeholder="?" /></div>
                        <div className="day-box bg-blue-light">Friday</div>
                        <div className="day-box bg-blue-light"><input name="q1_r3_3" value={answers.q1_r3_3} onChange={handleChange} className={getInputClass('q1_r3_3')} placeholder="?" /></div>
                    </div>

                    {/* Row 4 */}
                    <div className="row-container" style={{ marginLeft: '110px' }}>
                        <div className="day-box bg-green-light"><input name="q1_r4_1" value={answers.q1_r4_1} onChange={handleChange} className={getInputClass('q1_r4_1')} placeholder="?" /></div>
                        <div className="day-box bg-green-light">Thursday</div>
                        <div className="day-box bg-green-light"><input name="q1_r4_2" value={answers.q1_r4_2} onChange={handleChange} className={getInputClass('q1_r4_2')} placeholder="?" /></div>
                        <div className="day-box bg-green-light"><input name="q1_r4_3" value={answers.q1_r4_3} onChange={handleChange} className={getInputClass('q1_r4_3')} placeholder="?" /></div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit12Exam = () => {
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
        q1_1: '', q1_2: '', q1_3: '', q1_4: '', q1_5: '',
        q2_1: '', q2_2: '', q2_3: '',
        q3_1: '', q3_2: '', q3_3: '',
        q4_1: '', q4_2: '', q4_3: '',
        q5_1: '', q5_2: '', q5_3: '', q5_4: '', q5_5: '', q5_6: '',
        q6_1: '', q6_2: '', q6_3: ''
    });

    const correctMap = {
        q1_1: '5', q1_2: '10', q1_3: '100', q1_4: '20', q1_5: '50',
        q2_1: '2', q2_2: '5', q2_3: '10',
        q3_1: '30', q3_2: '30', q3_3: '100',
        q4_1: '20', q4_2: '20', q4_3: '5',
        q5_1: '100', q5_2: '50', q5_3: '1', q5_4: '10', q5_5: '20', q5_6: '5',
        q6_1: '50', q6_2: '80', q6_3: '20'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.trim() });
    };

    const getInputClass = (name, baseClass = 'num-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name]?.toLowerCase() === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctMap).length;

        Object.keys(correctMap).forEach(key => {
            if (answers[key]?.toLowerCase() === correctMap[key]) {
                correctAnswers++;
            }
        });

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const renderCoin = (val, color1, color2) => (
        <div style={{
            width: '80px', height: '80px', 
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${color1} 0%, ${color2} 100%)`,
            border: `2px solid ${color2}`,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 5px 10px rgba(0,0,0,0.3)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#fff', textShadow: '1px 1px 2px #000', fontWeight: 'bold'
        }}>
            <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>{val}</span>
            <span style={{ fontSize: '0.8rem' }}>FRW</span>
        </div>
    );

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 12</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Pick and show the following coins:</h3>
                <p style={{ color: '#747d8c' }}>Select the correct value for each coin.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem' }}>
                    <div className="math-row" style={{ justifyContent: 'space-between' }}>
                        <span>• Coin of five Rwandan francs:</span>
                        <div><input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1', 'num-box small')} /> <span className="sign">Frw</span></div>
                    </div>
                    <div className="math-row" style={{ justifyContent: 'space-between' }}>
                        <span>• Coin of ten Rwandan francs:</span>
                        <div><input name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2', 'num-box small')} /> <span className="sign">Frw</span></div>
                    </div>
                    <div className="math-row" style={{ justifyContent: 'space-between' }}>
                        <span>• Coin of one hundred Rwandan francs:</span>
                        <div><input name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3', 'num-box small')} /> <span className="sign">Frw</span></div>
                    </div>
                    <div className="math-row" style={{ justifyContent: 'space-between' }}>
                        <span>• Coin of twenty Rwandan francs:</span>
                        <div><input name="q1_4" value={answers.q1_4} onChange={handleChange} className={getInputClass('q1_4', 'num-box small')} /> <span className="sign">Frw</span></div>
                    </div>
                    <div className="math-row" style={{ justifyContent: 'space-between' }}>
                        <span>• Coin of fifty Rwandan francs:</span>
                        <div><input name="q1_5" value={answers.q1_5} onChange={handleChange} className={getInputClass('q1_5', 'num-box small')} /> <span className="sign">Frw</span></div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Identify a number of small coins to make 100</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem' }}>
                    <div className="math-row">
                        <span>• How many coins of 50 Frw to make 100Frw?</span>
                        <input name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1', 'num-box small')} />
                    </div>
                    <div className="math-row">
                        <span>• How many coins of 20 Frw to make 100 Frw?</span>
                        <input name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2', 'num-box small')} />
                    </div>
                    <div className="math-row">
                        <span>• How many coins of 10 Frw to make 100 Frw?</span>
                        <input name="q2_3" value={answers.q2_3} onChange={handleChange} className={getInputClass('q2_3', 'num-box small')} />
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Find the correct answer</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem' }}>
                    <div className="math-row">
                        <span>•</span> <span className="num">50Frw</span> <span className="sign">-</span> <span className="num">20 Frw</span> <span className="sign">=</span> <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">10Frw</span> <span className="sign">+</span> <span className="num">20 Frw</span> <span className="sign">=</span> <input name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">50 Frw</span> <span className="sign">+</span> <span className="num">50 Frw</span> <span className="sign">=</span> <input name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Fill in the missing money</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem' }}>
                    <div className="math-row">
                        <span>•</span> <span className="num">100 Frw</span> <span className="sign">=</span> <span className="num">50 Frw</span> <span className="sign">+</span> <span className="num">30Frw</span> <span className="sign">+</span> <input name="q4_1" value={answers.q4_1} onChange={handleChange} className={getInputClass('q4_1', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">50Frw</span> <span className="sign">=</span> <span className="num">20Frw</span> <span className="sign">+</span> <span className="num">10Frw</span> <span className="sign">+</span> <input name="q4_2" value={answers.q4_2} onChange={handleChange} className={getInputClass('q4_2', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                    <div className="math-row">
                        <span>•</span> <span className="num">20 Frw</span> <span className="sign">=</span> <span className="num">10Frw</span> <span className="sign">+</span> <span className="num">5 Frw</span> <span className="sign">+</span> <input name="q4_3" value={answers.q4_3} onChange={handleChange} className={getInputClass('q4_3', 'num-box small')} /> <span className="sign">Frw</span>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>5. Match the coins with their values</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(100, '#eccc68', '#f39c12')}
                            <select name="q5_1" value={answers.q5_1} onChange={handleChange} className={getInputClass('q5_1', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(50, '#d1ccc0', '#84817a')}
                            <select name="q5_2" value={answers.q5_2} onChange={handleChange} className={getInputClass('q5_2', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(1, '#f1f2f6', '#a4b0be')}
                            <select name="q5_3" value={answers.q5_3} onChange={handleChange} className={getInputClass('q5_3', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(10, '#f8a5c2', '#e77f67')}
                            <select name="q5_4" value={answers.q5_4} onChange={handleChange} className={getInputClass('q5_4', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(20, '#57606f', '#2f3542')}
                            <select name="q5_5" value={answers.q5_5} onChange={handleChange} className={getInputClass('q5_5', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '2px solid #dfe6e9', borderRadius: '12px' }}>
                            {renderCoin(5, '#ccae62', '#b33939')}
                            <select name="q5_6" value={answers.q5_6} onChange={handleChange} className={getInputClass('q5_6', 'num-box')} style={{ flex: 1, padding: '10px' }}>
                                <option value="">Select match...</option>
                                <option value="100">100 FRW</option><option value="10">10 FRW</option><option value="5">5 FRW</option>
                                <option value="50">50 FRW</option><option value="1">1 FRW</option><option value="20">20 FRW</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>6. Do these</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.2rem' }}>
                    
                    <div style={{ border: '2px solid #74b9ff', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f1f8ff' }}>
                        <p style={{ margin: '0 0 1rem 0' }}>• Muhire has one coin of 100Frw in total. He buys biscuits of 50Frw. How much Frw does Muhire remain with?</p>
                        <div className="math-row">
                            <span style={{ fontWeight: 'bold' }}>Remains with: </span>
                            <input name="q6_1" value={answers.q6_1} onChange={handleChange} className={getInputClass('q6_1')} style={{ width: '80px', textAlign: 'center' }} /> <span className="sign">Frw</span>
                        </div>
                    </div>

                    <div style={{ border: '2px solid #55efc4', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f0fdf6' }}>
                        <p style={{ margin: '0 0 1rem 0' }}>• Mukamana has 100Frw. She buys banana of 20Frw, a box of biscuits of 50Frw and then a match box of 10Frw.</p>
                        <div className="math-row">
                            <span style={{ fontWeight: 'bold' }}>How much money does Mukamana spend? </span>
                            <input name="q6_2" value={answers.q6_2} onChange={handleChange} className={getInputClass('q6_2')} style={{ width: '80px', textAlign: 'center' }} /> <span className="sign">Frw</span>
                        </div>
                        <div className="math-row" style={{ marginTop: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>How much Frw does Mukamana have? </span>
                            <input name="q6_3" value={answers.q6_3} onChange={handleChange} className={getInputClass('q6_3')} style={{ width: '80px', textAlign: 'center' }} /> <span className="sign">Frw</span>
                        </div>
                    </div>

                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit13Exam = () => {
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
        q1_1: '', q1_2: '', q1_3: '',
        q3_1: '', q3_2: '', q3_3: ''
    });

    const [dots, setDots] = useState([]);

    const correctMap = {
        q1_1: 'above', q1_2: 'above', q1_3: 'under', // Note: visually "on" is often accepted. Prompts says "Use above, under", so "above" is expected for the cat on the table.
        q3_1: 'on', q3_2: 'under', q3_3: 'between'
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.toLowerCase() });
    };

    const handleSvgClick = (e) => {
        if(isSubmitted) return;
        const rect = e.currentTarget.getBoundingClientRect();
        // SVG viewBox is 0 0 400 400, mapped to physical rect dimensions
        const scaleX = 400 / rect.width;
        const scaleY = 400 / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        let newDots = [...dots, {x, y}];
        // Allow at most 6 dots
        if(newDots.length > 6) {
            newDots.shift(); // remove oldest if they keep clicking
        }
        setDots(newDots);
    };

    const evaluateDots = () => {
        let inside = 0, onEdge = 0, outside = 0;
        
        dots.forEach(d => {
            const dist = Math.sqrt(Math.pow(d.x - 200, 2) + Math.pow(d.y - 200, 2));
            if(dist < 85) inside++;              // strictly inside
            else if(dist >= 85 && dist <= 115) onEdge++; // on the thick stroke (radius 100, stroke 20)
            else outside++;                      // strictly outside
        });

        // Target: 1 inside, 2 on, 3 outside
        return inside === 1 && onEdge === 2 && outside === 3;
    };

    const validateAnswers = () => {
        let results = {};
        Object.keys(correctMap).forEach(key => {
            results[key] = answers[key] === correctMap[key];
        });
        results['q2_canvas'] = evaluateDots();
        return results;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        const results = validateAnswers();
        const total = Object.keys(results).length;
        const correct = Object.values(results).filter(v => v).length;

        const percent = (correct / total) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'num-box';
        return `num-box ${answers[name] === correctMap[name] ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 13</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Look at the picture. Use "above, under" to complete the sentences.</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '150px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '10px' }}><i className="uil uil-twitter" style={{ fontSize: '2rem', color: '#74b9ff' }}></i> <i className="uil uil-twitter" style={{ fontSize: '1.5rem', color: '#74b9ff', position: 'absolute', top: '-10px', right: '-20px' }}></i></div>
                            <i className="uil uil-trees" style={{ fontSize: '6rem', color: '#55efc4' }}></i>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.1rem' }}>
                            Birds are
                            <select name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1')} style={{ padding: '5px', width: '100px' }}>
                                <option value="">...</option><option value="above">above</option><option value="under">under</option>
                            </select>
                            tree
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '150px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '20px', fontSize: '3rem' }}>🐈</div>
                            <div style={{ width: '100px', height: '50px', borderTop: '10px solid #dcdde1', borderLeft: '10px solid #dcdde1', borderRight: '10px solid #dcdde1' }}></div>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.1rem' }}>
                            A cat is 
                            <select name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2')} style={{ padding: '5px', width: '100px' }}>
                                <option value="">...</option><option value="above">above</option><option value="under">under</option>
                            </select>
                            table
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '150px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10px', position: 'relative' }}>
                            <div style={{ width: '100px', height: '50px', borderTop: '10px solid #dcdde1', borderLeft: '10px solid #dcdde1', borderRight: '10px solid #dcdde1', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginTop: '10px' }}>🐈</div>
                            </div>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.1rem' }}>
                            A cat is 
                            <select name="q1_3" value={answers.q1_3} onChange={handleChange} className={getInputClass('q1_3')} style={{ padding: '5px', width: '100px' }}>
                                <option value="">...</option><option value="above">above</option><option value="under">under</option>
                            </select>
                            table
                        </div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Draw a closed line</h3>
                <ul style={{ fontSize: '1.2rem', color: '#2f3542', marginBottom: '1.5rem' }}>
                    <li>Put <strong>1 dot inside</strong> the closed line,</li>
                    <li>Put <strong>2 dots on</strong> the closed line,</li>
                    <li>Put <strong>3 dots outside</strong> the closed line.</li>
                </ul>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ 
                        position: 'relative', 
                        border: `3px dashed ${isSubmitted ? (evaluateDots() ? '#2ed573' : '#ff4757') : '#dfe6e9'}`, 
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        cursor: 'crosshair',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        <svg viewBox="0 0 400 400" width="100%" height="400" onClick={handleSvgClick}>
                            {/* The closed line */}
                            <circle cx="200" cy="200" r="100" fill="transparent" stroke="#3498db" strokeWidth="20" />
                            
                            {/* Render the dots */}
                            {dots.map((d, i) => (
                                <circle key={i} cx={d.x} cy={d.y} r="12" fill="#ff4757" stroke="#fff" strokeWidth="2" />
                            ))}
                        </svg>
                        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#a4b0be', pointerEvents: 'none' }}>
                            Click to add dots ({dots.length}/6)
                        </div>
                        <button 
                            className="btn btn-secondary" 
                            style={{ position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', fontSize: '0.9rem' }}
                            onClick={(e) => { e.stopPropagation(); setDots([]); }}
                        >
                            Reset Canvas
                        </button>
                    </div>
                </div>
                {isSubmitted && (
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: evaluateDots() ? '#2ed573' : '#ff4757', fontWeight: 'bold' }}>
                        {evaluateDots() ? 'Perfect dot placement!' : 'Incorrect dot placement. Check instructions!'}
                    </div>
                )}
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Look at the picture. Use "on , under, between" to complete the sentences.</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ width: '200px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '20px', fontSize: '3rem' }}>📚</div>
                            <div style={{ width: '140px', height: '60px', borderTop: '15px solid #bdc3c7', borderLeft: '15px solid #bdc3c7', borderRight: '15px solid #bdc3c7' }}></div>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.2rem' }}>
                            Books are
                            <select name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1')} style={{ padding: '8px', width: '120px' }}>
                                <option value="">...</option><option value="on">on</option><option value="under">under</option><option value="between">between</option>
                            </select>
                            table.
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ width: '200px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10px', position: 'relative' }}>
                            <div style={{ width: '140px', height: '60px', borderTop: '15px solid #bdc3c7', borderLeft: '15px solid #bdc3c7', borderRight: '15px solid #bdc3c7', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ fontSize: '3rem', position: 'absolute', bottom: '0' }}>⚽</div>
                            </div>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.2rem' }}>
                            Football is
                            <select name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2')} style={{ padding: '8px', width: '120px' }}>
                                <option value="">...</option><option value="on">on</option><option value="under">under</option><option value="between">between</option>
                            </select>
                            table.
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ width: '350px', height: '150px', backgroundColor: '#f1f8ff', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '10px', gap: '10px' }}>
                            <div style={{ width: '100px', height: '50px', borderTop: '10px solid #bdc3c7', borderLeft: '10px solid #bdc3c7', borderRight: '10px solid #bdc3c7' }}></div>
                            <div style={{ fontSize: '4rem', lineHeight: '1', zIndex: 10 }}>🧍</div>
                            <div style={{ width: '100px', height: '50px', borderTop: '10px solid #bdc3c7', borderLeft: '10px solid #bdc3c7', borderRight: '10px solid #bdc3c7' }}></div>
                        </div>
                        <div className="math-row" style={{ fontSize: '1.2rem' }}>
                            Muneza is
                            <select name="q3_3" value={answers.q3_3} onChange={handleChange} className={getInputClass('q3_3')} style={{ padding: '8px', width: '120px' }}>
                                <option value="">...</option><option value="on">on</option><option value="under">under</option><option value="between">between</option>
                            </select>
                            tables.
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


const Primary1MathUnit14Exam = () => {
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
        q1_1: '', q1_2: '',
        q2_1: '', q2_2: '',
        q5_1: '', q5_2: ''
    });

    // 10x10 Grid for 6x6 drawing
    const [gridCells, setGridCells] = useState(Array(100).fill(false));
    
    // Mazes
    // Turtle: 1 is Square (target), 2 is Circle, 3 is Triangle, 4 is Star
    const turtleMazeData = [
        [1, 1, 1, 4, 2, 3],
        [2, 3, 1, 1, 1, 1],
        [3, 4, 2, 3, 2, 1]
    ];
    // Flat array of clicked state
    const [turtleClicks, setTurtleClicks] = useState(Array(18).fill(false));

    // Dog: 1 is Rectangle (target), 2 is Triangle, 3 is Circle
    const dogMazeData = [
        [1, 1, 2, 3, 1],
        [3, 1, 1, 1, 3],
        [2, 3, 2, 1, 1]
    ];
    const [dogClicks, setDogClicks] = useState(Array(15).fill(false));

    const correctMap = {
        q1_1: 'green',
        q1_2: ['door', 'table', 'book', 'window', 'phone', 'box'],
        q2_1: 'red',
        q2_2: 'blue',
        q5_1: ['12', '20'],
        q5_2: ['1', '12', '18', '20', '60']
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value.toLowerCase().trim() });
    };

    const toggleGridCell = (idx) => {
        if(isSubmitted) return;
        let newGrid = [...gridCells];
        newGrid[idx] = !newGrid[idx];
        setGridCells(newGrid);
    };

    const toggleTurtle = (idx) => {
        if(isSubmitted) return;
        let newT = [...turtleClicks];
        newT[idx] = !newT[idx];
        setTurtleClicks(newT);
    };

    const toggleDog = (idx) => {
        if(isSubmitted) return;
        let newD = [...dogClicks];
        newD[idx] = !newD[idx];
        setDogClicks(newD);
    };

    const validateGrid = () => {
        let totalActive = gridCells.filter(v => v).length;
        if(totalActive !== 36) return false;
        
        let minX = 10, minY = 10, maxX = -1, maxY = -1;
        
        for(let i=0; i<100; i++) {
            if(gridCells[i]) {
                let x = i % 10;
                let y = Math.floor(i / 10);
                if(x < minX) minX = x;
                if(x > maxX) maxX = x;
                if(y < minY) minY = y;
                if(y > maxY) maxY = y;
            }
        }
        
        // Exact bounds must form a 6x6 solid footprint
        if((maxX - minX) === 5 && (maxY - minY) === 5) {
            let isValid = true;
            for(let y = minY; y <= maxY; y++) {
                for(let x = minX; x <= maxX; x++) {
                    if(!gridCells[y*10 + x]) isValid = false;
                }
            }
            return isValid;
        }
        return false;
    };

    const validateMaze = (mazeData, clicks, targetVal) => {
        let flatMaze = mazeData.flat();
        for(let i=0; i<flatMaze.length; i++) {
            let isTarget = flatMaze[i] === targetVal;
            let isClicked = clicks[i];
            if(isTarget && !isClicked) return false;
            if(!isTarget && isClicked) return false;
        }
        return true;
    };

    const validateAnswers = () => {
        let results = {};
        
        results['q1_1'] = answers['q1_1'] === correctMap['q1_1'];
        results['q1_2'] = correctMap['q1_2'].includes(answers['q1_2']);
        results['q2_1'] = answers['q2_1'] === correctMap['q2_1'];
        results['q2_2'] = answers['q2_2'] === correctMap['q2_2'];
        results['q5_1'] = correctMap['q5_1'].includes(answers['q5_1']);
        results['q5_2'] = correctMap['q5_2'].includes(answers['q5_2']);

        results['q1_grid'] = validateGrid();
        results['q3_turtle'] = validateMaze(turtleMazeData, turtleClicks, 1);
        results['q4_dog'] = validateMaze(dogMazeData, dogClicks, 1);

        return results;
    };

    const submitExam = () => {
        setIsSubmitted(true);
        const results = validateAnswers();
        const total = Object.keys(results).length;
        const correct = Object.values(results).filter(v => v).length;

        const percent = (correct / total) * 100;
        setScore(percent);
        
        if (percent === 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const getInputClass = (name, multi=false) => {
        if (!isSubmitted) return 'num-box';
        let isCorrect = multi ? correctMap[name].includes(answers[name]) : answers[name] === correctMap[name];
        return `num-box ${isCorrect ? 'correct' : 'incorrect'}`;
    };

    const renderShape = (val, size='40px') => {
        if(val === 1) return <div style={{ width: size, height: size, backgroundColor: '#f1c40f', border: '2px solid #333' }}></div>; // Square/Rect
        if(val === 2) return <div style={{ width: size, height: size, borderRadius: '50%', border: '2px solid #333' }}></div>; // Circle
        if(val === 3) return <div style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '34px solid #333' }}></div>; // Triangle
        if(val === 4) return <div style={{ fontSize: '24px' }}>⭐</div>; // Star
        return null;
    };

    return (
        <div className="exam-container" style={{ paddingBottom: '3rem' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 14</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score === 100 ? 'success' : 'fail'}`}>
                    <h2 className={score === 100 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score === 100 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Flawless victory! You passed perfectly! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 100% on mazes to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card">
                <h3>1. Look at the picture. Find the right angles.</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '200px', height: '100px' }}>
                        {/* CSS Drawing of composite shape */}
                        <div style={{ position: 'absolute', left: 0, top: '25px', width: 0, height: 0, borderTop: '25px solid transparent', borderBottom: '25px solid transparent', borderRight: '40px solid #9b59b6' }}></div>
                        <div style={{ position: 'absolute', left: '40px', top: 0, width: '100px', height: '50px', backgroundColor: '#2ecc71', border: '1px solid #000' }}></div>
                        <div style={{ position: 'absolute', left: '140px', top: 0, width: 0, height: 0, borderTop: '0 solid transparent', borderBottom: '50px solid transparent', borderLeft: '40px solid #fd79a8' }}></div>
                        
                        <div style={{ position: 'absolute', left: '40px', top: '50px', width: '50px', height: '50px', backgroundColor: '#e74c3c', border: '1px solid #000' }}></div>
                        <div style={{ position: 'absolute', left: '90px', top: '50px', width: '90px', height: '50px', borderBottom: '50px solid #3498db', borderRight: '40px solid transparent', borderLeft: '0 solid transparent' }}></div>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>• Which color is representing the rectangle?
                            <select name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1')} style={{ marginLeft: '10px', padding: '5px' }}>
                                <option value="">...</option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option>
                            </select>
                        </div>
                        <div>• Give example of an object that is rectangular:
                            <select name="q1_2" value={answers.q1_2} onChange={handleChange} className={getInputClass('q1_2', true)} style={{ marginLeft: '10px', padding: '5px' }}>
                                <option value="">...</option><option value="door">Door</option><option value="ball">Ball</option><option value="wheel">Wheel</option><option value="book">Book</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>• <strong>Draw a square that has 6 small squares at each side!</strong> (Tap the grid below to fill securely)</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 30px)', gap: '1px', backgroundColor: '#bdc3c7', padding: '1px', border: `4px solid ${isSubmitted ? (validateGrid() ? '#2ecc71' : '#e74c3c') : '#34495e'}` }}>
                            {gridCells.map((active, i) => (
                                <div key={i} onClick={() => toggleGridCell(i)} style={{ width: '30px', height: '30px', backgroundColor: active ? '#f1c40f' : '#fff', cursor: 'pointer' }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>2. Look at the pictures. Answer the questions.</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#e74c3c', border: '2px solid #000' }}></div>
                        <div style={{ width: '90px', height: '50px', backgroundColor: '#3498db', border: '2px solid #000' }}></div>
                        <div style={{ width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '50px solid #2ecc71' }}></div>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>• The square is in 
                            <select name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1')} style={{ marginLeft: '10px', padding: '5px' }}>
                                <option value="">...</option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option>
                            </select> color.
                        </div>
                        <div>• The rectangle is in 
                            <select name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2')} style={{ marginLeft: '10px', padding: '5px' }}>
                                <option value="">...</option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option>
                            </select> color.
                        </div>
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>3. Follow the target shapes. Help the turtle to reach the lake</h3>
                <p style={{ color: '#747d8c', fontSize: '1.1rem' }}>Click ALL the <strong>Squares</strong> to make a path.</p>
                <div style={{ border: `3px dashed ${isSubmitted ? (validateMaze(turtleMazeData, turtleClicks, 1) ? '#2ecc71' : '#e74c3c') : '#bdc3c7'}`, padding: '1rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '3rem' }}>🐢</span>
                        <span style={{ fontSize: '3rem' }}>🌊</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                        {turtleMazeData.flat().map((val, i) => (
                            <div key={i} onClick={() => toggleTurtle(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', backgroundColor: turtleClicks[i] ? '#e1f5fe' : '#f1f2f6', border: turtleClicks[i] ? '2px solid #3498db' : '2px solid transparent', borderRadius: '8px', cursor: 'pointer' }}>
                                {renderShape(val)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>4. Follow the target shapes. Help the dog to find the bone</h3>
                <p style={{ color: '#747d8c', fontSize: '1.1rem' }}>Click ALL the <strong>Rectangles</strong> to make a path.</p>
                <div style={{ border: `3px dashed ${isSubmitted ? (validateMaze(dogMazeData, dogClicks, 1) ? '#2ecc71' : '#e74c3c') : '#bdc3c7'}`, padding: '1rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '3rem' }}>🐕</span>
                        <span style={{ fontSize: '2.5rem' }}>🦴</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {dogMazeData.flat().map((val, i) => (
                            <div key={i} onClick={() => toggleDog(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', backgroundColor: dogClicks[i] ? '#e1f5fe' : '#f1f2f6', border: dogClicks[i] ? '2px solid #3498db' : '2px solid transparent', borderRadius: '8px', cursor: 'pointer' }}>
                                {val === 1 ? <div style={{ width: '50px', height: '30px', border: '2px solid #333' }}></div> : renderShape(val)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="exam-section interactive-card">
                <h3>5. Look at the picture below. Identify the number of squares and rectangles.</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gridTemplateRows: 'repeat(4, 60px)', gap: '0', backgroundColor: '#333', border: '5px solid #ffb142', padding: '5px' }}>
                        {Array(12).fill(0).map((_, i) => (
                            <div key={i} style={{ border: '2px dashed #f1f2f6' }}></div>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div className="math-row">
                            Number of small squares: 
                            <input name="q5_1" value={answers.q5_1} onChange={handleChange} className={getInputClass('q5_1', true)} style={{ marginLeft: '10px' }} />
                        </div>
                        <div className="math-row">
                            Number of rectangles (Total valid combinations): 
                            <input name="q5_2" value={answers.q5_2} onChange={handleChange} className={getInputClass('q5_2', true)} style={{ marginLeft: '10px' }} />
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Final Answers
            </button>
        </div>
    );
};

const ComingSoon = ({ fallback }) => {
    const navigate = useNavigate();
    return (
        <div className="interactive-card text-center" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
            <i className="uil uil-hard-hat" style={{ fontSize: '5rem', color: '#6c63ff', marginBottom: '1.5rem', display: 'block' }}></i>
            <h2 className="gradient-text mb-loose">Under Construction</h2>
            <p style={{ color: 'var(--text-secondary)' }}>The assessment module for <strong>{fallback}</strong> is currently being authored by our educators.</p>
            <p>Please check back later!</p>
            <button className="btn btn-secondary mt-4 w-100" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

const Primary1EnglishUnit1Exam = () => {
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
        q1_1: '', 
        q2_1: '', 
        q2_2: '', 
        q3_1: '', 
        q3_2: '', 
        a_1: false,
        a_2: false,
        a_3: false,
        a_4: false,
        a_5: false,
        a_6: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnswers({ ...answers, [name]: type === 'checkbox' ? checked : value });
    };

    const submitExam = () => {
        setIsSubmitted(true);
        let correctAnswers = 0;
        let totalQuestions = 11; 

        if (answers.q1_1.trim() !== '') correctAnswers++;
        if (answers.q2_1.trim() !== '') correctAnswers++;
        if (answers.q2_2.trim() !== '') correctAnswers++;
        if (answers.q3_1.trim() !== '') correctAnswers++;
        if (answers.q3_2.trim() !== '') correctAnswers++;
        
        if (answers.a_1) correctAnswers++;
        if (answers.a_2) correctAnswers++;
        if (answers.a_3) correctAnswers++;
        if (answers.a_4) correctAnswers++;
        if (answers.a_5) correctAnswers++;
        if (answers.a_6) correctAnswers++;

        const percent = (correctAnswers / totalQuestions) * 100;
        setScore(percent);
        
        if (percent >= 50) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            setShowConfetti(false);
        }
    };

    const getInputClass = (name) => {
        if (!isSubmitted) return 'phrase-box';
        return `phrase-box ${answers[name].trim() !== '' ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 1</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>You scored: {score.toFixed(0)}%</h2>
                    {score >= 50 ? (
                        <p style={{ color: '#00bf8e', margin: 0 }}>Fantastic job! You passed! 🎉</p>
                    ) : (
                        <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>
                    )}
                </div>
            )}

            <div className="exam-section interactive-card" style={{ fontSize: '1.2rem' }}>
                <h3 style={{ color: '#6c63ff', marginBottom: '1rem', borderBottom: '2px solid var(--tab-border)', paddingBottom: '0.5rem' }}>1. Greeting</h3>
                <div className="math-row" style={{ justifyContent: 'flex-start', margin: '1rem 0' }}>
                    <span style={{ marginRight: '1rem' }}>Hello, how are you?</span> 
                    <input name="q1_1" value={answers.q1_1} onChange={handleChange} className={getInputClass('q1_1')} placeholder="..." style={{ flex: 1, minWidth: '200px' }} />
                </div>
            </div>

            <div className="exam-section interactive-card" style={{ fontSize: '1.2rem' }}>
                <h3 style={{ color: '#6c63ff', marginBottom: '1rem', borderBottom: '2px solid var(--tab-border)', paddingBottom: '0.5rem' }}>2. Introducing yourself</h3>
                <div className="math-row" style={{ justifyContent: 'flex-start', margin: '1rem 0', flexWrap: 'wrap' }}>
                    <span style={{ marginRight: '0.5rem' }}>Hello, my name is</span> 
                    <input name="q2_1" value={answers.q2_1} onChange={handleChange} className={getInputClass('q2_1')} placeholder="..." style={{ marginRight: '1rem', flex: 1, minWidth: '100px' }} />
                    <span style={{ marginRight: '0.5rem' }}>. I am</span>
                    <input name="q2_2" value={answers.q2_2} onChange={handleChange} className={getInputClass('q2_2')} placeholder="..." style={{ flex: 1, minWidth: '100px' }} />
                </div>
                <div style={{ margin: '1rem 0', fontWeight: 'bold' }}>
                    What is your name?
                </div>
            </div>

            <div className="exam-section interactive-card" style={{ fontSize: '1.2rem' }}>
                <h3 style={{ color: '#6c63ff', marginBottom: '1rem', borderBottom: '2px solid var(--tab-border)', paddingBottom: '0.5rem' }}>3. Introducing others</h3>
                <div className="math-row" style={{ justifyContent: 'flex-start', margin: '1rem 0' }}>
                    <span style={{ marginRight: '1rem' }}>Who is this? This is</span> 
                    <input name="q3_1" value={answers.q3_1} onChange={handleChange} className={getInputClass('q3_1')} placeholder="..." style={{ flex: 1, minWidth: '200px' }} />
                </div>
                <div className="math-row" style={{ justifyContent: 'flex-start', margin: '1rem 0' }}>
                    <span style={{ marginRight: '1rem' }}>Who is that? That is</span> 
                    <input name="q3_2" value={answers.q3_2} onChange={handleChange} className={getInputClass('q3_2')} placeholder="..." style={{ flex: 1, minWidth: '200px' }} />
                </div>
            </div>

            <div className="exam-section interactive-card" style={{ fontSize: '1.2rem' }}>
                <h3 style={{ color: '#6c63ff', marginBottom: '1rem', borderBottom: '2px solid var(--tab-border)', paddingBottom: '0.5rem' }}>4. Action game</h3>
                <p style={{ fontWeight: 'bold' }}>Listen to your teacher and do the actions. (Check to mark as done)</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', paddingLeft: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_1" checked={answers.a_1} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>1) Stand up.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_2" checked={answers.a_2} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>2) Sit down.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_3" checked={answers.a_3} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>3) Point to the window.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_4" checked={answers.a_4} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>4) Sing a song.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_5" checked={answers.a_5} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>5) Speak to your friend.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" name="a_6" checked={answers.a_6} onChange={handleChange} style={{ width: '25px', height: '25px', marginRight: '1rem' }} />
                        <span>6) Listen to me.</span>
                    </label>
                </div>
            </div>

            <button className="btn btn-primary w-100" style={{ padding: '1.2rem', fontSize: '1.2rem', marginTop: '2rem' }} onClick={submitExam}>
                Submit Answers
            </button>
        </div>
    );
};


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
        return `${baseClass} ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 2</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `num-box small ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 3</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `num-box small ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 4</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return clean === `${expectedNum} children like ${expectedWord}`;
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
        return `phrase-box ${checkAns(answers[name], expectedNum, expectedWord) ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 5</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `${baseClass} ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 6</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `${baseClass} ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 7</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `${baseClass} ${answers[name].trim().toLowerCase() === correctMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `${baseClass} ${isCorrect(name) ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">End Unit Assessment: Unit 9</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `num-box small ${answers[name].trim().toLowerCase() === fMap[name].toLowerCase() ? 'correct' : 'incorrect'}`;
    };

    const getSubjectiveClass = (name, baseClass = 'phrase-box') => {
        if (!isSubmitted) return baseClass;
        return `${baseClass} ${answers[name].trim().length > 0 ? 'correct' : 'incorrect'}`;
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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



const Primary1KinyarwandaUnit1Exam = () => {
    const [score, setScore] = useState(null);
    const [, setIsSubmitted] = useState(false);
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
        return `phrase-box ${isCorrect ? 'correct' : 'incorrect'}`;
    };

    return (
        <div className="exam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }} />}
            <h1 className="exam-title gradient-text text-center mb-loose">Isuzuma risoza umutwe wa kabiri</h1>

            {score !== null && (
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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




const DrawingPad = () => {
    const canvasRef = React.useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        // Initialize canvas context style
        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        if(e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault(); // prevent scrolling while drawing on touch
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        if(e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#6A5ACD', marginBottom: '0.5rem' }}><i className="uil uil-pen"></i> Scratchpad: Draw your Venn Diagram</p>
            <div style={{ border: '3px dashed #cbd5e1', borderRadius: '10px', background: '#f8fafc', overflow: 'hidden' }}>
                <canvas 
                    ref={canvasRef}
                    width={400}
                    height={250}
                    style={{ display: 'block', touchAction: 'none', cursor: 'crosshair' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
            <button className="btn btn-outline small-btn" onClick={clearCanvas} style={{ marginTop: '0.8rem' }}>Clear Drawing</button>
        </div>
    );
};

const VennDiagramQ7 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', marginBottom: '0.5rem' }}>Fig. 1.11</p>
            <svg width="350" height="180" viewBox="0 0 350 180" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                <rect x="10" y="10" width="330" height="160" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
                <circle cx="130" cy="90" r="60" fill="rgba(100, 149, 237, 0.2)" stroke="#1e293b" strokeWidth="2" />
                <circle cx="220" cy="90" r="60" fill="rgba(255, 127, 80, 0.2)" stroke="#1e293b" strokeWidth="2" />
                <text x="60" y="45" fontSize="20" fill="#0f172a" fontWeight="bold">A</text>
                <text x="280" y="45" fontSize="20" fill="#0f172a" fontWeight="bold">B</text>
                <text x="170" y="96" fontSize="22" fill="#0f172a" fontStyle="italic" fontWeight="bold">x</text>
            </svg>
        </div>
    );
};

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
            text: "1. The following facts were discovered in a survey of course preferences of 110 pupils in senior six: 21 like engineering only, 63 like engineering, 55 like medicine and 34 like none of the two courses.\n(a) Draw a Venn diagram representing this information.\n(b) (i) How many like Engineering or Medicine?\n    (ii) How many like Engineering and Medicine?\n    (iii) How many like only Medicine?",
            options: [
                '(i) 76, (ii) 42, (iii) 13',
                '(i) 42, (ii) 76, (iii) 13',
                '(i) 76, (ii) 13, (iii) 42',
                '(i) 110, (ii) 21, (iii) 55'
            ],
            correct: '(i) 76, (ii) 42, (iii) 13'
        },
        {
            id: 'q2',
            text: "2. A survey was carried out in a shop to find out the number of customers who bought bread or milk or both or neither. Out of a total of 79 customers for the day, 52 bought milk, 32 bought bread and 15 bought neither.\n(a) Draw a Venn diagram to show this information and use it to find out:\n(b) (i) How many bought bread and milk.\n    (ii) How many bought bread only.\n    (iii) How many bought milk only.",
            options: [
                '(i) 20, (ii) 12, (iii) 32',
                '(i) 12, (ii) 20, (iii) 32',
                '(i) 20, (ii) 32, (iii) 12',
                '(i) 15, (ii) 32, (iii) 52'
            ],
            correct: '(i) 20, (ii) 12, (iii) 32'
        },
        {
            id: 'q3',
            text: "3. Five members of Mathematics club conducted a survey among 150 students of Senior 3 about which careers they wish to join among Engineering and Medical related courses. 83 want to join Engineering, 58 want to join medical related courses. 36 do not want to join any of the careers.\nRepresent the data on the Venn diagram. Find the number of students who wish to join both careers.",
            options: ['27', '36', '83', '58'],
            correct: '27'
        },
        {
            id: 'q4',
            text: "4. A survey was done on 50 people about which hotels they eat from among H, S and L. 15 people eat at hotel H, 30 people eat at hotel S, 19 people eat at hotel L, 8 people eat at hotels H and S, 12 people eat at hotels H and L, 7 people eat at hotels S and L. 5 people eat at hotels H, S and L.\n(a) How many people eat only at Hotel H?\n(b) How many people eat at hotels H and S, but not at L?\n(c) How many people don't eat at any of these three hotels?",
            options: [
                '(a) 0, (b) 3, (c) 8',
                '(a) 15, (b) 8, (c) 5',
                '(a) 0, (b) 8, (c) 3',
                '(a) 3, (b) 0, (c) 8'
            ],
            correct: '(a) 0, (b) 3, (c) 8'
        },
        {
            id: 'q5',
            text: "5. A survey involving 50 students was carried out and research revealed that 21 of them like Kiswahili (K) while 32 of them like Mathematics (M).\n(a) Represent the information in the Venn diagram.\n(b) How many students like only one subject?",
            options: ['47', '3', '18', '29'],
            correct: '47'
        },
        {
            id: 'q6',
            text: "6. A group of 50 people were asked about the sections they read very keenly in a newspaper among politics, advertisements and sports. The results showed that 25 read politics, 16 read advertisement, 14 read sports. 5 read both politics and advertisement, 4 read both advertisement and sports, 6 read both politics and sports, and 2 read all the three sections.\n(a) Represent the data on the Venn diagram.\n(b) Find the number of people who read;\n    (i) At least one of the three sections.\n    (ii) Only one of the three sections.\n    (iii) Only politics.",
            options: [
                '(i) 42, (ii) 31, (iii) 16',
                '(i) 42, (ii) 16, (iii) 31',
                '(i) 50, (ii) 31, (iii) 25',
                '(i) 31, (ii) 42, (iii) 16'
            ],
            correct: '(i) 42, (ii) 31, (iii) 16'
        },
        {
            id: 'q7',
            text: "7. Given that, n(A∪B) = 29, n(A) = 21, n(B) = 17, n(A∩B) = x.\n(a) Write down in terms of the elements of each part.\n(b) Form an equation and hence find the value of x.",
            options: ['x = 9', 'x = 29', 'x = 38', 'x = 4'],
            correct: 'x = 9'
        },
        {
            id: 'q8',
            text: "8. A survey was conducted in a school for students taking Mathematics, Physics and Chemistry. In a group of 60 students, 7 take all the subjects, 9 take Physics and Chemistry only, 8 take Physics and Mathematics, 5 take Mathematics and Chemistry only. 11 students take Mathematics only, 2 take Physics only and 15 students take Chemistry only.\n(a) Draw a Venn diagram for the information above.\n(b) Find the number of those who do not take any of the subjects.\n(c) Find the number of students who take Mathematics.",
            options: [
                '(b) 10, (c) 24',
                '(b) 24, (c) 10',
                '(b) 7, (c) 11',
                '(b) 10, (c) 35'
            ],
            correct: '(b) 10, (c) 24'
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
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
                                {idx + 1}. {q.text.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                            
                            </h3>
                            {['q1', 'q2', 'q3', 'q5', 'q6', 'q8'].includes(q.id) && <DrawingPad id={q.id} />}
                            {q.id === 'q7' && <VennDiagramQ7 />}
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
            <style>{ `
                .correct-box { border: 2px solid #2ECC71 !important; background-color: rgba(46, 204, 113, 0.05); }
                .incorrect-box { border: 2px solid #E74C3C !important; background-color: rgba(231, 76, 60, 0.05); }
            `}</style>
        </div>
    );
};



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
            text: "2. (a) Express 101_eight in base 2.\n(b) Calculate 110_two × 1010_two giving your answer in base two and also in base ten.",
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
            text: "5. Write each of the numbers as a mixed number in the given base:\n(a) 101.11_ten\n(b) 21.01_five",
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
            text: "7. In a binary addition, t and r stands for a particular digit i.e 0 or 1. Find t and r to complete the addition:\n    1trrt\n + 1trr\n-----------\n  100001",
            options: ['t=0, r=1', 't=1, r=0', 't=1, r=1', 't=0, r=0'],
            correct: 't=0, r=1'
        },
        {
            id: 'q8',
            text: "8. Carry out the following in base six:\n(a) 115_six + 251_six + 251_six\n(b) 53412_six - 34125_six\n(c) 123_six × 54_six",
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Excellent work! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section">
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) {
                        const isCorrect = answers[q.id] === q.correct;
                        containerClass += isCorrect ? " correct-box" : " incorrect-box";
                    }

                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            <style>{ `
                .correct-box { border: 2px solid #2ECC71 !important; background-color: rgba(46, 204, 113, 0.05); }
                .incorrect-box { border: 2px solid #E74C3C !important; background-color: rgba(231, 76, 60, 0.05); }
            `}</style>
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
            text: "1. Simplify each of the following algebraic fractions by expressing them as single fractions in their lowest terms:\n(a) a/3 + a/4 + a/5\n(b) x/2 + x/3 + x/4\n(c) 1 + (x+2)/3\n(d) x/3 + (2x-1)/4",
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
            text: "2. Simplify each of the following algebraic fractions:\n(a) 3a/4 - a/5\n(b) x/2 - (y-4)/3\n(c) 4x/3y - 2x/5y\n(d) (x-3)/4 - x/3",
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
            text: "3. Multiply and simplify:\n(a) (8x / xy) × (2x / 4x)\n(b) (ab² / bc²) ÷ (a² / 3bc³)",
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
            text: "4. Solve the following equations:\n(a) m/3 + m/5 = 2\n(b) (3x+2)/(3x+4) = (x-1)/(x+1)",
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
            text: "5. Simplify the expression and find restrictions:\n(a) ((x+1)/(x²-1)) ÷ (3x/(x-1))",
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
                <div className={`exam-result interactive-card ${score >= 50 ? 'success' : 'fail'}`}>
                    <h2 className={score >= 50 ? "gradient-text" : ""}>Score: {score.toFixed(0)}%</h2>
                    {score >= 50 ? <p style={{ color: '#00bf8e', margin: 0 }}>Excellent work! You passed! 🎉</p> : <p style={{ color: '#ff4c60', margin: 0 }}>Keep practicing! You need 50% to pass. 💪</p>}
                </div>
            )}

            <div className="exam-section">
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) {
                        const isCorrect = answers[q.id] === q.correct;
                        containerClass += isCorrect ? " correct-box" : " incorrect-box";
                    }

                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            <style>{ `
                .correct-box { border: 2px solid #2ECC71 !important; background-color: rgba(46, 204, 113, 0.05); }
                .incorrect-box { border: 2px solid #E74C3C !important; background-color: rgba(231, 76, 60, 0.05); }
            `}</style>
        </div>
    );
};



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
            text: "1. For which simultaneous equations is the ordered pair (3, -2) a solution?\n(a) x + y = 1 and x - y = 5\n(b) 3x = 5 - 2y and x + y = 1",
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
            text: "3. Solve the following equations:\n(a) x + 2y = 15; 2x - y = 0\n(b) 2x = y - 5; y = x - 3",
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            text: "6. Solve the following quadratic equations by synthetic division method or factorization:\n(a) x² + x - 12 = 0\n(b) x² + 9x + 14 = 0",
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            text: "2. Consider the function f(x) = 2(x - 3)(x + 1).\n(a) Is the curve opening up or opening down?\n(b) What are the x-intercepts?",
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
            text: "4. (a) Is the point (-1, -4) on the line y = 3x - 1?\n(b) Find the equation of the line that is parallel to x + 2y + 8 = 0 and passes through (-2, -3).",
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            text: "4. A sum of money is invested at compound interest and it amounts to 420 FRW at the end of the first year and 441 FRW at the end of the second year. Determine:\n(a) the rate in percent\n(b) the sum of money invested.",
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
            text: "1. Data below was collected from a certain supermarket in Kigali City.\nCommodity prices (May 2016): A=12, B=15, C=30, D=21, E=9, F=27.\nCalculate the average price for all commodities in May 2016.",
            options: ['19 FRW', '18 FRW', '20 FRW', '21 FRW'],
            correct: '19 FRW' // 114 / 6 = 19
        },
        {
            id: 'u13_q2',
            text: "2. Commodity prices (June 2016): A=18, B=24, C=36, D=42, E=18, F=36.\nCalculate the average price for all commodities in June 2016.",
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
                {questions.map((q) => {
                    let containerClass = "interactive-card mb-4";
                    if (isSubmitted) { containerClass += answers[q.id] === q.correct ? " correct-box" : " incorrect-box"; }
                    return (
                        <div key={q.id} className={containerClass} style={{ padding: '1.5rem', borderRadius: '10px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                                {q.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
const Assessment = () => {
    const [searchParams] = useSearchParams();
    const level = searchParams.get('level') || 'Unknown Level';
    const subject = searchParams.get('subject') || 'Unknown Subject';
    const unit = searchParams.get('unit') || 'Unknown Unit';

    const isPrimary1MathUnit1 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 1");
    const isPrimary1MathUnit2 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 2");
    const isPrimary1MathUnit3 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 3");
    const isPrimary1MathUnit4 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 4");
    const isPrimary1MathUnit5 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 5");
    const isPrimary1MathUnit6 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 6");
    const isPrimary1MathUnit7 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 7");
    const isPrimary1MathUnit8 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 8");
    const isPrimary1MathUnit9 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 9");
    const isPrimary1MathUnit10 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 10");
    const isPrimary1MathUnit11 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 11");
    const isPrimary1MathUnit12 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 12");
    const isPrimary1MathUnit13 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 13");
    const isPrimary1MathUnit14 = level === "Primary 1" && subject === "Mathematics" && unit.includes("UNIT 14");

    const isPrimary1EnglishUnit1 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 1");
    const isPrimary1EnglishUnit2 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 2");
    const isPrimary1EnglishUnit3 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 3");
    const isPrimary1EnglishUnit4 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 4");
    const isPrimary1EnglishUnit5 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 5");
    const isPrimary1EnglishUnit6 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 6");
    const isPrimary1EnglishUnit7 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 7");
    const isPrimary1EnglishUnit8 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 8");
    const isPrimary1EnglishUnit9 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 9");
    const isPrimary1EnglishUnit10 = level === "Primary 1" && subject === "English" && unit.includes("UNIT 10");
    const isPrimary1KinyarwandaUnit1 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("ambere");
    const isPrimary1KinyarwandaUnit2 = level === "Primary 1" && subject === "Kinyarwanda" && unit.includes("kabiri");
    const isSenior3MathUnit1 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 1");
    const isSenior3MathUnit2 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 2");
    const isSenior3MathUnit3 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 3");
    const isSenior3MathUnit4 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 4");
    const isSenior3MathUnit5 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 5");
    const isSenior3MathUnit6 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 6");
    const isSenior3MathUnit7 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 7");
    const isSenior3MathUnit8 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 8");
    const isSenior3MathUnit9 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 9");
    const isSenior3MathUnit10 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 10");
    const isSenior3MathUnit11 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 11");
    const isSenior3MathUnit12 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 12");
    const isSenior3MathUnit13 = level === "Senior 3" && subject === "Mathematics" && unit.includes("UNIT 13");

    let CurrentExam = null;
    if (isPrimary1MathUnit1) CurrentExam = Primary1MathUnit1Exam;
    if (isPrimary1MathUnit2) CurrentExam = Primary1MathUnit2Exam;
    if (isPrimary1MathUnit3) CurrentExam = Primary1MathUnit3Exam;
    if (isPrimary1MathUnit4) CurrentExam = Primary1MathUnit4Exam;
    if (isPrimary1MathUnit5) CurrentExam = Primary1MathUnit5Exam;
    if (isPrimary1MathUnit6) CurrentExam = Primary1MathUnit6Exam;
    if (isPrimary1MathUnit7) CurrentExam = Primary1MathUnit7Exam;
    if (isPrimary1MathUnit8) CurrentExam = Primary1MathUnit8Exam;
    if (isPrimary1MathUnit9) CurrentExam = Primary1MathUnit9Exam;
    if (isPrimary1MathUnit10) CurrentExam = Primary1MathUnit10Exam;
    if (isPrimary1MathUnit11) CurrentExam = Primary1MathUnit11Exam;
    if (isPrimary1MathUnit12) CurrentExam = Primary1MathUnit12Exam;
    if (isPrimary1MathUnit13) CurrentExam = Primary1MathUnit13Exam;
    if (isPrimary1MathUnit14) CurrentExam = Primary1MathUnit14Exam;

    if (isPrimary1EnglishUnit1) CurrentExam = Primary1EnglishUnit1Exam;
    if (isPrimary1EnglishUnit2) CurrentExam = Primary1EnglishUnit2Exam;
    if (isPrimary1EnglishUnit3) CurrentExam = Primary1EnglishUnit3Exam;
    if (isPrimary1EnglishUnit4) CurrentExam = Primary1EnglishUnit4Exam;
    if (isPrimary1EnglishUnit5) CurrentExam = Primary1EnglishUnit5Exam;
    if (isPrimary1EnglishUnit6) CurrentExam = Primary1EnglishUnit6Exam;
    if (isPrimary1EnglishUnit7) CurrentExam = Primary1EnglishUnit7Exam;
    if (isPrimary1EnglishUnit8) CurrentExam = Primary1EnglishUnit8Exam;
    if (isPrimary1EnglishUnit9) CurrentExam = Primary1EnglishUnit9Exam;
    if (isPrimary1EnglishUnit10) CurrentExam = Primary1EnglishUnit10Exam;
    if (isPrimary1KinyarwandaUnit1) CurrentExam = Primary1KinyarwandaUnit1Exam;
    if (isPrimary1KinyarwandaUnit2) CurrentExam = Primary1KinyarwandaUnit2Exam;
    if (isSenior3MathUnit1) CurrentExam = Senior3MathUnit1Exam;
    if (isSenior3MathUnit2) CurrentExam = Senior3MathUnit2Exam;
    if (isSenior3MathUnit3) CurrentExam = Senior3MathUnit3Exam;
    if (isSenior3MathUnit4) CurrentExam = Senior3MathUnit4Exam;
    if (isSenior3MathUnit5) CurrentExam = Senior3MathUnit5Exam;
    if (isSenior3MathUnit6) CurrentExam = Senior3MathUnit6Exam;
    if (isSenior3MathUnit7) CurrentExam = Senior3MathUnit7Exam;
    if (isSenior3MathUnit8) CurrentExam = Senior3MathUnit8Exam;
    if (isSenior3MathUnit9) CurrentExam = Senior3MathUnit9Exam;
    if (isSenior3MathUnit10) CurrentExam = Senior3MathUnit10Exam;
    if (isSenior3MathUnit11) CurrentExam = Senior3MathUnit11Exam;
    if (isSenior3MathUnit12) CurrentExam = Senior3MathUnit12Exam;
    if (isSenior3MathUnit13) CurrentExam = Senior3MathUnit13Exam;

    return (
        <div className="assessment-page">
            <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', paddingTop: '100px', paddingBottom: '100px' }}>
                {CurrentExam ? <CurrentExam /> : <ComingSoon fallback={`${level} - ${subject} - ${unit}`} />}
            </div>
        </div>
    );
};

export default Assessment;
