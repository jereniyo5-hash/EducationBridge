import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ currentUser, isTeacher }) => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Fetch contacts (students or teachers depending on role)
    const fetchContacts = async () => {
        try {
            if (isTeacher) {
                const res = await fetch(`${API_URL}/api/students-chatted-with/${currentUser.id}`);
                const data = await res.json();
                setContacts(data.students || []);
            } else {
                const res = await fetch(`${API_URL}/api/teachers?search=${searchTerm}`);
                const data = await res.json();
                setContacts(data.teachers || []);
            }
        } catch (e) {
            console.error('Error fetching contacts', e);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [searchTerm, isTeacher]);

    // Fetch messages periodically
    const fetchMessages = async () => {
        if (!selectedUser) return;
        try {
            const res = await fetch(`${API_URL}/api/chat/${selectedUser.id}?currentUserId=${currentUser.id}`);
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (e) {
            console.error('Error fetching messages', e);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !file) || !selectedUser) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('senderId', currentUser.id);
            formData.append('content', newMessage);
            if (file) {
                formData.append('file', file);
            }

            const res = await fetch(`${API_URL}/api/chat/${selectedUser.id}`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setNewMessage('');
                setFile(null);
                fetchMessages();
            }
        } catch (e) {
            console.error('Error sending message', e);
        }
        setLoading(false);
    };

    return (
        <div className="chat-container interactive-card">
            <div className="chat-sidebar">
                <h3>{isTeacher ? 'Student Chats' : 'Teachers'}</h3>
                {!isTeacher && (
                    <input 
                        type="text" 
                        placeholder="Search teacher username..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="chat-search"
                    />
                )}
                <div className="contact-list">
                    {contacts.map(contact => (
                        <div 
                            key={contact.id} 
                            className={`contact-item ${selectedUser?.id === contact.id ? 'active' : ''}`}
                            onClick={() => setSelectedUser(contact)}
                        >
                            <div className="contact-avatar">
                                {contact.avatar_url ? (
                                    <img src={contact.avatar_url.startsWith('http') ? contact.avatar_url : `${API_URL}${contact.avatar_url}`} alt={contact.username} />
                                ) : (
                                    (contact.full_name || contact.username).charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="contact-info">
                                <h4>{contact.full_name || contact.username}</h4>
                                <span>@{contact.username}</span>
                            </div>
                        </div>
                    ))}
                    {contacts.length === 0 && <div className="no-contacts">No contacts found.</div>}
                </div>
            </div>

            <div className="chat-main">
                {selectedUser ? (
                    <>
                        <div className="chat-header">
                            <h4>Chatting with {selectedUser.full_name || selectedUser.username}</h4>
                        </div>
                        <div className="chat-messages">
                            {messages.map(msg => {
                                const isMine = msg.sender_id === currentUser.id;
                                return (
                                    <div key={msg.id} className={`chat-message ${isMine ? 'mine' : 'theirs'}`}>
                                        {msg.content && <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />}
                                        {msg.file_url && (
                                            msg.file_type === 'image' ? (
                                                <img src={msg.file_url} alt="attachment" className="message-image" />
                                            ) : (
                                                <a href={msg.file_url} target="_blank" rel="noreferrer" className="message-file">
                                                    <i className="uil uil-file-alt"></i> View Attachment
                                                </a>
                                            )
                                        )}
                                        <div className="message-time">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="chat-input-area" onSubmit={handleSendMessage}>
                            <label className="file-upload-btn">
                                <i className="uil uil-paperclip"></i>
                                <input type="file" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                            {file && <span className="file-name" title={file.name}>{file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}</span>}
                            
                            <input 
                                type="text" 
                                placeholder="Type a message... (HTML allowed)" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" disabled={loading || (!newMessage.trim() && !file)}>
                                {loading ? <i className="uil uil-spinner"></i> : <i className="uil uil-message"></i>}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="chat-placeholder">
                        <i className="uil uil-comments"></i>
                        <p>Select a contact to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
