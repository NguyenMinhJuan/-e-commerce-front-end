import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import axios from 'axios';
import altImg from "../../images/altImg.png"; // Placeholder image
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Slider from "react-slick"; // Import react-slick for carousel


function ProductDetail() {
    const navigate = useNavigate();
    const { isLogin } = useAuth();
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8001/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Có lỗi khi tải sản phẩm:", error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        if (isLogin !== true) {
            navigate('/signin');
            toast.info("You need to be logged in!");
        } else {
            toast.success("Add new cart successfully!")
        }
    }

    // Slick settings for carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Automatically play the carousel
        autoplaySpeed: 3000, // 3 seconds per image
        fade: true, // Fade transition effect
    };

    return (
        <section className="section-product-detail">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {/* Carousel for images */}
                        <Slider {...settings}>
                            {product.images && product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <div key={index} className="carousel-item">
                                        <img
                                            src={image || altImg} // Use placeholder if no image URL
                                            className="img-fluid"
                                            alt={product.name || "Product image"} // Use product name for alt text
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <img
                                        src={product.imageUrl || altImg} // Fallback to altImg if no imageUrl
                                        className="img-fluid"
                                        alt={product.name || "Product image"}
                                    />
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="col-md-6">
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
