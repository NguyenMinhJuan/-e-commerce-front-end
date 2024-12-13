import React, { useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; // Imported FaUser for login icon
import './Layout.css';
import { useAuth } from "../../context/AuthContext";

function Layout({ children }) {
    const { isLogin } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
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

    const handleCart=()=>{
        if(isLogin===true)
        {
            navigate("/cart")
        }
        else {
            navigate("/signin")
        }
    }

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
                                    <FaUser size={24} color="white" /> {/* Login icon */}
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <Link to="/logout" className="nav-link">
                                    <span>Logout</span>
                                </Link>
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
                        <h3>Về chúng tôi</h3>
                        <p>UniTrade - Nền tảng mua sắm trực tuyến hàng đầu</p>
                    </div>
                    <div className="footer-section">
                        <h3>Liên hệ</h3>
                        <p>Email: contact@unitrade.com</p>
                        <p>Điện thoại: (84) 123-456-789</p>
                    </div>
                    <div className="footer-section">
                        <h3>Theo dõi</h3>
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
