import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, [username]);

    const fetchCartItems = () => {
        axios.get(`http://localhost:8001/api/cart/${username}`)
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.error("Error while loading products:", error);
            });
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            axios.delete(`http://localhost:8001/api/cart/${itemId}`)
                .then(() => {
                    fetchCartItems();
                })
                .catch((error) => {
                    console.error("Error removing item:", error);
                });
        } else {
            axios.put(`http://localhost:8001/api/cart/${itemId}`, { quantity: newQuantity })
                .then(() => {
                    fetchCartItems();
                })
                .catch((error) => {
                    console.error("Error updating quantity:", error);
                });
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    };

    const removeItem = (itemId) => {
        axios.delete(`http://localhost:8001/api/cart/${itemId}`)
            .then(() => {
                fetchCartItems();
            })
            .catch((error) => {
                console.error("Error removing item:", error);
            });
    };

    return (
        <>
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
                                                    <a className="fas fa-long-arrow-alt-left me-2 text-decoration-none"></a>Continue shopping
                                                </Link>
                                            </h5>
                                            <hr/>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">Shopping cart</p>
                                                    <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                                </div>
                                            </div>

                                            {/* Card items */}
                                            {cartItems.length > 0 ? cartItems.map((item) => (
                                                <div className="card mb-3" key={item.id}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <img
                                                                        src={item.product.imageUrl}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{width: '65px'}}/>
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.product.name}</h5>
                                                                    <p className="small mb-0">{item.product.description}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div className="d-flex align-items-center me-3">
                                                                    <button
                                                                        className="btn btn-sm btn-outline-secondary me-2"
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <h5 className="fw-normal mb-0 mx-2">{item.quantity}</h5>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-secondary ms-2"
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <div style={{width: '80px'}}>
                                                                    <h5 className="mb-0">${(item.product.price * item.quantity).toFixed(2)}</h5>
                                                                </div>
                                                                <a
                                                                    href="#!"
                                                                    style={{color: '#cecece'}}
                                                                    onClick={() => removeItem(item.id)}
                                                                >
                                                                    <i className="fas fa-trash-alt bg-danger"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <p>No items in your cart</p>
                                            )}
                                        </div>

                                        {/* Card details */}
                                        <div className="col-lg-5">
                                            <div className="card bg-primary text-dark rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Card details</h5>
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                            className="img-fluid rounded-3"
                                                            style={{width: '45px'}}
                                                            alt="Avatar"/>
                                                    </div>

                                                    <hr className="my-4"/>

                                                    {/* Total details */}
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

                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-block btn-lg"
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <span>${(calculateSubtotal() + 20).toFixed(2)}</span>
                                                            <span><i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                        </div>
                                                    </button>
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
        </>
    );
}

export default Cart;