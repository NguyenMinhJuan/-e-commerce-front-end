import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
import './ShopSidebar.css';

const ShopSidebar = () => {
    return (
        <div className="merchant-sidebar">
            <div className="sidebar-header">
                <h3>MERCHANT</h3>
            </div>
            <ul className="list-unstyled">
                <li>
                    <Link to="/merchant/products" className="nav-link">
                        <FaBox /> Product Management
                    </Link>
                </li>
                <li>
                    <Link to="/merchant/products/new" className="nav-link">
                        <FaPlusCircle /> Propose New Product
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link">
                        <FaBox /> Product Page
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="nav-link">
                        <FaSignOutAlt /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default ShopSidebar;
