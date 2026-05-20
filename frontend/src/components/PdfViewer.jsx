import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfViewer = ({ url }) => {
    const canvasContainerRef = useRef(null);
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                setLoading(true);
                setError(null);
                const loadingTask = pdfjsLib.getDocument(url);
                const loadedPdf = await loadingTask.promise;
                setPdf(loadedPdf);
            } catch (err) {
                console.error("Error loading PDF:", err);
                setError("Failed to load PDF.");
            } finally {
                setLoading(false);
            }
        };
        if (url) {
            loadPdf();
        }
    }, [url]);

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const renderPage = async () => {
            if (!pdf || !canvasContainerRef.current) return;
            
            canvasContainerRef.current.innerHTML = '';
            setLoading(true);
            try {
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 1.5 });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.style.width = '100%';
                canvas.style.maxWidth = '800px';
                canvas.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                
                canvasContainerRef.current.appendChild(canvas);

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext).promise;
            } catch (err) {
                console.error("Error rendering page:", err);
            } finally {
                setLoading(false);
            }
        };

        if (pdf) {
            renderPage();
        }
    }, [pdf, pageNumber]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f5f5f5', overflowY: 'auto', padding: '1rem' }}>
            {pdf && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', background: 'white', padding: '0.5rem 1rem', borderRadius: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <button 
                        disabled={pageNumber <= 1} 
                        onClick={() => setPageNumber(p => p - 1)}
                        style={{ border: 'none', background: '#6c63ff', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.5 : 1 }}
                    >
                        Prev
                    </button>
                    <span style={{ fontWeight: 'bold' }}>Page {pageNumber} of {pdf.numPages}</span>
                    <button 
                        disabled={pageNumber >= pdf.numPages} 
                        onClick={() => setPageNumber(p => p + 1)}
                        style={{ border: 'none', background: '#6c63ff', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: pageNumber >= pdf.numPages ? 'not-allowed' : 'pointer', opacity: pageNumber >= pdf.numPages ? 0.5 : 1 }}
                    >
                        Next
                    </button>
                </div>
            )}
            {loading && !pdf && <div style={{ padding: '2rem', color: '#666' }}>Loading PDF Document...</div>}
            {error && <div style={{ padding: '2rem', color: 'red' }}>{error}</div>}
            <div ref={canvasContainerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
        </div>
    );
};

export default PdfViewer;
