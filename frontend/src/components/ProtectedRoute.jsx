import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If not logged in, redirect to signup page as requested
        return <Navigate to="/signup" replace />;
    }

    // If logged in, allow them to view the page
    return children;
};

export default ProtectedRoute;
