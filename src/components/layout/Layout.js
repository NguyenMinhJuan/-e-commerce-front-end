import React, { useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {FaCaretDown, FaSearch, FaShoppingCart, FaUser} from 'react-icons/fa'; // Imported FaUser for login icon
import './Layout.css';
import { useAuth } from "../../context/AuthContext";
import {toast} from "react-toastify";

function Layout({ children }) {
    const { isLogin, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search submitted:', searchTerm);
        if (searchTerm.trim()) {
            const currentSort = new URLSearchParams(window.location.search).get('sort') || 'newest';
            const searchUrl = `/?search=${encodeURIComponent(searchTerm.trim())}&sort=${currentSort}`;
            console.log('Navigating to:', searchUrl);
            navigate(searchUrl);
        }
    };

    const handleCart=(e)=>{
        e.preventDefault()
        toast.info("You need to login first!")
        if(isLogin===true)
        {
            navigate("/cart")
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
        if (!e.target.closest('.user-dropdown-container')) {
            setShowDropdown(false);
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
                        <h1>Amazon</h1>
                    </Link>
                    <div className="header-right">
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
                            {/* Conditional rendering for login/logout icons */}
                            {isLogin === false ? (
                                <Link to="/signin" className="nav-link">
                                    <FaUser size={24} color="white" />
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <div className="user-dropdown-container">
                                    <button className="user-dropdown-button" onClick={toggleDropdown}>
                                        <FaUser size={24} />
                                        <span>{user?.username}</span>
                                        <FaCaretDown />
                                    </button>
                                    {showDropdown && (
                                        <div className="user-dropdown-menu">
                                            {user?.role === 'ROLE_ADMIN' && (
                                                <>
                                                    <a
                                                        href="http://localhost:3000/admin"
                                                        className="dropdown-item"
                                                        onClick={() => setShowDropdown(false)}
                                                    >
                                                        Admin Dashboard
                                                    </a>
                                                </>
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
                            {/* Cart Icon */}
                            <Link to="/cart" className="cart-icon nav-link" onClick={handleCart}>
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
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>About us</h3>
                        <p>Amazon - Nền tảng mua sắm trực tuyến hàng đầu</p>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: contact@unitrade.com</p>
                        <p>Phone: (84) 123-456-789</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">Facebook</a>
                            <a href="#" className="social-link">Instagram</a>
                            <a href="#" className="social-link">Twitter</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Amazon. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
