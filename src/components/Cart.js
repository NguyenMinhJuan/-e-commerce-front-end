import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get(`http://localhost:8001/api/cart/${username}`)
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.error("Error while loading products:", error);
            });
    }, [username]);

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
                                                <a href="#!" className="text-body">
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                                                </a>
                                            </h5>
                                            <hr />

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
                                                                        src={item.product.imageUrl} // assuming imageUrl exists in the product object
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{ width: '65px' }} />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.product.name}</h5>
                                                                    <p className="small mb-0">{item.product.description}</p> {/* assuming description exists */}
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div style={{ width: '50px' }}>
                                                                    <h5 className="fw-normal mb-0">{item.quantity}</h5>
                                                                </div>
                                                                <div style={{ width: '80px' }}>
                                                                    <h5 className="mb-0">${item.product.price * item.quantity}</h5> {/* Assuming price exists */}
                                                                </div>
                                                                <a href="#!" style={{ color: '#cecece' }}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <p>No items in your cart</p> // If cartItems is empty
                                            )}

                                        </div>

                                        {/* Card details */}
                                        <div className="col-lg-5">
                                            <div className="card bg-danger text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Card details</h5>
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                            className="img-fluid rounded-3"
                                                            style={{ width: '45px' }}
                                                            alt="Avatar" />
                                                    </div>

                                                    {/* Cardholder info and card number input fields */}
                                                    {/* Add form elements and button here as you have already written */}

                                                    <hr className="my-4" />

                                                    {/* Total details */}
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">$20.00</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total</p>
                                                        <p className="mb-2">${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) + 20}</p>
                                                    </div>

                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                                                            className="btn btn-info btn-block btn-lg">
                                                        <div className="d-flex justify-content-between">
                                                            <span>${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) + 20}</span>
                                                            <span>  <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
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
