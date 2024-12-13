import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import axios from 'axios';
import altImg from "../../images/altImg.png"; // Placeholder image

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // Track current page
    const [productsPerPage] = useState(12); // Set 12 products per page

    useEffect(() => {
        axios.get('http://localhost:8001/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Có lỗi khi tải sản phẩm:", error);
            });
    }, []); // Empty dependency array to avoid infinite loop

    // Get the products to be displayed based on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <>
            <section className="section-products">
                <div className="container">
                    <div className="row">
                        {/* Loop through and display the current products */}
                        {currentProducts.map((product, index) => (
                            <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card fixed-size-card">
                                    <Link to={`/products/${product.id}`}>
                                        <img
                                            src={product.imageUrl || altImg} // Fallback to altImg if no imageUrl
                                            className="card-img-top"
                                            alt={product.name || "Product image"} // Use product name for alt text
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p> {/* Description with truncation */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 mb-0">${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination-container d-flex justify-content-center mt-4">
                        <ul className="pagination">
                            {/* Previous Page */}
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Previous</button>
                            </li>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            {/* Next Page */}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &raquo;</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductList;
