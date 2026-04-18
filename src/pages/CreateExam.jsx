import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import './CreateExam.css';

const CreateExam = () => {
    const navigate = useNavigate();
    const [levelKeys] = useState(Object.keys(LEVELS));
    const [selectedLevel, setSelectedLevel] = useState(levelKeys[0]);
    const [selectedSubject, setSelectedSubject] = useState(LEVELS[levelKeys[0]].subjects[0] || '');
    const [timeLimit, setTimeLimit] = useState(60);
    const [attempts, setAttempts] = useState('once');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [user, setUser] = useState(null);
    const [myExams, setMyExams] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchMyExams = async (userId) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/exams`);
            const data = await response.json();
            if (data.exams) {
                setMyExams(data.exams.filter(e => e.teacher_id === userId));
            }
        } catch (error) {
            console.error('Error fetching my exams:', error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role?.toLowerCase() !== 'teacher') {
                navigate('/subject'); // Redirect if not a teacher
            } else {
                setUser(parsedUser);
                fetchMyExams(parsedUser.id);
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (LEVELS[selectedLevel] && LEVELS[selectedLevel].subjects.length > 0) {
            setSelectedSubject(LEVELS[selectedLevel].subjects[0]);
        }
    }, [selectedLevel]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!editId && !file) {
            setMessage({ type: 'error', text: 'Please select a PDF file.' });
            return;
        }

        if (file && file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Please upload a valid PDF file.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('teacher_id', user.id);
        formData.append('teacher_name', user.full_name || user.username);
        formData.append('year_level', selectedLevel);
        formData.append('subject_name', selectedSubject);
        formData.append('time_limit', timeLimit);
        formData.append('attempts_allowed', attempts);
        if (file) {
            formData.append('examFile', file);
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = editId ? `${API_URL}/api/exams/${editId}` : `${API_URL}/api/exams/upload`;
            const method = editId ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: editId ? 'Exam updated successfully!' : 'Exam uploaded successfully!' });
                setFile(null);
                setEditId(null);
                if (!editId) e.target.reset();
                fetchMyExams(user.id);
            } else {
                setMessage({ type: 'error', text: data.error || `Failed to ${editId ? 'update' : 'upload'} exam.` });
            }
        } catch (error) {
            console.error('Error saving exam:', error);
            setMessage({ type: 'error', text: 'Server connection error.' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (exam) => {
        setEditId(exam.id);
        setSelectedLevel(exam.year_level);
        setSelectedSubject(exam.subject_name);
        setTimeLimit(exam.time_limit);
        setAttempts(exam.attempts_allowed);
        setFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMessage({ type: 'success', text: `Editing mode active for exam ID ${exam.id}.` });
    };

    const handleDelete = async (examId) => {
        if (!window.confirm("Are you sure you want to permanently delete this exam?")) return;
        
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/exams/${examId}?teacher_id=${user.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMyExams(prev => prev.filter(e => e.id !== examId));
                if (editId === examId) {
                    setEditId(null);
                    setMessage({ type: '', text: '' });
                }
            } else {
                alert("Failed to delete the exam.");
            }
        } catch (error) {
            console.error('Error deleting:', error);
            alert("Error connecting to server.");
        }
    };

    if (!user) return null;

    return (
        <section className="create-exam-container">
            <div className="container">
                <div className="exam-header">
                    <h2 className="gradient-text">{editId ? 'Edit Exam' : 'Create New Exam'}</h2>
                    <p className="subtitle">{editId ? 'Update your existing exam materials' : 'Upload your exam materials for students'}</p>
                </div>

                <div className="exam-form-wrapper">
                    {message.text && (
                         <div className={`alert alert-${message.type}`}>
                             {message.text}
                         </div>
                    )}
                    <form className="exam-form interactive-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Year / Level</label>
                            <select 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                required
                            >
                                {levelKeys.map(key => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <select 
                                value={selectedSubject} 
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                required
                            >
                                {LEVELS[selectedLevel]?.subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Time Limit (minutes)</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="300"
                                    value={timeLimit} 
                                    onChange={(e) => setTimeLimit(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Attempts Allowed</label>
                                <select 
                                    value={attempts} 
                                    onChange={(e) => setAttempts(e.target.value)}
                                    required
                                >
                                    <option value="once">Only Once</option>
                                    <option value="multiple">Multiple Times</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Upload Exam PDF</label>
                            <div className="file-upload-box">
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleFileChange}
                                    id="examFile"
                                    required={!editId}
                                />
                                <label htmlFor="examFile" className="file-label">
                                    <i className="uil uil-cloud-upload"></i>
                                    {file ? file.name : "Click to select a PDF file"}
                                </label>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`btn btn-primary submit-btn ${loading ? 'btn-loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (editId ? 'Save Changes' : 'Publish Exam')}
                        </button>
                        {editId && (
                            <button type="button" className="btn btn-secondary submit-btn mt-2" onClick={() => {
                                setEditId(null);
                                setFile(null);
                                setMessage({ type: '', text: '' });
                            }}>Cancel Edit</button>
                        )}
                    </form>
                </div>

                {myExams.length > 0 && (
                    <div className="my-exams-container" style={{ marginTop: '50px' }}>
                        <h3 className="gradient-text text-center underline-mb">My Created Exams</h3>
                        <div className="subjects-grid">
                            {myExams.map(exam => (
                                <article className="subject-card interactive-card" key={exam.id} style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
                                    <div className="subject-card-info" style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{exam.subject_name}</h4>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Level: {exam.year_level}</p>
                                        <div style={{ display: 'flex', gap: '5px', fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
                                            <span><i className="uil uil-clock"></i> {exam.time_limit} m</span>
                                            <span>| <i className="uil uil-redo"></i> {exam.attempts_allowed === 'once' ? '1 Attempt' : 'Multiple'}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className="btn btn-primary small-btn" onClick={() => handleEdit(exam)} style={{ flex: 1 }}>
                                            <i className="uil uil-edit"></i> Edit
                                        </button>
                                        <button 
                                            className="btn btn-secondary small-btn" 
                                            onClick={() => navigate(`/submissions?examId=${exam.id}`)} 
                                            style={{ flex: 1, backgroundColor: '#2ecc71', color: '#fff', border: 'none' }}
                                        >
                                            <i className="uil uil-file-check-alt"></i> Answers
                                        </button>
                                        <button className="btn btn-danger small-btn" style={{ flex: 1, backgroundColor: '#e74c3c' }} onClick={() => handleDelete(exam.id)}>
                                            <i className="uil uil-trash-alt"></i> Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CreateExam;
