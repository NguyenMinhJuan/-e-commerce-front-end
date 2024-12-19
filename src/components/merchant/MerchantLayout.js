import React from 'react';
import { Outlet } from 'react-router-dom';
import MerchantSidebar from './MerchantSidebar';
import './MerchantLayout.css';

const MerchantLayout = () => {
    return (
        <div className="merchant-layout">
            <MerchantSidebar />
            <div className="merchant-content">
                <Outlet />
            </div>
        </div>
    );
};

export default MerchantLayout;
