import React, {useEffect, useState, useCallback} from 'react';
import './ProductDetail.css';
import axios from 'axios';
import altImg from "../../images/altImg.png";
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {useAuth} from "../../context/AuthContext";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

function ProductDetail() {
    const navigate = useNavigate();
    const {isLogin} = useAuth();
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [shopInfo, setShopInfo] = useState(null);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isInStock, setIsInStock] = useState(false);
    const [stockMessage, setStockMessage] = useState("");
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const [productResponse, imagesResponse] = await Promise.all([
                    axios.get(`http://localhost:8001/api/products/${id}`),
                    axios.get(`http://localhost:8001/api/images/${id}`)
                ]);

                setProduct(productResponse.data);

                // Fetch shop information
                if (productResponse.data.shopId) {
                    try {
                        const shopResponse = await axios.get(`http://localhost:8001/api/shops/1`);
                        setShopInfo(shopResponse.data);
                    } catch (shopError) {
                        console.error("Error fetching shop data:", shopError);
                    }
                }

                setImages(imagesResponse.data.length > 0
                    ? imagesResponse.data
                    : [{imgUrl: altImg}]);

                try {
                    const stockResponse = await axios.get(`http://localhost:8001/api/products/checkInStock/${id}`);
                    setIsInStock(true);
                    setStockMessage(stockResponse.data);
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 404) {
                            setIsInStock(false);
                            setStockMessage(error.response.data);
                        } else {
                            setIsInStock(false);
                            setStockMessage("Something went wrong");
                        }
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
                setIsInStock(false);
                setStockMessage("Error loading product");
            }
        };

        fetchProductData();
    }, [id]);

    const handlePrevImage = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handleAddToCart = useCallback((productId) => {
        if (!isLogin) {
            navigate('/signin');
            toast.info("You need to login first!");
            alert("shop name"+shopInfo.name)
            return;
        }

        const checkAndAddToCart = async () => {
            try {
                const checkResponse = await axios.get(
                    `http://localhost:8001/api/cart/isProductExistInCart/${username}/${productId}`
                );

                if (checkResponse.status === 200) {
                    const updateResponse = await axios.put(
                        `http://localhost:8001/api/cart/increaseQuantityByOne/${productId}/${username}`
                    );
                    toast.success("Product quantity updated in cart!");
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    try {
                        await axios.post(
                            `http://localhost:8001/api/cart/add/${productId}/${username}`
                        );
                        toast.success("Product added to cart!");
                    } catch (addError) {
                        toast.error(
                            "Error adding product to cart: " +
                            addError.response?.data?.message || addError.message
                        );
                    }
                } else {
                    toast.error(
                        "Error checking product in cart: " +
                        error.response?.data?.message || error.message
                    );
                }
            }
        };

        checkAndAddToCart();
    }, [isLogin, navigate, username]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="error-message">Something went wrong :(</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="product-gallery">
                            <div className="main-image-wrapper">
                                <img
                                    src={images[currentImageIndex]?.imgUrl || altImg}
                                    alt={product.name}
                                    className="main-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = altImg;
                                    }}
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            className="gallery-nav prev"
                                            onClick={handlePrevImage}
                                            aria-label="Previous image"
                                        >
                                            <FaArrowLeft/>
                                        </button>
                                        <button
                                            className="gallery-nav next"
                                            onClick={handleNextImage}
                                            aria-label="Next image"
                                        >
                                            <FaArrowRight/>
                                        </button>
                                    </>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="thumbnails-container">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            <img
                                                src={image.imgUrl || altImg}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = altImg;
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="product-info">
                            <h1 className="product-title">{product.name}</h1>
                            {shopInfo && (
                                <div className="shop-info">
                                    <h3>Seller: {shopInfo.name}</h3>
                                </div>
                            )}
                            <div className="product-price">${product.price}</div>

                            <div className="product-description">
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="product-actions">
                                {isInStock ? (
                                    <button
                                        className="btn-add-to-cart"
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        Add to cart
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="btn-add-to-cart"
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        {stockMessage}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;