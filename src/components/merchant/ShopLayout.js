import React from 'react';
import { Outlet } from 'react-router-dom';
import ShopSidebar from './ShopSidebar';
import './ShopLayout.css';

const ShopLayout = () => {
    return (
        <div className="merchant-layout">
            <ShopSidebar />
            <div className="merchant-content">
                <Outlet />
            </div>
        </div>
    );
};

export default ShopLayout;
