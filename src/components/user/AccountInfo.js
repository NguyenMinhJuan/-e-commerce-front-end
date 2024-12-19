import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Avatar,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import './AccountInfo.css';

const AccountInfo = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch user info from backend
        setUserInfo({
            username: user?.username || '',
            email: user?.email || '',
            fullName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || '',
            address: user?.address || '',
        });
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        // Logic for saving will be implemented later with backend
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset form and exit edit mode
        setUserInfo({
            username: user?.username || '',
            email: user?.email || '',
            fullName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || '',
            address: user?.address || '',
        });
        setIsEditing(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                    <Avatar
                        sx={{ width: 100, height: 100, mb: 2 }}
                        alt={userInfo.username}
                        src="/static/images/avatar/1.jpg"
                    />
                    <Typography variant="h4" gutterBottom>
                        Account Information
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={userInfo.username}
                            disabled
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={userInfo.email}
                            disabled
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={userInfo.fullName}
                            onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                            disabled={!isEditing}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={userInfo.phoneNumber}
                            onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
                            disabled={!isEditing}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            value={userInfo.address}
                            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                            disabled={!isEditing}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                    {!isEditing ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                        >
                            Edit Information
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AccountInfo;
