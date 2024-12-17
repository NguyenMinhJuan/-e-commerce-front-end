// src/components/admin/MainContent.js
import React from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet
import "bootstrap/dist/css/bootstrap.min.css";


const MainContent = () => {
    return (
        <div className="admin-main-content">
            <div className="container mt-4">
                <Outlet/>
            </div>
        </div>
    );
}

export default MainContent;
