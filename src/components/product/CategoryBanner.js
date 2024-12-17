import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ShoppingBag,
    Watch,
    Headphones,
    Smartphone,
    Shirt,
    Cpu,
    Book,
    Gift
} from 'lucide-react';

function CategoryBanner() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryIcons = {
        'Fashion': ShoppingBag,
        'Electronics': Smartphone,
        'Accessories': Headphones,
        'Watches': Watch,
        'Clothing': Shirt,
        'Technology': Cpu,
        'Books': Book,
        'Gifts': Gift
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return (
        <div className="container text-center my-4">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return null;

    return (
        <div className="container-fluid bg-light py-4">
            <div className="container">
                <h3 className="mb-4 text-center">Browse Categories</h3>
                <div
                    className="d-flex overflow-x-auto pb-3"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ffc107 #f8f9fa' // warning color and light background
                    }}
                >
                    {categories.map((category) => {
                        const CategoryIcon = categoryIcons[category.name] || ShoppingBag;

                        return (
                            <div
                                key={category.id}
                                className="me-3 flex-shrink-0"
                                style={{width: '200px'}}
                            >
                                <Link
                                    to={`/category/${category.id}`}
                                    className="text-decoration-none"
                                >
                                    <div
                                        className="card border-0 text-center hover-lift"
                                    >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-center mb-3">
                                                <div
                                                    className="bg-warning text-white rounded-circle p-3 d-flex align-items-center justify-content-center"
                                                    style={{width: '80px', height: '80px'}}
                                                >
                                                    <CategoryIcon size={40} />
                                                </div>
                                            </div>
                                            <h5 className="card-title text-dark">{category.name}</h5>
                                            <p className="card-text text-muted small">
                                                {category.productCount || 0} Products
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx>{`
                .overflow-x-auto {
                    overflow-x: auto;
                    display: flex;
                    scrollbar-width: thin;
                }
                .overflow-x-auto::-webkit-scrollbar {
                    height: 8px;
                }
                .overflow-x-auto::-webkit-scrollbar-track {
                    background: #f8f9fa;
                }
                .overflow-x-auto::-webkit-scrollbar-thumb {
                    background-color: #ffc107;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}

export default CategoryBanner;