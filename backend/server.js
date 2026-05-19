import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import pg from 'pg';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { OAuth2Client } from 'google-auth-library';
const { Pool } = pg;

// Google Auth setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID');

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 5000;

// Trust front-end proxy (Render, Vercel, etc.)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Add rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// It's best practice to use environment variables for secrets.
if (!process.env.DATABASE_URL) {
  console.error('CRITICAL ERROR: DATABASE_URL is not defined! Please check your Render Environment Variables.');
}

// Manually parse the DATABASE_URL to avoid any parsing/SSL conflicts
const dbUrlString = process.env.DATABASE_URL || '';
const hostMatch = dbUrlString.match(/@([^/?:#]+)/);
const dbHost = hostMatch ? hostMatch[1] : 'unknown';

console.log(`Attempting robust connection to database host: ${dbHost}`);

const pool = new Pool({
  connectionString: dbUrlString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('CRITICAL DATABASE ERROR:', err.message);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Render Database successfully.');
  });
});

// Basic test endpoint
app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running and connected to DB.' });
});

// Admin Middleware (Bypassed for guest access)
const adminOnly = (req, res, next) => {
  req.user = { id: 9999, role: 'admin', username: 'guest_user' };
  next();
};

// Authentication endpoints
const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-secret-token-key-for-benit';

// Setup cloudinary storage for avatar uploads
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{ width: 150, height: 150, crop: 'limit' }]
    },
});
const uploadAvatar = multer({ storage: avatarStorage });

app.post('/api/signup', uploadAvatar.single('avatar'), async (req, res) => {
  const { role, full_name, username, email, phone, password } = req.body;
  if (!role || !username || !email || !password) {
    return res.status(400).json({ error: 'Username, Email and Password are required.' });
  }

  const final_full_name = full_name || username;
  const final_phone = phone || 'N/A';

  let avatar_url = null;
  if (req.file) {
      avatar_url = req.file.path; // Cloudinary URL
  }

  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const insertQuery = `
      INSERT INTO users (role, full_name, username, email, phone, password_hash, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, role, avatar_url
    `;
    const newUser = await pool.query(insertQuery, [role, final_full_name, username, email, final_phone, password_hash, avatar_url]);

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ status: 'success', token, user });
  } catch (error) {
    console.error('Error in /api/signup:', error);
    res.status(500).json({ error: 'Database error creating user.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Username/Email and Password are required.' });
  }

  // Hardcoded Admin Login bypass
  if (identifier === 'jeremie' && password === '123') {
    const token = jwt.sign({ id: 0, role: 'admin', username: 'jeremie' }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ 
      status: 'success', 
      token, 
      user: { id: 0, username: 'jeremie', role: 'admin', avatar_url: null } 
    });
  }

  try {
    // Find user by username or email
    const result = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $1', [identifier]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    
    // Validate password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ status: 'success', token, user: { id: user.id, username: user.username, role: user.role, avatar_url: user.avatar_url } });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ error: 'Database error logging in.' });
  }
});

