import React, { useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {FaCaretDown, FaSearch, FaShoppingCart, FaUser, FaStore, FaFilter, FaBell} from 'react-icons/fa';
import './Layout.css';
import { useAuth } from "../../context/AuthContext";
import {toast} from "react-toastify";
import logo from '../../images/logo.png';

function Layout({ children }) {
    const { isLogin, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const currentSort = new URLSearchParams(window.location.search).get('sort') || 'newest';
            const searchUrl = `/?search=${encodeURIComponent(searchTerm.trim())}&sort=${currentSort}`;
            navigate(searchUrl);
        }
    };

    const handleCart=(e)=>{
        e.preventDefault();
        if(isLogin===false) {
            toast.info("You need to login first!");
            navigate("/signin");
        } else {
            navigate('/cart');
        }
    };

    const handleLogout = () => {
        navigate("/logout");
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.user-dropdown-container') && !e.target.closest('.auth-modal')) {
            setShowDropdown(false);
            setShowAuthModal(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="layout">
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className="header-right">
                        <Link to="/filter" className="nav-link icon-with-text">
                            <FaFilter size={24} />
                            <span>Filter</span>
                        </Link>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Search something..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <FaSearch />
                            </button>
                        </form>
                        <nav className="nav-links">
                            <Link to="/become-merchant" className="nav-link icon-with-text">
                                <FaStore size={24} />
                                <span>Merchant</span>
                            </Link>
                            <Link to="/notifications" className="nav-link icon-with-text">
                                <FaBell size={24} />
                                <span>Notifications</span>
                            </Link>
                            {isLogin === false ? (
                                <div
                                    className="auth-container"
                                    onMouseEnter={() => setShowAuthModal(true)}
                                    onMouseLeave={() => setShowAuthModal(false)}
                                >
                                    <div className="nav-link icon-with-text">
                                        <FaUser size={24} />
                                        <span>Login</span>
                                    </div>
                                    {showAuthModal && (
                                        <div className="auth-modal">
                                            <Link to="/signin" className="auth-button">
                                                Login
                                            </Link>
                                            <Link to="/signup" className="auth-button">
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="user-dropdown-container">
                                    <button className="user-dropdown-button" onClick={toggleDropdown}>
                                        <FaUser size={24} />
                                        <span>{user?.username}</span>
                                        <FaCaretDown />
                                    </button>
                                    {showDropdown && (
                                        <div className="user-dropdown-menu">
                                            <Link
                                                to="/account"
                                                className="dropdown-item"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Account Information
                                            </Link>
                                            {user?.role === 'ROLE_ADMIN' && (
                                                <a
                                                    href="/admin"
                                                    className="dropdown-item"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Admin Dashboard
                                                </a>
                                            )}
                                            {user?.role === 'ROLE_EMPLOYEE' && (
                                                <a
                                                    href="employees/editor"
                                                    className="dropdown-item"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Employee Dashboard
                                                </a>
                                            )}
                                            {user?.role === 'ROLE_MERCHANT' && (
                                                <Link
                                                    to="/merchant/products"
                                                    className="dropdown-item"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Merchant Dashboard
                                                </Link>
                                            )}
                                            <button
                                                className="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            <Link to="/cart" className="cart-icon nav-link icon-with-text" onClick={handleCart}>
                                <FaShoppingCart size={24} />
                                <span>Cart</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">

            </footer>
        </div>
    );
}

export default Layout;