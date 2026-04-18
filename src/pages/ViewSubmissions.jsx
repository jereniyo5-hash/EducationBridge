import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ViewSubmissions.css';

const ViewSubmissions = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const examId = searchParams.get('examId');

    const [submissions, setSubmissions] = useState([]);
    const [examDetails, setExamDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSub, setSelectedSub] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }

        const fetchSubmissions = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // Fetch exam details first
                const exRes = await fetch(`${API_URL}/api/exams`);
                const exData = await exRes.json();
                if (exData.exams) {
                    const found = exData.exams.find(e => e.id.toString() === examId);
                    if (found) setExamDetails(found);
                }

                // Fetch submissions
                const subRes = await fetch(`${API_URL}/api/submissions/${examId}`);
                const subData = await subRes.json();
                if (subData.submissions) {
                    setSubmissions(subData.submissions);
                }
            } catch(e) {
                console.error(e);
                setError('Failed to load submissions.');
            } finally {
                setLoading(false);
            }
        };

        if (examId) fetchSubmissions();
    }, [examId, navigate]);

    if (loading) return <div style={{display:'flex', justifyContent:'center', padding:'50px'}}><h2>Loading Submissions...</h2></div>;
    
    if (error) return <div style={{textAlign:'center', color:'red', padding:'20px'}}>{error}</div>;

    return (
        <section className="submissions-container">
            <div className="container">
                <div className="sub-header">
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        <i className="uil uil-arrow-left"></i> Back to My Exams
                    </button>
                    <h2>Submissions for {examDetails?.subject_name}</h2>
                    <p>Level: {examDetails?.year_level} | Total Submitted: {submissions.length}</p>
                </div>

                <div className="sub-grid">
                    <div className="sub-list interactive-card">
                        <h3>Students</h3>
                        {submissions.length === 0 ? (
                            <p style={{color: '#888', marginTop: '15px'}}>No students have submitted this exam yet.</p>
                        ) : (
                            <ul>
                                {submissions.map(sub => (
                                    <li 
                                        key={sub.id} 
                                        className={selectedSub?.id === sub.id ? 'active-sub' : ''}
                                        onClick={() => setSelectedSub(sub)}
                                    >
                                        <div className="sub-name">{sub.student_name}</div>
                                        <div className="sub-time">{new Date(sub.submitted_at).toLocaleString()}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div className="sub-detail interactive-card">
                        {selectedSub ? (
                            <>
                                <h3>Answers from {selectedSub.student_name}</h3>
                                <div className="answers-display">
                                    {selectedSub.answers_text ? selectedSub.answers_text : <em style={{color:'#999'}}>No answers typed.</em>}
                                </div>
                            </>
                        ) : (
                            <div className="empty-selection">
                                <i className="uil uil-file-bookmark-alt"></i>
                                <p>Select a student from the left to read their answers.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewSubmissions;
