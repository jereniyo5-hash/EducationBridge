import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Subject from './pages/Subject';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Assessment from './pages/Assessment';
import CreateExam from './pages/CreateExam';
import TakeTeacherExam from './pages/TakeTeacherExam';
import ViewSubmissions from './pages/ViewSubmissions';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DeepSeekChat from './components/DeepSeekChat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar setIsChatOpen={setIsChatOpen} />
      <Routes>
        <Route path="/" element={<Home setIsChatOpen={setIsChatOpen} />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/subject" element={<Subject />} />
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
      <DeepSeekChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
