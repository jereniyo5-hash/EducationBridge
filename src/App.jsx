import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} /> 
        <Route path="/subject" element={<ProtectedRoute><Subject /></ProtectedRoute>} />
        <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
        <Route path="/create-exam" element={<ProtectedRoute><CreateExam /></ProtectedRoute>} />
        <Route path="/take-exam" element={<ProtectedRoute><TakeTeacherExam /></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><ViewSubmissions /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
