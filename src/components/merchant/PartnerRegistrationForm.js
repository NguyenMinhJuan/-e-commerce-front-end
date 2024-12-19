import React, { useState } from 'react';
import './PartnerRegistrationForm.css'
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const PartnerRegistration = () => {
    const navigate = useNavigate();
    const [partner, setPartner] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartner(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8001/api/shops/signUp", partner).then(response => {
            toast.success(response.data);
            navigate("/signin")
        })
    };

    return (
        <div className="partner-registration-container">
            <div className="partner-registration-form">
                <h2 className="form-title">Join us</h2>
                <p className="form-subtitle">Become out partner</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Shop Name</label>
                        <input
                            id="name"
                            name="name"
                            value={partner.name}
                            onChange={handleChange}
                            placeholder="Enter partner name"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={partner.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            id="address"
                            name="address"
                            value={partner.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            required
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Register
                    </button>
                </form>

                <div className="form-footer">
                    © 2024 Amazon. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default PartnerRegistration;
