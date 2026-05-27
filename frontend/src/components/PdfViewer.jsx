import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ url }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    if (!url) {
        return <div style={{ padding: '2rem', color: '#666' }}>No PDF URL provided.</div>;
    }

    return (
        <div className="pdf-viewer-wrapper">
            <Worker workerUrl={pdfWorkerUrl}>
                <Viewer
                    fileUrl={url}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PdfViewer;
