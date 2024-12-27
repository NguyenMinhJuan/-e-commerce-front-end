import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for styling
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash, FaCheck, FaTimes, FaUserCheck, FaUserTimes } from 'react-icons/fa'; // Import icons

export function ShopsList() {
    const [shops, setShops] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchShops = () => {
        axios.get('http://localhost:8001/api/admin/shops').then((res) => {
            setShops(res.data);
        });
    };

    useEffect(() => {
        fetchShops();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredShops = shops.filter((shop) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            shop.user.username.toLowerCase().includes(searchTermLower) ||
            (shop.name && shop.name.toLowerCase().includes(searchTermLower))
        );
    });

    const handleAccountStatus = (username) => {
        axios
            .put(`http://localhost:8001/api/user/setStatus/${username}`)
            .then((res) => {
                toast.success(res.data);
                fetchShops();
            });
    };

    return (
        <>
            <span className="badge badge-danger d-flex justify-content-center align-items-center text-dark fs-4 pb-3">
                Shop Management
            </span>

            {/* Thêm ô tìm kiếm */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by username or name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Avatar</th>
                    <th>Account</th>
                    <th colSpan={2} className="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredShops.map((shop, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{shop.name || 'N/A'}</td>
                        <td>{shop.phone || 'N/A'}</td>
                        <td>{shop.address || 'N/A'}</td>
                        <td>{shop.shopStatus}</td>
                        <td>{shop.user.username}</td>
                        <td>{shop.user.email}</td>
                        <td>{shop.user.roles.map((role) => role.roleName).join(', ')}</td>
                        <td>
                            <img className="h-25 w-25" src={shop.user.imgUrl} alt="avatar" />
                        </td>
                        <td>{shop.user.accountStatus}</td>
                        <td>
                                <button className="btn btn-outline-info btn-sm">
                                    <FaTimes /> Rejected
                                </button>
                        </td>
                        <td>
                            <button className="btn btn-outline-success btn-sm">
                                <FaCheck/> Approved
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
