import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { signUpWithEmail, loginWithEmail, forgotPassword } from '../firebase/firebase';
import './AuthPage.css';
import {toast} from "react-toastify";

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle between forms

    const handleSignUp = async () => {
        try {
            await signUpWithEmail(email, password);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignIn = async () => {
        try {
            await loginWithEmail(email, password);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleForgotPasswordSubmit = async () => {
        try {
            await forgotPassword(email);
            setError('');
            toast.success('Password reset email sent. Please check your inbox.');
            setIsForgotPassword(false); // Return to login after successful reset
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box className="auth-container">
            <Box className="auth-form">
                {!isForgotPassword ? (
                    <>
                        <Box className="auth-header">
                            <h1>Welcome to Rate CWRU Courses!</h1>
                            <p>Please enter your details below.</p>
                        </Box>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="outlined" onClick={handleSignIn} fullWidth className="auth-form__button">
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSignUp}
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#003071',
                                color: 'white !important',
                                '&:hover': {
                                    backgroundColor: '#054398',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => setIsForgotPassword(true)} // Toggle to forgot password form
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Forgot Password?
                        </Button>
                    </>
                ) : (
                    <>
                        <Box className="auth-header">
                            <h1>Reset Your Password</h1>
                            <p>Please enter your email to reset your password.</p>
                        </Box>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={handleForgotPasswordSubmit}
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#003071',
                                color: 'white !important',
                                '&:hover': {
                                    backgroundColor: '#054398',
                                },
                            }}
                        >
                            Send Reset Link
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => setIsForgotPassword(false)} // Return to login form
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Back to Login
                        </Button>
                    </>
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

export default AuthPage;
