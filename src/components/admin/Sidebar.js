import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaUsers, FaBox, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>ADMIN</h3>
            </div>
            <ul className="list-unstyled">
                <li><Link to="#" className="nav-link"><FaTachometerAlt /> Dashboard</Link></li>
                <li><Link to="#" className="nav-link"><FaCogs /> Settings</Link></li>
                <li><Link to="#" className="nav-link"><FaUsers /> Users</Link></li>
                <li><Link to="#" className="nav-link"><FaBox /> Products</Link></li>
                <li><Link to="#" className="nav-link"><FaChartLine /> Analytics</Link></li>
                <li><Link to="/logout" className="nav-link"><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
