import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        price: '',
        quantity: '',
        categoryId: ''
    });
    
    const merchantId = localStorage.getItem('userId');

    useEffect(() => {
        fetchProducts();
    }, [merchantId]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/merchant/${merchantId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditForm({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            categoryId: product.category?.id
        });
        setOpenEdit(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/api/products/${selectedProduct.id}`, {
                ...editForm,
                merchantId: merchantId
            });
            setOpenEdit(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${selectedProduct.id}`);
            setOpenDelete(false);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4 }}>
                Product Management
            </Typography>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price.toLocaleString('vi-VN')} VNĐ</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>{product.category?.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(product)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(product)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={editForm.quantity}
                        onChange={(e) => setEditForm({...editForm, quantity: e.target.value})}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this product?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductManagement;