import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegBuilding, FaUsers, FaBox, FaSignOutAlt, FaList, FaPlusCircle } from 'react-icons/fa';

const Sidebar = () => {
    const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);
    const [isMerchantMenuOpen, setIsMerchantMenuOpen] = useState(false); // State for Merchant sub-menu

    // Toggle the employee sub-menu visibility
    const toggleEmployeeMenu = () => {
        setIsEmployeeMenuOpen(!isEmployeeMenuOpen);
    };

    // Toggle the merchant sub-menu visibility
    const toggleMerchantMenu = () => {
        setIsMerchantMenuOpen(!isMerchantMenuOpen);
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
                        <FaUsers /> Employees
                    </a>
                    {/* Collapsible sub-menu for Employees */}
                    <ul className={`sub-menu ${isEmployeeMenuOpen ? 'show' : ''}`}>
                        <li><Link to="/admin/employees" className="nav-link"><FaList /> Employee List</Link></li>
                        <li><Link to="/admin/employees/add" className="nav-link"><FaPlusCircle /> Add New Employee</Link></li>
                    </ul>
                </li>

                {/* Merchant menu with sub-menu */}
                <li>
                    <a href="#" className="nav-link" onClick={toggleMerchantMenu}>
                        <FaRegBuilding /> Merchant
                    </a>
                    {/* Collapsible sub-menu for Merchant */}
                    <ul className={`sub-menu ${isMerchantMenuOpen ? 'show' : ''}`}>
                        <li><Link to="/admin/merchants" className="nav-link"><FaList /> Merchant List</Link></li>
                        <li><Link to="/admin/merchants/add" className="nav-link"><FaPlusCircle /> Add New Merchant</Link></li>
                    </ul>
                </li>

                <li><Link to="/logout" className="nav-link"><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
