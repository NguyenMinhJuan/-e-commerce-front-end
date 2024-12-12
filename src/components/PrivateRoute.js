import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ requiredRole, element, ...rest }) => {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const hasRequiredRole = roles.includes(requiredRole);

    // If the user does not have the required role, redirect to the login page
    if (!hasRequiredRole) {
        return <Navigate to="/login" />;
    }

    // If the user has the required role, render the element (the protected component)
    return element;
};

export default PrivateRoute;
