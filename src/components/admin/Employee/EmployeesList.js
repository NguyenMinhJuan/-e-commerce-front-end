import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export function EmployeesList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Lấy danh sách người dùng từ API
        axios.get("http://localhost:8001/api/admin/employees").then((res) => {
            setEmployees(res.data);
        })
    }, []);

    return (
        <>
<span className="badge badge-danger d-flex justify-content-center align-items-center text-dark fs-4 pb-5">
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
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name || 'N/A'}</td>
                        {/* Nếu không có tên, hiển thị 'N/A' */}
                        <td>{user.phone || 'N/A'}</td>
                        {/* Hiển thị nếu không có số điện thoại */}
                        <td>{user.address || 'N/A'}</td>
                        {/* Hiển thị nếu không có địa chỉ */}
                        <td>{user.salary ? user.salary.toLocaleString() : 'N/A'}</td>
                        {/* Định dạng tiền tệ nếu có */}
                        <td>{user.user.username}</td>
                        <td>{user.user.email}</td>
                        <td>
                            {/* Hiển thị tất cả các vai trò, trong trường hợp có nhiều vai trò */}
                            {user.user.roles.map(role => role.roleName).join(', ')}
                        </td>
                        <td>
                            <button className="btn btn-outline-danger btn-sm">Delete</button>
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
