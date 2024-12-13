// src/components/admin/Admin.js
import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Admin.css';  // Make sure you have appropriate styling here
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <MainContent />
        </div>
    );
}

export default Admin;
