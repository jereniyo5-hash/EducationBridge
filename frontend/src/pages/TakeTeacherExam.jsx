import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './TakeTeacherExam.css';

const TakeTeacherExam = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const examId = searchParams.get('examId');
    
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState('');

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/exams`);
                const data = await response.json();
                if (data.exams) {
                    const foundExam = data.exams.find(e => e.id.toString() === examId);
                    if (foundExam) {
                        setExam(foundExam);
                        setTimeLeft(foundExam.time_limit * 60); // minutes to seconds
                        
                        // Check attempts
                        if (foundExam.attempts_allowed === 'once') {
                            const hasAttempted = localStorage.getItem(`attempt_finished_${foundExam.id}`);
                            if (hasAttempted) {
                                setError('You have already completed this exam and are not allowed to take it again.');
                                setLoading(false);
                                return;
                            }
                        }
                    } else {
                        setError('Exam not found.');
                    }
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load exam details.');
            }
            setLoading(false);
        };
        
        if (examId) {
            fetchExam();
        } else {
            navigate('/subject');
        }
    }, [examId, navigate]);

    useEffect(() => {
        let timer;
        if (isStarted && timeLeft > 0 && !isFinished) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isStarted) {
            finishExam();
        }
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStarted, timeLeft, isFinished]);

    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    useEffect(() => {
        if (!isStarted || isFinished || !exam) return;
        
        let objectUrl;
        const fetchPdf = async () => {
             const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
             const url = `${API_URL}${exam.file_url}`;
             try {
                  const res = await fetch(url);
                  const blob = await res.blob();
                  objectUrl = URL.createObjectURL(blob);
                  setPdfBlobUrl(objectUrl);
             } catch(err) {
                 console.error("Failed to fetch PDF blob:", err);
             }
        };
        fetchPdf();

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [isStarted, isFinished, exam]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startExam = () => {
        setIsStarted(true);
        if (exam.attempts_allowed === 'once') {
            localStorage.setItem(`attempt_started_${exam.id}`, 'true');
        }
    };

    async function finishExam() {
        setIsFinished(true);
        if (exam.attempts_allowed === 'once') {
            localStorage.setItem(`attempt_finished_${exam.id}`, 'true');
        }

        try {
             const userStr = localStorage.getItem('user');
             if (!userStr) return;
             const parsedUser = JSON.parse(userStr);

             const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
             await fetch(`${API_URL}/api/exams/submit`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                     exam_id: exam.id,
                     student_id: parsedUser.id,
                     student_name: parsedUser.full_name || parsedUser.username,
                     answers_text: answers
                 })
             });
        } catch(e) {
             console.error("Failed to submit answers:", e);
        }
    };

    if (loading) return <div className="exam-loading">Loading Exam...</div>;

    if (error) return (
        <div className="exam-error-container">
            <div className="interactive-card error-card">
                <i className="uil uil-exclamation-circle"></i>
                <h2>Cannot Access Exam</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => navigate('/subject')}>Return to Subjects</button>
            </div>
        </div>
    );

    if (!exam) return null;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    return (
        <div className="take-exam-wrapper">
            <div className="exam-top-bar">
                <div className="exam-info">
                    <h2>{exam.subject_name} ({exam.year_level})</h2>
                    <span className="prepared-by">Prepared by: {exam.teacher_name}</span>
                </div>
                
                {isStarted && !isFinished && (
                    <div className={`timer-display ${timeLeft < 300 ? 'timer-danger' : ''}`}>
                        <i className="uil uil-clock"></i>
                        {formatTime(timeLeft)}
                    </div>
                )}
                
                {!isStarted && !isFinished && (
                    <button className="btn btn-primary start-exam-btn" onClick={startExam}>
                        Start Exam ({exam.time_limit} mins)
                    </button>
                )}

                {isStarted && !isFinished && (
                    <button className="btn btn-danger finish-btn" onClick={finishExam}>
                        Submit / Finish
                    </button>
                )}

                {isFinished && (
                    <div className="finished-badge">
                        <i className="uil uil-check-circle"></i> Exam Finished
                    </div>
                )}
            </div>

            <div className="exam-content-split">
                <div className="pdf-viewer-container">
                    {!isStarted && !isFinished ? (
                        <div className="exam-placeholder">
                            <i className="uil uil-file-lock-alt"></i>
                            <h3>Exam is locked</h3>
                            <p>Click "Start Exam" to begin your timer and reveal the paper.</p>
                            <p className="attempts-notice">
                                Note: You are allowed to take this exam {exam.attempts_allowed === 'once' ? <strong>only once</strong> : <strong>multiple times</strong>}.
                            </p>
                        </div>
                    ) : isFinished ? (
                        <div className="exam-placeholder finished-state">
                            <i className="uil uil-file-check-alt"></i>
                            <h3>Exam Session Completed</h3>
                            <p>Your time has ended and answers have been submitted securely.</p>
                            <button className="btn btn-secondary mt-3" onClick={() => navigate('/subject')}>Return to Subjects</button>
                        </div>
                    ) : pdfBlobUrl ? (
                        <embed
                            src={`${pdfBlobUrl}#toolbar=0&view=FitH`} 
                            type="application/pdf"
                            className="pdf-iframe"
                        />
                    ) : (
                        <div className="exam-loading">Loading Exam Paper...</div>
                    )}
                </div>

                {(isStarted || isFinished) && (
                    <div className="exam-answer-pad">
                        <h3><i className="uil uil-edit"></i> Type Your Answers</h3>
                        <p className="pad-subtitle">Make sure to properly number your answers.</p>
                        <textarea 
                            className="answer-textarea"
                            value={answers}
                            onChange={(e) => setAnswers(e.target.value)}
                            placeholder="Example:&#10;1) A&#10;2) Because x = 5...&#10;&#10;Type here..."
                            disabled={isFinished}
                        ></textarea>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TakeTeacherExam;
