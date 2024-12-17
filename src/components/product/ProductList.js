import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import altImg from "../../images/altImg.png";
import CategoryBanner from "./CategoryBanner";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Có lỗi khi tải sản phẩm:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Truncate description
    const truncateDescription = (desc, maxLength = 100) => {
        return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
    };

    if (loading) return (
        <div className="container text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="alert alert-danger">Error loading products</div>
        </div>
    );

    return (
        <section className="section-products bg-light py-5">
            <div className="container">
                <div>
                    <CategoryBanner/>
                </div>
                <h2 className="text-center mb-4">Our Products</h2>
                <div className="row g-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-0 hover-elevate">
                                <Link to={`/products/${product.id}`} className="text-decoration-none">
                                    <div className="card-img-top-container"
                                         style={{height: '250px', overflow: 'hidden'}}>
                                        <img
                                            src={product.imageUrl || altImg}
                                            className="card-img-top object-fit-cover w-100 h-100"
                                            alt={product.name}
                                        />
                                    </div>
                                </Link>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-dark mb-2">{product.name}</h5>
                                    <p className="card-text text-muted mb-3">
                                        {truncateDescription(product.description)}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="h5 text-primary mb-0">${product.price.toFixed(2)}</span>
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            Buy now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
}

export default ProductList;
