import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './ProductDetail.css';
import axios from 'axios';
import altImg from "../../images/altImg.png";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Slider from "react-slick";

// Custom hook for fetching product data
const useProductData = (id) => {
    const [product, setProduct] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const [productResponse, imageResponse] = await Promise.all([
                    axios.get(`http://localhost:8001/api/products/${id}`),
                    axios.get(`http://localhost:8001/api/images/${id}`)
                ]);

                setProduct(productResponse.data);
                setProductImage(imageResponse.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    return { product, productImage, loading, error };
};

function ProductDetail() {
    const navigate = useNavigate();
    const { isLogin } = useAuth();
    const { id } = useParams();

    const { product, productImage, loading, error } = useProductData(id);

    // Memoized carousel settings to prevent re-creation on every render
    const carouselSettings = useMemo(() => ({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
    }), []);

    // Memoized add to cart handler
    const handleAddToCart = useCallback(() => {
        if (!isLogin) {
            navigate('/signin');
            toast.info("You need to be logged in!");
        } else {
            toast.success("Add new cart successfully!");
        }
    }, [isLogin, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading product details</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    return (
        <section className="section-product-detail">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 product-detail-left">
                        <Slider {...carouselSettings}>
                            {productImage && productImage.length > 0 ? (
                                productImage.map((image, index) => (
                                    <div key={index} className="carousel-item">
                                        <img
                                            src={image.imgUrl || altImg}
                                            className="img-fluid"
                                            alt={`Product image ${index + 1}`}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <img
                                        src={product.imageUrl || altImg}
                                        className="img-fluid"
                                        alt={product.name || "Product image"}
                                    />
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="col-md-6 product-detail-right">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-description">{product.description}</p>
                        <div className="product-price">
                            <span className="h4">${product.price}</span>
                        </div>
                        <div className="product-details">
                            <p><strong>Category:</strong> {product.category.name}</p>
                            <p><strong>Stock:</strong> {product.quantity}</p>
                            <p><strong>Brand:</strong> {product.brand}</p>
                            <p><strong>Details:</strong> {product.details}</p>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
