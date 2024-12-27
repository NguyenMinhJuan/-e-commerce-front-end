import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegBuilding, FaUsers, FaBox, FaSignOutAlt, FaList, FaPlusCircle, FaUserTie } from 'react-icons/fa'; // Import FaUserTie for Employees

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
                {/* Employees menu with sub-menu */}
                <li>
                    <a href="#" className="nav-link" onClick={toggleEmployeeMenu}>
                        <FaUserTie /> {/* Changed icon here */}
                        Employees
                    </a>
                    {/* Collapsible sub-menu */}
                    <ul className={`sub-menu ${isEmployeeMenuOpen ? 'show' : ''}`}>
                        <li><Link to="/admin/employees" className="nav-link"><FaList /> Employee List</Link></li>
                        <li><Link to="/admin/employees/add" className="nav-link"><FaPlusCircle /> New Employee</Link></li>
                    </ul>
                </li>
                {/* Users menu with sub-menu */}
                <li>
                    <a href="#" className="nav-link" onClick={toggleEmployeeMenu}>
                        <FaUsers /> Users
                    </a>
                    {/* Collapsible sub-menu */}
                    <ul className={`sub-menu ${isEmployeeMenuOpen ? 'show' : ''}`}>
                        <li><Link to="/admin/users" className="nav-link"><FaList /> User List</Link></li>
                        <li><Link to="/admin/employees/add" className="nav-link"><FaPlusCircle /> New Employee</Link></li>
                    </ul>
                </li>
                <li><Link to="/admin/shops" className="nav-link"><FaRegBuilding /> Shops</Link></li>
                <li>
                    <a href="" className="nav-link">
                        <FaBox /> Product Page
                    </a>
                </li>
                <li><Link to="/logout" className="nav-link"><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
