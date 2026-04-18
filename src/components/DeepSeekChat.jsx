import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const DeepSeekChat = ({ isChatOpen, setIsChatOpen }) => {
    const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello! I am Jeremie Ai. How can I help you with your studies today?' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageAttachment, setImageAttachment] = useState(null);
    const fileInputRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim() && !imageAttachment) return;
        const userMsg = input.trim();
        const payload = { message: userMsg };
        const msgToDisplay = { role: 'user', text: userMsg };

        if (imageAttachment) {
            payload.image = imageAttachment;
            msgToDisplay.image = imageAttachment;
        }

        setMessages(prev => [...prev, msgToDisplay]);
        setInput('');
        setImageAttachment(null);
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = `${API_URL}/api/chat`;
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok && data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
            } else {
                const errMsg = data.details || data.error || 'Sorry, I am having trouble connecting to my database.';
                setMessages(prev => [...prev, { role: 'assistant', text: `API Error: ${errMsg}` }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to the server.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => setImageAttachment(event.target.result);
            reader.readAsDataURL(file);
        } else if (file.name.endsWith('.docx')) {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            setInput(prev => prev + (prev ? '\n\n' : '') + `[Contents of ${file.name}]:\n${result.value}`);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
            const text = await file.text();
            setInput(prev => prev + (prev ? '\n\n' : '') + `[Contents of ${file.name}]:\n${text}`);
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                setInput(prev => prev + (prev ? '\n\n' : '') + `[Contents of ${file.name}]:\n${fullText}`);
            } catch (err) {
                console.error('Error parsing PDF:', err);
                alert('There was an error reading the PDF file.');
            }
        } else {
            alert('Unsupported file format. Please upload an image, PDF (.pdf), Word doc (.docx), or Text file.');
        }
        
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handlePaste = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => setImageAttachment(event.target.result);
                reader.readAsDataURL(blob);
                e.preventDefault(); 
                break;
            }
        }
    };

    if (!isChatOpen) return null;

    return (
        <div className="chat-modal-overlay">
            <div className="chat-modal">
                <div className="chat-header">
                    <h3><i className="uil uil-robot"></i> Jeremie Ai</h3>
                    <button className="close-chat" onClick={() => setIsChatOpen(false)}><i className="uil uil-times"></i></button>
                </div>
                <div className="chat-messages">
                    {messages.map((m, idx) => (
                        <div key={idx} className={`chat-bubble ${m.role}`}>
                            {m.text}
                            {m.image && <img src={m.image} alt="attachment" className="chat-attachment-img" />}
                        </div>
                    ))}
                    {loading && <div className="chat-bubble assistant loading">Jeremie is thinking...</div>}
                </div>
                
                {imageAttachment && (
                    <div className="attachment-preview">
                        <img src={imageAttachment} alt="preview" />
                        <button className="remove-attachment" onClick={() => setImageAttachment(null)}><i className="uil uil-times"></i></button>
                    </div>
                )}

                <div className="chat-input-area">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*,.docx,.txt,.pdf"
                        onChange={handleFileUpload} 
                    />
                    <button className="attach-btn" onClick={() => fileInputRef.current?.click()} title="Upload Image or Document">
                        <i className="uil uil-paperclip"></i>
                    </button>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onPaste={handlePaste}
                        placeholder="Ask or paste an image/doc..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} disabled={loading || (!input.trim() && !imageAttachment)} className="send-btn"><i className="uil uil-message"></i></button>
                </div>
            </div>
        </div>
    );
};

export default DeepSeekChat;
