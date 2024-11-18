import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { forgotPassword } from '../firebase/firebase';
import {useNavigate} from "react-router-dom"; // Import the forgotPassword function

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await forgotPassword(email);
            setMessage('Password reset link sent to your email!');
            setError('');
        } catch (error) {
            setError('Error sending reset link. Please try again.');
            setMessage('');
        }
    };

    const handleLogin = ()=>{
        navigate("/")
    }

    return (
        <Box className="auth-container">
            <Box className="auth-form">
                <Typography variant="h6">Enter your email to reset your password:</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
                    Send Reset Link
                </Button>
                <Button variant="default" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
                {message && (
                    <Typography color="success" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ForgotPasswordPage;
