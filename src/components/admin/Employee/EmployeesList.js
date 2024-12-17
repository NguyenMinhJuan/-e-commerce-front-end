import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS để styling

export function EmployeesList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Lấy danh sách người dùng từ API
        axios.get("http://localhost:8001/api/admin/employees").then((res) => {
            setEmployees(res.data);
        })
    }, []);

    const handleDelete=(id)=>{
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure want to delete this person?',
            buttons: [
                {
                    label: 'Absolutely!',
                    onClick: () => deleteEmployee (id)
                },
                {
                    label: 'No!',
                }
            ]
        });
    }

    const deleteEmployee = (id)=>{
        axios.delete(`http://localhost:8001/api/admin/employees/${id}`).then((res) => {})
    }

    return (
        <>
<span className="badge badge-danger d-flex justify-content-center align-items-center text-dark fs-4 pb-3">
  Employee management
</span>
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
                    <th>Profile pic</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
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
                            <button className="btn btn-outline-danger btn-sm" onClick={()=>{
                                handleDelete(user.user.id);
                            }}>Delete</button>
                        </td>
                        <td>
                            <button className="btn btn-outline-success btn-sm">Update</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