// Google Authentication Route
app.post('/api/google-auth', async (req, res) => {
  const { access_token, role } = req.body;
  if (!access_token) return res.status(400).json({ error: 'Access Token is required' });

  try {
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    const payload = await userInfoRes.json();
    
    if (payload.error) {
        return res.status(401).json({ error: 'Invalid Google Token' });
    }

    const { email, name, picture } = payload;
    
    // Check if user exists
    let result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user;
    
    if (result.rows.length === 0) {
      // Create new user if they don't exist
      const userRole = role || 'student'; // Default to student or use provided role
      const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
      const uniqueUsername = `${baseUsername}_${Math.floor(Math.random() * 1000)}`;
      
      const insertQuery = `
        INSERT INTO users (role, full_name, username, email, phone, password_hash, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;
      // Google Auth users might not need a password, but we insert a random hash
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
      
      const newUser = await pool.query(insertQuery, [
        userRole, name, uniqueUsername, email, 'N/A', randomPassword, picture
      ]);
      user = newUser.rows[0];
    } else {
      user = result.rows[0];
    }

    const jwtToken = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ status: 'success', token: jwtToken, user: { id: user.id, username: user.username, role: user.role, avatar_url: user.avatar_url } });
  } catch (error) {
    console.error('Error in Google Auth:', error);
    res.status(500).json({ error: 'Google authentication failed.' });
  }
});

// Jeremie Ai Chatbot Route
app.post('/api/chat', async (req, res) => {
  const { message, image } = req.body;
  if (!message && !image) {
    return res.status(400).json({ error: 'Message or image is required' });
  }

  try {
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
       return res.status(500).json({ error: 'GROQ_API_KEY is not set.' });
    }

    let requestModel = "llama-3.3-70b-versatile";
    let userContent = message || "Describe this image.";

    if (image) {
        requestModel = "llama-3.2-11b-vision-preview";
        userContent = [
            { type: "text", text: message || "Describe this image." },
            { type: "image_url", image_url: { url: image } }
        ];
    }

    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
            model: requestModel,
            messages: [
                {
                    role: "system",
                    content: "You are Jeremie Ai, an intelligent and helpful virtual assistant deployed on the 'Educational_Bridge' educational platform. Your job is to help Rwandan students with their studies safely and politely. DO NOT introduce yourself in every response. Just answer the user's question directly starting immediately with the answer."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Groq Error: ${data.error?.message || response.statusText}`);
    }
    
    const replyText = data.choices?.[0]?.message?.content || "I'm not sure how to respond to that.";

    res.json({ reply: replyText });
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ error: 'Failed to communicate with Jeremie Ai.', details: error.toString() });
  }
});

// Setup cloudinary storage for exam uploads
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'exams',
        allowed_formats: ['pdf'],
    },
});
const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Upload exam endpoint
app.post('/api/exams/upload', upload.single('examFile'), async (req, res) => {
    try {
        const { teacher_id, teacher_name, year_level, subject_name, time_limit, attempts_allowed } = req.body;
        const file = req.file;

        if (!file || !teacher_name || !year_level || !subject_name || !time_limit || !attempts_allowed) {
            return res.status(400).json({ error: 'Missing required fields or file.' });
        }

        const file_url = file.path; // Cloudinary URL
        
        const insertQuery = `
            INSERT INTO teacher_exams (teacher_id, teacher_name, year_level, subject_name, file_url, time_limit, attempts_allowed)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;
        const result = await pool.query(insertQuery, [
            teacher_id || null, teacher_name, year_level, subject_name, file_url, parseInt(time_limit), attempts_allowed
        ]);

        res.status(201).json({ status: 'success', exam: result.rows[0] });
    } catch (error) {
        console.error('Error uploading exam:', error);
        res.status(500).json({ error: 'Failed to upload exam.' });
    }
});

// Fetch exams by year and subject
app.get('/api/exams', async (req, res) => {
    try {
        const { year, subject } = req.query;
        let queryStr = 'SELECT * FROM teacher_exams ORDER BY created_at DESC';
        let queryParams = [];

        if (year && subject) {
            queryStr = 'SELECT * FROM teacher_exams WHERE year_level = $1 AND subject_name = $2 ORDER BY created_at DESC';
            queryParams = [year, subject];
        }

        const result = await pool.query(queryStr, queryParams);
        res.json({ exams: result.rows });
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Failed to fetch exams.' });
    }
});

// Update exam endpoint
app.put('/api/exams/:id', upload.single('examFile'), async (req, res) => {
    try {
        const { id } = req.params;
        const { teacher_id, year_level, subject_name, time_limit, attempts_allowed } = req.body;
        
        const check = await pool.query('SELECT * FROM teacher_exams WHERE id = $1', [id]);
        if (check.rows.length === 0) return res.status(404).json({ error: 'Exam not found' });
        if (check.rows[0].teacher_id != teacher_id) return res.status(403).json({ error: 'Unauthorized to edit this exam' });

        let file_url = check.rows[0].file_url;
        if (req.file) {
            file_url = req.file.path; // Cloudinary URL
            // Note: In Cloudinary, deleting the old file requires more logic (destroy)
            // For now, we just update the record
        }

        const updateQuery = `
            UPDATE teacher_exams 
            SET year_level = $1, subject_name = $2, time_limit = $3, attempts_allowed = $4, file_url = $5 
            WHERE id = $6 RETURNING *
        `;
        const result = await pool.query(updateQuery, [
            year_level, subject_name, parseInt(time_limit), attempts_allowed, file_url, id
        ]);
        
        res.json({ status: 'success', exam: result.rows[0] });
    } catch (e) {
        console.error('Error updating exam:', e);
        res.status(500).json({ error: 'Failed to update exam' });
    }
});

// Delete exam endpoint
app.delete('/api/exams/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { teacher_id } = req.query;
        
        const check = await pool.query('SELECT * FROM teacher_exams WHERE id = $1', [id]);
        if (check.rows.length === 0) return res.status(404).json({ error: 'Exam not found' });
        if (check.rows[0].teacher_id != teacher_id) return res.status(403).json({ error: 'Unauthorized to delete this exam' });
        
        // Note: For deletion from Cloudinary, we'd need the public_id
        // For now, we just remove the database record
        
        await pool.query('DELETE FROM teacher_exams WHERE id = $1', [id]);
        res.json({ status: 'success' });
    } catch (e) {
        console.error('Error deleting exam:', e);
        res.status(500).json({ error: 'Failed to delete exam' });
    }
});

// Submit answers
app.post('/api/exams/submit', async (req, res) => {
    try {
        const { exam_id, student_id, student_name, answers_text } = req.body;
        const query = `
            INSERT INTO student_submissions (exam_id, student_id, student_name, answers_text)
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const result = await pool.query(query, [exam_id, student_id, student_name, answers_text]);
        res.json({ status: 'success', submission: result.rows[0] });
    } catch (e) {
        console.error('Error submitting answers:', e);
        res.status(500).json({ error: 'Failed to submit answers' });
    }
});

