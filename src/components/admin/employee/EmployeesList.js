import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS để styling
import { ToastContainer, toast } from 'react-toastify';


export function EmployeesList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEmployees = () => {
        axios.get("http://localhost:8001/api/admin/employees").then((res) => {
            setEmployees(res.data);
        });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(employee => {
        const searchTermLower = searchTerm.toLowerCase();
        return employee.user.username.toLowerCase().includes(searchTermLower) ||
               (employee.name && employee.name.toLowerCase().includes(searchTermLower));
    });

    const handleAccountStatus = (username) => {
        axios.put(`http://localhost:8001/api/user/setStatus/${username}`)
            .then((res) => {
                toast.success( res.data);
                fetchEmployees();
            });
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure want to delete this person?',
            buttons: [
                {
                    label: 'Absolutely!',
                    onClick: () => deleteEmployee(id)
                },
                {
                    label: 'No!',
                }
            ]
        });
    };

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:8001/api/admin/employees/${id}`)
            .then(() => {
                // Cập nhật lại danh sách sau khi xóa
                fetchEmployees();
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
    };

    return (
        <>
            <span className="badge badge-danger d-flex justify-content-center align-items-center text-dark fs-4 pb-3">
                Employee management
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
                    <th>Salary</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Avatar</th>
                    <th>Status</th>
                    <th colSpan={3} className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((user,index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>{user.address || 'N/A'}</td>
                        <td>{user.salary ? user.salary.toLocaleString() : 'N/A'}</td>
                        <td>{user.user.username}</td>
                        <td>{user.user.email}</td>
                        <td>
                            {user.user.roles.map(role => role.roleName).join(', ')}
                        </td>
                        <td>
                            <img className="h-25 w-25" src={user.user.imgUrl} alt="avatar"></img>
                        </td>
                        <td>
                            {user.user.accountStatus}
                        </td>
                        <td>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => {
                                handleDelete(user.user.id);
                            }}>Delete
                            </button>
                        </td>
                        <td>
                            <button
                                className={`btn btn-outline-${user.user.accountStatus === "INACTIVE" ? 'success' : 'warning'} btn-sm`}
                                onClick={() => handleAccountStatus(user.user.username)}
                            >
                                {user.user.accountStatus === "INACTIVE" ? 'Active' : 'Inactive'}
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-outline-info btn-sm">reset</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
