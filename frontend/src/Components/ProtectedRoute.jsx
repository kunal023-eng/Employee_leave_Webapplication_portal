import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Check if the user's role is allowed to access this route
    if (allowedRoles && !allowedRoles.includes(role)) {
        // If role is not allowed, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // If authenticated and role is allowed, render the protected component with role prop
    return React.cloneElement(children, { role });
};

export default ProtectedRoute;