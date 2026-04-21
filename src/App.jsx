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
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Testimonials from './pages/Testimonials';
import DeepSeekChat from './components/DeepSeekChat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setIsChatOpen={setIsChatOpen} />
      <Routes>
        <Route path="/" element={<Home setIsChatOpen={setIsChatOpen} />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/subject" element={<Subject />} />
        <Route path="/assessment" element={<Assessment />} />
        
        {/* Protected Features */}
        <Route path="/testimonies" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
        
        {/* Role-based Dashboards */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Teacher Actions */}
        <Route path="/create-exam" element={<ProtectedRoute><CreateExam /></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><ViewSubmissions /></ProtectedRoute>} />
        
        {/* Student/Public Actions */}
        <Route path="/take-exam" element={<TakeTeacherExam />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <DeepSeekChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
