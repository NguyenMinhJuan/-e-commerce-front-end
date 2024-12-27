import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try {
            setIsLoading(true);
            const cartResponse = await axios.get(`http://localhost:8001/api/cart/${username}`);

            const itemsWithImages = await Promise.all(
                cartResponse.data.map(async (item) => {
                    try {
                        const imageResponse = await axios.get(`http://localhost:8001/api/images/${item.product.id}`);
                        const firstImage = imageResponse.data[0];
                        const imageUrl = firstImage ? firstImage.imgUrl : '/placeholder.jpg';

                        return {
                            ...item,
                            product: {
                                ...item.product,
                                imageUrl: imageUrl
                            }
                        };
                    } catch (error) {
                        console.error(`Error fetching image for product ${item.product.id}:`, error);
                        return {
                            ...item,
                            product: {
                                ...item.product,
                                imageUrl: '/placeholder.jpg'
                            }
                        };
                    }
                })
            );

            setCartItems(itemsWithImages);
            setError(null);
        } catch (error) {
            console.error("Error while loading cart:", error);
            setError("Failed to load cart items");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (username) {
            fetchCartItems();
        }
    }, [username]);

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    };

    const removeItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8001/api/cart/${itemId}`);
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item from cart");
        }
    };

    const decreaseQuantity = async (itemId) => {
        try {
            const item = cartItems.find(item => item.id === itemId);
            if (item.quantity === 1) {
                await removeItem(itemId);
                return;
            }

            await axios.put(`http://localhost:8001/api/cart/decrease/${itemId}`);
            setCartItems(prev => prev.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }));
        } catch (error) {
            console.error("Error decreasing quantity:", error);
            toast.error("Failed to decrease quantity");
        }
    };

    const increaseQuantity = async (itemId) => {
        try {
            const item = cartItems.find(item => item.id === itemId);

            // Check if increasing would exceed available stock
            if (item.quantity >= item.product.quantity) {
                toast.warning("Cannot exceed available stock quantity");
                return;
            }

            const response = await axios.put(`http://localhost:8001/api/cart/increase/${itemId}`);

            if (response.status === 200) {
                setCartItems(prev => prev.map(item => {
                    if (item.id === itemId) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                }));
            }
        } catch (error) {
            console.error("Error increasing quantity:", error);
            if (error.response?.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Failed to increase quantity");
            }
        }
    };

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <section className="h-100 h-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3">
                                            <Link to="/" className="text-body text-decoration-none">
                                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                Continue shopping
                                            </Link>
                                        </h5>
                                        <hr/>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                            </div>
                                        </div>

                                        {cartItems.length > 0 ? cartItems.map((item) => (
                                            <div className="card mb-3" key={item.id}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img
                                                                    src={item.product.imageUrl}
                                                                    className="img-fluid rounded-3"
                                                                    alt={item.product.name}
                                                                    style={{
                                                                        width: '65px',
                                                                        height: '65px',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                    onError={(e) => {
                                                                        if (e.target.src !== '/placeholder.jpg') {
                                                                            e.target.src = '/placeholder.jpg';
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>{item.product.name}</h5>
                                                                <small className="text-muted">
                                                                    Available: {item.product.quantity}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div className="d-flex align-items-center me-3">
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                                    onClick={() => decreaseQuantity(item.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                <h5 className="fw-normal mb-0 mx-2">{item.quantity}</h5>
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary ms-2"
                                                                    onClick={() => increaseQuantity(item.id)}
                                                                    disabled={item.quantity >= item.product.quantity}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <div style={{width: '80px'}}>
                                                                <h5 className="mb-0">${(item.product.price * item.quantity).toFixed(2)}</h5>
                                                            </div>
                                                            <button
                                                                className="btn btn-link text-danger ms-2"
                                                                onClick={() => removeItem(item.id)}
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <p>No items in your cart</p>
                                        )}
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="card bg-primary text-dark rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Card details</h5>
                                                </div>

                                                <hr className="my-4"/>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${calculateSubtotal().toFixed(2)}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Shipping</p>
                                                    <p className="mb-2">$20.00</p>
                                                </div>

                                                <div className="d-flex justify-content-between mb-4">
                                                    <p className="mb-2">Total</p>
                                                    <p className="mb-2">${(calculateSubtotal() + 20).toFixed(2)}</p>
                                                </div>

                                                {cartItems.length === 0 ? (
                                                    <button type="button" className="btn btn-info btn-block btn-lg"
                                                            disabled>
                                                        <div className="d-flex justify-content-between">
                                                            <span>Your shopping cart is empty</span>
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-info btn-block btn-lg">
                                                        <div className="d-flex justify-content-between">
                                                            <span>Checkout ${(calculateSubtotal() + 20).toFixed(2)}</span>
                                                            <span>
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;