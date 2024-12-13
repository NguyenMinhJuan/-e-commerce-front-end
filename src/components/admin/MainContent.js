// src/components/admin/MainContent.js
import React from 'react';

const MainContent = () => {
    return (
        <div className="main-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <h2>Dashboard Overview</h2>
                <p>This is a simple admin dashboard layout using HTML and Bootstrap.</p>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">New Users</div>
                            <div className="card-body">
                                <p>Display some statistics or information here.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Sales</div>
                            <div className="card-body">
                                <p>Display sales data or charts here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
