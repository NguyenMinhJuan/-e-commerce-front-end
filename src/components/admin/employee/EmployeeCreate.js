import React, { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export function EmployeesCreate() {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        age: '',
        phone: '',
        address: '',
        salary: '',
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8001/api/admin/employees", newEmployee)
            .then(response => {
                setMessage('employee created successfully!');
                setNewEmployee({
                    name: '',
                    age: '',
                    phone: '',
                    address: '',
                    salary: '',
                });
            })
            .catch(error => {
                setMessage('Error creating employee.');
                console.error("There was an error creating the employee!", error);
            });
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-6 col-lg-4 p-4 border rounded shadow-sm">
                    <h2 className="text-center mb-4">New Employee</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={newEmployee.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                name="age"
                                value={newEmployee.age}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={newEmployee.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={newEmployee.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                id="salary"
                                name="salary"
                                value={newEmployee.salary}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add Employee</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
