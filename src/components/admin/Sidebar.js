import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaUsers, FaBox, FaChartLine, FaSignOutAlt, FaList, FaPlusCircle } from 'react-icons/fa';

const Sidebar = () => {
    const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);

    // Toggle the employee sub-menu visibility
    const toggleEmployeeMenu = () => {
        setIsEmployeeMenuOpen(!isEmployeeMenuOpen);
    };

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h3>ADMIN</h3>
            </div>
            <ul className="list-unstyled">
                <li><Link to="#" className="nav-link"><FaTachometerAlt /> Dashboard</Link></li>
                <li><Link to="#" className="nav-link"><FaCogs /> Settings</Link></li>

                {/* Employees menu with sub-menu */}
                <li>
                    <a href="#" className="nav-link" onClick={toggleEmployeeMenu}>
                        <FaUsers /> Employees
                    </a>
                    {/* Collapsible sub-menu */}
                    <ul className={`sub-menu ${isEmployeeMenuOpen ? 'show' : ''}`}>
                        <li><Link to="/admin/employees" className="nav-link"><FaList /> Employee List</Link></li>
                        <li><Link to="/admin/employees/add" className="nav-link"><FaPlusCircle /> Add New Employee</Link></li>
                    </ul>
                </li>

                <li><Link to="#" className="nav-link"><FaBox /> Products</Link></li>
                <li><Link to="#" className="nav-link"><FaChartLine /> Analytics</Link></li>
                <li><Link to="/logout" className="nav-link"><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
