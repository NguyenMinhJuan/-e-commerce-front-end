import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Có lỗi khi tải sản phẩm:", error);
            });
    });

    return (
        <>
            <section className="section-products">
                <div className="container">
                    <div className="row">
                        {/* Lặp qua danh sách sản phẩm */}
                        {products.map((product, index) => (
                            <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                <div id={`product-${product.id}`} className="single-product">
                                    <div className="part-1">
                                        <ul>
                                            <li><a href="#"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#"><i className="fas fa-heart"></i></a></li>
                                            <li><a href="#"><i className="fas fa-plus"></i></a></li>
                                            <li><a href="#"><i className="fas fa-expand"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="part-2">
                                        <h3 className="product-title">{product.name}</h3>
                                        {product.oldPrice && <h4 className="product-old-price">${product.oldPrice}</h4>}
                                        <h4 className="product-price">${product.price}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductList;
