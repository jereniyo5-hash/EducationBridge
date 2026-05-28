import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const Subject = React.lazy(() => import('./pages/Subject'));
const LessonPlan = React.lazy(() => import('./pages/LessonPlan'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Assessment = React.lazy(() => import('./pages/Assessment'));
const CreateExam = React.lazy(() => import('./pages/CreateExam'));
const TakeTeacherExam = React.lazy(() => import('./pages/TakeTeacherExam'));
const ViewSubmissions = React.lazy(() => import('./pages/ViewSubmissions'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TeacherDashboard = React.lazy(() => import('./pages/TeacherDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const DeepSeekChat = React.lazy(() => import('./components/DeepSeekChat'));

function App() {


  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar setIsChatOpen={setIsChatOpen} />
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', fontSize: '1.5rem', color: '#6c63ff' }}><i className="uil uil-spinner-alt" style={{ animation: 'spin 1s linear infinite', marginRight: '10px' }}></i> Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home setIsChatOpen={setIsChatOpen} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/subject" element={<Subject />} />
          <Route path="/lesson-plan" element={<LessonPlan />} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/create-exam" element={<ProtectedRoute><CreateExam /></ProtectedRoute>} />
          <Route path="/take-exam" element={<ProtectedRoute><TakeTeacherExam /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute><ViewSubmissions /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <DeepSeekChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
