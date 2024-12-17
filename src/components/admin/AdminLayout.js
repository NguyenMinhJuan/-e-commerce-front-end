// src/components/admin/AdminLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './AdminLayout.css';  // Ensure you have appropriate styling here
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from 'react-router-dom';  // Import Outlet


const AdminLayout = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <MainContent />
        </div>
    );
}

export default AdminLayout;
