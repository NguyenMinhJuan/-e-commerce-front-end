import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import axios from 'axios';
import altImg from "../../images/altImg.png"; // Placeholder image
import CategoryBanner from './CategoryBanner';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [currentPage, setCurrentPage] = useState(1);  // Track current page
    const [productsPerPage] = useState(12); // Set 12 products per page

    useEffect(() => {
        // Fetch products
        axios.get('http://localhost:8001/api/products')
            .then((response) => {
                setProducts(response.data);
                // Fetch images for each product
                response.data.forEach(product => {
                    axios.get(`http://localhost:8001/api/images/${product.id}`)
                        .then(imgResponse => {
                            setProductImages(prev => ({
                                ...prev,
                                [product.id]: imgResponse.data[0]?.imgUrl || altImg
                            }));
                        })
                        .catch(error => {
                            console.error(`Error fetching images for product ${product.id}:`, error);
                            setProductImages(prev => ({
                                ...prev,
                                [product.id]: altImg
                            }));
                        });
                });
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
                    <div>
                        <CategoryBanner></CategoryBanner>
                    </div>
                    <div className="row">
                        <h3 className="text-center pb-3 pt-3">Best seller!</h3>
                        {currentProducts.map((product, index) => (
                            <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card product-card">
                                    <div className="img-container">
                                        <Link to={`/products/${product.id}`}>
                                            <img
                                                src={productImages[product.id] || altImg}
                                                className="card-img-top product-img"
                                                alt={product.name || "Product image"}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = altImg;
                                                }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">{product.name}</h5>
                                        <p className="card-text description-truncate">{product.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="price">${product.price}</span>
                                            <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm btn-view-details">
                                                View Details
                                            </Link>
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