// Get submissions for an exam
app.get('/api/submissions/:examId', async (req, res) => {
    try {
        const { examId } = req.params;
        const query = `SELECT * FROM student_submissions WHERE exam_id = $1 ORDER BY submitted_at DESC`;
        const result = await pool.query(query, [examId]);
        res.json({ submissions: result.rows });
    } catch (e) {
        console.error('Error fetching submissions:', e);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

// Get student progress
app.get('/api/student/progress/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const query = `
            SELECT s.id as submission_id, s.answers_text, s.score, s.submitted_at,
                   e.subject_name, e.year_level, e.teacher_name
            FROM student_submissions s
            JOIN teacher_exams e ON s.exam_id = e.id
            WHERE s.student_id = $1
            ORDER BY s.submitted_at DESC
        `;
        const result = await pool.query(query, [studentId]);
        res.json({ progress: result.rows });
    } catch (e) {
        console.error('Error fetching student progress:', e);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Admin User Management
app.get('/api/admin/users', adminOnly, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, role, full_name, username, email, phone, avatar_url, created_at FROM users ORDER BY created_at DESC');
        res.json({ users: result.rows });
    } catch (e) {
        console.error('Error fetching users:', e);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.put('/api/admin/users/:id/role', adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!['student', 'teacher', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const result = await pool.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role, username', [role, id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ status: 'success', user: result.rows[0] });
    } catch (e) {
        console.error('Error updating user role:', e);
        res.status(500).json({ error: 'Failed to update role' });
    }
});

app.delete('/api/admin/users/:id', adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        // Don't allow admin to delete themselves (optional but recommended)
        if (id == req.user.id) return res.status(400).json({ error: 'You cannot delete yourself.' });
        
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ status: 'success' });
    } catch (e) {
        console.error('Error deleting user:', e);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Testimonials API
app.get('/api/testimonials', async (req, res) => {
    try {
        const { all } = req.query;
        let queryStr = 'SELECT * FROM testimonials WHERE is_approved = true ORDER BY created_at DESC';
        
        // If 'all' is requested, verify admin
        if (all === 'true') {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                try {
                    const decoded = jwt.verify(token, JWT_SECRET);
                    if (decoded.role === 'admin') {
                        queryStr = 'SELECT * FROM testimonials ORDER BY created_at DESC';
                    }
                } catch (err) {
                    // Ignore error, fallback to approved only
                }
            }
        }

        const result = await pool.query(queryStr);
        res.json({ testimonials: result.rows });
    } catch (e) {
        console.error('Error fetching testimonials:', e);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

app.post('/api/testimonials', async (req, res) => {
    try {
        const { name, role, comment, avatar_url } = req.body;
        if (!name || !role || !comment) {
            return res.status(400).json({ error: 'Name, role, and comment are required' });
        }
        
        // Default to not approved
        const result = await pool.query(
            'INSERT INTO testimonials (name, role, comment, avatar_url, is_approved) VALUES ($1, $2, $3, $4, FALSE) RETURNING *',
            [name, role, comment, avatar_url || null]
        );
        res.status(201).json({ status: 'success', testimonial: result.rows[0] });
    } catch (e) {
        console.error('Error posting testimonial:', e);
        res.status(500).json({ error: 'Failed to submit comment' });
    }
});

// Approve testimonial
app.put('/api/admin/testimonials/:id/approve', adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('UPDATE testimonials SET is_approved = true WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
        res.json({ status: 'success', testimonial: result.rows[0] });
    } catch (e) {
        console.error('Error approving testimonial:', e);
        res.status(500).json({ error: 'Failed to approve testimonial' });
    }
});

// Delete testimonial
app.delete('/api/admin/testimonials/:id', adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
        res.json({ status: 'success' });
    } catch (e) {
        console.error('Error deleting testimonial:', e);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// Chat Endpoints
app.get('/api/init-chat-db', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id SERIAL PRIMARY KEY,
                sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                content TEXT,
                file_url TEXT,
                file_type VARCHAR(50),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        res.json({ status: 'success', message: 'Chat table created' });
    } catch (e) {
        console.error('Error creating chat table:', e);
        res.status(500).json({ error: 'Failed to create chat table' });
    }
});

app.get('/api/teachers', async (req, res) => {
    try {
        const { search } = req.query;
        let queryStr = 'SELECT id, full_name, username, avatar_url FROM users WHERE role = $1';
        let queryParams = ['teacher'];
        
        if (search) {
            queryStr += ' AND username ILIKE $2';
            queryParams.push(`%${search}%`);
        }
        
        const result = await pool.query(queryStr, queryParams);
        res.json({ teachers: result.rows });
    } catch (e) {
        console.error('Error fetching teachers:', e);
        res.status(500).json({ error: 'Failed to fetch teachers' });
    }
});

// Setup cloudinary storage for chat uploads
const chatStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chat_files',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx'],
    },
});
const uploadChat = multer({ storage: chatStorage });

app.get('/api/chat/:otherUserId', async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const { currentUserId } = req.query; // Send from frontend or decode JWT in a real app
        
        if (!currentUserId || !otherUserId) return res.status(400).json({ error: 'Missing user IDs' });

        const query = `
            SELECT * FROM chat_messages 
            WHERE (sender_id = $1 AND receiver_id = $2) 
               OR (sender_id = $2 AND receiver_id = $1)
            ORDER BY created_at ASC
        `;
        const result = await pool.query(query, [currentUserId, otherUserId]);
        res.json({ messages: result.rows });
    } catch (e) {
        console.error('Error fetching chat:', e);
        res.status(500).json({ error: 'Failed to fetch chat' });
    }
});

app.post('/api/chat/:receiverId', uploadChat.single('file'), async (req, res) => {
    try {
        const { receiverId } = req.params;
        const { senderId, content } = req.body;
        
        if (!senderId || !receiverId) return res.status(400).json({ error: 'Missing user IDs' });
        
        let file_url = null;
        let file_type = null;
        if (req.file) {
            file_url = req.file.path;
            file_type = req.file.mimetype.startsWith('image') ? 'image' : 'file';
        }

        const query = `
            INSERT INTO chat_messages (sender_id, receiver_id, content, file_url, file_type)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const result = await pool.query(query, [senderId, receiverId, content || '', file_url, file_type]);
        res.json({ status: 'success', message: result.rows[0] });
    } catch (e) {
        console.error('Error sending message:', e);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.get('/api/students-chatted-with/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
        // Get all unique users who have chatted with this teacher
        const query = `
            SELECT DISTINCT u.id, u.username, u.full_name, u.avatar_url 
            FROM users u
            JOIN chat_messages c ON (u.id = c.sender_id OR u.id = c.receiver_id)
            WHERE (c.sender_id = $1 OR c.receiver_id = $1) AND u.id != $1
        `;
        const result = await pool.query(query, [teacherId]);
        res.json({ students: result.rows });
    } catch (e) {
        console.error('Error fetching students:', e);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Backend only - no static dist serving

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
