import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from "../../context/AuthContext";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const isLogin=useAuth();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Fetch product details
                const productResponse = await axios.get(`http://localhost:8001/api/products/${id}`);
                setProduct(productResponse.data);

                // Fetch product images
                const imagesResponse = await axios.get(`http://localhost:8001/api/images/${id}`);
                setProductImages(imagesResponse.data);

                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) return (
        <div className="container text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="alert alert-danger">Error loading product</div>
        </div>
    );

    if (!product) return (
        <div className="container mt-5">
            <div className="alert alert-warning">No product found</div>
        </div>
    );

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <Carousel>
                        {productImages.length > 0 ? (
                            productImages.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.imgUrl}
                                        alt={`Slide ${index + 1}`}
                                        style={{
                                            maxHeight: '400px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Carousel.Item>
                            ))
                        ) : (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={{
                                        maxHeight: '400px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4">{product.name}</h1>
                    <p className="text-muted mb-3">{product.description}</p>

                    <div className="mb-3">
                        <h3 className="text-primary">${product.price}</h3>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <strong>Category:</strong>
                                    <p>{product.category.name}</p>
                                </div>
                                <div className="col-6">
                                    <strong>Stock:</strong>
                                    <p>{product.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg w-100">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;