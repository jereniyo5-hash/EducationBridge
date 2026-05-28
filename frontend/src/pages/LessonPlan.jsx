import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { LESSON_PLANS, DOCUMENT_TYPES } from '../data/lessonPlans';
import PdfViewer from '../components/PdfViewer';
import './LessonPlan.css';

const ALL_LEVELS = [
    "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6",
    "Senior 1", "Senior 2", "Senior 3", "Senior 4", "Senior 5", "Senior 6"
];

const getResponsivePdfUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    if (url.includes('elearning.reb.rw')) {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        return `${API_URL}/api/proxy-pdf?url=${encodeURIComponent(url)}`;
    }
    return url;
};

const LessonPlan = () => {
    const [searchParams] = useSearchParams();
    const levelKeys = Object.keys(LESSON_PLANS);
    const [activeLevel, setActiveLevel] = useState(searchParams.get("level") || levelKeys[0]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);

    // AI Generator state
    const [aiLevel, setAiLevel] = useState('Primary 1');
    const [aiSubject, setAiSubject] = useState('');
    const [aiTopic, setAiTopic] = useState('');
    const [generating, setGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState('');

    const getSubjectsForLevel = (level) => {
        const subjects = LEVELS[level]?.subjects;
        if (subjects) return subjects;
        const lp = LESSON_PLANS[level];
        return lp ? Object.keys(lp) : [];
    };

    useEffect(() => {
        const subjects = getSubjectsForLevel(aiLevel);
        if (subjects.length > 0 && !subjects.includes(aiSubject)) {
            setAiSubject(subjects[0]);
        }
    }, [aiLevel]);

    useEffect(() => {
        const preloadPdf = async () => {
            try {
                await import('../components/PdfViewer');
                const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href;
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'prefetch';
                preloadLink.as = 'script';
                preloadLink.href = workerUrl;
                document.head.appendChild(preloadLink);
            } catch (_) { /* ignore */ }
        };
        preloadPdf();
    }, []);

    useEffect(() => {
        if (selectedPdf) {
            const timer = setTimeout(() => setPdfLoading(false), 600);
            return () => clearTimeout(timer);
        } else {
            setPdfLoading(false);
        }
    }, [selectedPdf]);

    const prefetchPdf = useCallback((url) => {
        if (!url) return;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = getResponsivePdfUrl(url);
        document.head.appendChild(link);
    }, []);

    const handleGenerate = async () => {
        if (!aiSubject || !aiTopic.trim()) return;
        setGenerating(true);
        setGeneratedPlan('');

        const prompt = `Create a detailed lesson plan for ${aiLevel} ${aiSubject} on the topic: "${aiTopic}". 
Include the following sections:
1. Lesson Title
2. Grade Level: ${aiLevel}
3. Subject: ${aiSubject}
4. Duration (recommended class period)
5. Learning Objectives (3-5 specific, measurable objectives)
6. Materials Needed
7. Lesson Outline (Introduction, Development, Conclusion)
8. Assessment/Evaluation
9. Differentiation (how to adapt for different learners)
10. Homework/Extension Activity

Format the lesson plan professionally with clear section headings.`;

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: prompt })
            });
            const data = await response.json();
            if (response.ok && data.reply) {
                setGeneratedPlan(data.reply);
            } else {
                setGeneratedPlan('Error: ' + (data.details || data.error || 'Failed to generate lesson plan.'));
            }
        } catch (error) {
            setGeneratedPlan('Error connecting to the server. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <section className="lessonplan-page-container">
            <div className="container">
                <div className="lessonplan-header">
                    <h2 className="gradient-text">Lesson Plans & Teaching Resources</h2>
                    <p className="subtitle">
                        Access syllabi, content distribution guides, and sample lesson plans for all levels — P1 to S6.
                    </p>
                </div>

                {/* AI Lesson Plan Generator */}
                <div className="ai-generator-section">
                    <div className="ai-generator-header">
                        <div className="ai-icon-wrap">
                            <i className="uil uil-robot"></i>
                        </div>
                        <div>
                            <h3>AI Lesson Plan Generator</h3>
                            <p>Powered by Jeremie AI — Create a professional lesson plan in seconds</p>
                        </div>
                    </div>
                    <div className="ai-generator-form">
                        <div className="ai-form-row">
                            <div className="ai-form-group">
                                <label><i className="uil uil-backpack"></i> Level</label>
                                <select value={aiLevel} onChange={(e) => setAiLevel(e.target.value)}>
                                    {ALL_LEVELS.map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ai-form-group">
                                <label><i className="uil uil-book-open"></i> Subject</label>
                                <select value={aiSubject} onChange={(e) => setAiSubject(e.target.value)}>
                                    {getSubjectsForLevel(aiLevel).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ai-form-group ai-form-group-wide">
                                <label><i className="uil uil-pen"></i> Topic / Unit</label>
                                <input
                                    type="text"
                                    value={aiTopic}
                                    onChange={(e) => setAiTopic(e.target.value)}
                                    placeholder="e.g., Fractions, Photosynthesis, World War I..."
                                />
                            </div>
                            <div className="ai-form-group ai-form-group-btn">
                                <button
                                    className="btn btn-primary generate-btn"
                                    onClick={handleGenerate}
                                    disabled={generating || !aiTopic.trim()}
                                >
                                    {generating ? (
                                        <><i className="uil uil-spinner-alt" style={{ animation: 'spin 1s linear infinite' }}></i> Generating...</>
                                    ) : (
                                        <><i className="uil uil-magic"></i> Generate with Jeremie AI</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {generatedPlan && (
                        <div className="ai-generated-output">
                            <div className="generated-header">
                                <h4><i className="uil uil-file-check-alt"></i> Generated Lesson Plan</h4>
                                <button className="btn btn-sm" onClick={() => { navigator.clipboard?.writeText(generatedPlan); }}>
                                    <i className="uil uil-copy"></i> Copy
                                </button>
                            </div>
                            <div className="generated-content">
                                {generatedPlan.split('\n').map((line, i) => {
                                    if (!line.trim()) return <br key={i} />;
                                    if (line.match(/^#{1,6}\s/)) {
                                        const level = line.match(/^#{1,6}/)[0].length;
                                        const text = line.replace(/^#{1,6}\s/, '');
                                        const Tag = level <= 3 ? 'h5' : 'h6';
                                        return <Tag key={i} className="gen-heading">{text}</Tag>;
                                    }
                                    if (line.match(/^\*\*(.+)\*\*$/)) {
                                        return <h6 key={i} className="gen-heading">{line.replace(/^\*\*|\*\*$/g, '')}</h6>;
                                    }
                                    if (line.startsWith('* ') || line.startsWith('- ')) {
                                        return <li key={i} className="gen-list-item">{line.replace(/^[*-]\s/, '')}</li>;
                                    }
                                    if (line.match(/^\d+[.)]\s/)) {
                                        return <li key={i} className="gen-list-item">{line}</li>;
                                    }
                                    return <p key={i} className="gen-paragraph">{line}</p>;
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="level-tabs-container">
                    <div className="level-section">
                        <h3 className="section-title"><i className="uil uil-backpack"></i> Primary Section</h3>
                        <div className="level-tabs">
                            {levelKeys.filter(l => l.includes('Primary')).map(level => (
                                <button
                                    key={level}
                                    className={`level-tab ${activeLevel === level ? 'active' : ''}`}
                                    onClick={() => setActiveLevel(level)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="level-section">
                        <h3 className="section-title"><i className="uil uil-graduation-cap"></i> Secondary Section</h3>
                        <div className="level-tabs">
                            {levelKeys.filter(l => l.includes('Senior')).map(level => (
                                <button
                                    key={level}
                                    className={`level-tab ${activeLevel === level ? 'active' : ''}`}
                                    onClick={() => setActiveLevel(level)}
                                >
                                    {level.replace('Senior', 'Secondary')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="levelContent">
                    {levelKeys.map(level => {
                        if (level !== activeLevel) return null;

                        const subjects = Object.keys(LESSON_PLANS[level]);
                        const hasAnyContent = subjects.some(s => {
                            const docs = LESSON_PLANS[level][s];
                            return docs.syllabus || docs.contentDistribution || docs.sampleLessonPlans;
                        });

                        return (
                            <div key={level} className="level-group active">
                                <h3 className="level-header">{level}</h3>
                                
                                {!hasAnyContent ? (
                                    <div className="no-lessonplans">
                                        <i className="uil uil-file-upload-alt"></i>
                                        <h3>Coming Soon</h3>
                                        <p>Lesson plans for {level} are being prepared. Check back later for syllabi, content distribution guides, and sample lesson plans.</p>
                                    </div>
                                ) : (
                                    <div className="subjects-grid">
                                        {subjects.map(subject => {
                                            const docs = LESSON_PLANS[level][subject];
                                            const hasDocs = docs.syllabus || docs.contentDistribution || docs.sampleLessonPlans;
                                            if (!hasDocs) return null;

                                            return (
                                                <article className="subject-card interactive-card" key={subject}>
                                                    <div className="subject-image-wrapper">
                                                        <div className="lessonplan-icon">
                                                            <i className="uil uil-file-alt"></i>
                                                        </div>
                                                    </div>
                                                    <div className="subject-card-info">
                                                        <h4>{subject}</h4>
                                                        <p>Teaching resources for {level} — {subject}.</p>
                                                        <div className="doc-type-list">
                                                            {Object.entries(DOCUMENT_TYPES).map(([key, docType]) => {
                                                                const urls = docs[key];
                                                                if (!urls) return null;
                                                                const urlArray = Array.isArray(urls) ? urls : [urls];
                                                                return urlArray.map((url, i) => (
                                                                    <div key={`${key}-${i}`}>
                                                                        <button
                                                                            className="btn btn-primary small-btn doc-btn"
                                                                            onClick={() => { setPdfLoading(true); setSelectedPdf({ url, level, subject, docType: docType.label }); }}
                                                                            onMouseEnter={() => prefetchPdf(url)}
                                                                            style={{ width: '100%', marginBottom: '6px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                                        >
                                                                            <i className={docType.icon}></i>
                                                                            <span>{docType.label}</span>
                                                                        </button>
                                                                    </div>
                                                                ));
                                                            })}
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedPdf && (
                <div className="units-modal-overlay" onClick={() => { setSelectedPdf(null); setPdfLoading(false); }} style={{ zIndex: 3000, padding: 0 }}>
                    <div className="units-modal" style={{ width: '100vw', maxWidth: '100vw', height: '100dvh', borderRadius: '0', padding: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-color)' }} onClick={e => e.stopPropagation()}>
                        <div className="units-modal-header" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', background: 'var(--card-bg)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 10 }}>
                            <button
                                onClick={() => { setSelectedPdf(null); }}
                                className="btn"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '30px', background: 'var(--search-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)' }}
                            >
                                <i className="uil uil-arrow-left" style={{ fontSize: '1.2rem' }}></i> Back to Lesson Plans
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <h3 className="gradient-text" style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <i className="uil uil-book-open"></i> {selectedPdf.level} - {selectedPdf.subject} - {selectedPdf.docType}
                                </h3>
                                <a
                                    href={getResponsivePdfUrl(selectedPdf.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    title="Download PDF"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 1rem', borderRadius: '30px', background: 'linear-gradient(90deg, #00bf8e, #6c63ff)', color: '#fff', border: 'none', cursor: 'pointer', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <i className="uil uil-download-alt" style={{ fontSize: '1.1rem' }}></i> Download
                                </a>
                            </div>
                        </div>
                        {pdfLoading ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: '#f5f5f5' }}>
                                <div className="pdf-loading-spinner" style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #6c63ff', borderRadius: '50%', animation: 'pdfSpin 0.8s linear infinite' }}></div>
                                <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500, margin: 0 }}>Loading document...</p>
                                <style>{`@keyframes pdfSpin { to { transform: rotate(360deg); } }`}</style>
                            </div>
                        ) : (
                            <div style={{ flex: 1, overflow: 'hidden', background: '#f5f5f5' }}>
                                <PdfViewer url={getResponsivePdfUrl(selectedPdf.url)} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default LessonPlan;
