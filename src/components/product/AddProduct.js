import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa';
import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const [categories, setCategories] = useState([]);  // State để lưu danh sách categories
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Gọi API để lấy danh mục khi component được mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/categories');  // Gọi đúng API lấy danh mục
            setCategories(response.data);  // Lưu danh sách categories vào state
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories.');
        }
    };

    // Xử lý thay đổi khi người dùng chọn file
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            setShowCustomInput(true);
            setCategory('');
        } else {
            setShowCustomInput(false);
            setCategory(value);
            setCustomCategory('');
        }
    };

    const handleCustomCategoryChange = (e) => {
        const value = e.target.value;
        setCustomCategory(value);
        setCategory(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        try {
            setSaving(true);
            setError(null);

            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', description.trim());
            formData.append('category', category.trim());

            files.forEach((file) => {
                formData.append('files', file);
            });

            await axios.post('http://localhost:8080/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/');
        } catch (err) {
            setError(err.response?.data || 'An error occurred while adding the product');
            setSaving(false);
        }
    };

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [previews]);

    return (
        <div className="add-product">
            <div className="add-product-header">
                <h2 className="text-center">New Product</h2>
                <Link to="/" className="back-link tooltip">
                    <FaArrowLeft /> Go Back
                    <span className="tooltip-text">Return to product list</span>
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter quantity"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <div className="category-input-group">
                        <select
                            value={showCustomInput ? 'custom' : category}
                            onChange={handleCategoryChange}
                            className="category-select"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                            <option value="custom">+ Add new category</option>
                        </select>

                        {showCustomInput && (
                            <input
                                type="text"
                                value={customCategory}
                                onChange={handleCustomCategoryChange}
                                placeholder="Enter new category name"
                                className="custom-category-input"
                            />
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        rows="5"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Images:</label>
                    <div className="image-upload-container">
                        <div className="preview-container">
                            {previews.map((preview, index) => (
                                <div key={index} className="image-preview-wrapper">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="image-preview"
                                    />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => removeFile(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label className="upload-button tooltip">
                            <FaImage /> Add Image
                            <span className="tooltip-text">Select multiple images to upload</span>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    <FaSave />
                    Save Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
