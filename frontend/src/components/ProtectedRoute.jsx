import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If logged in, allow them to view the page
    return children;
};

export default ProtectedRoute;
