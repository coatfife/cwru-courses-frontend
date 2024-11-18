import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { signUpWithEmail, loginWithEmail, forgotPassword, getCurrentUser } from '../firebase/firebase';
import { CourseContext } from "../contexts/CourseContext";
import './AuthPage.css';
import {useNavigate} from "react-router-dom"; // Import CSS file for styling the Auth page

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(CourseContext);
  const navigate = useNavigate();

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
      const user = await loginWithEmail(email, password);
      setError('');
      setUser(getCurrentUser());
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
      navigate('/forgot-password');
  };


  return (
    <Box className="auth-container"> {/* Wrapper container with gradient background */}
      <Box className="auth-form"> {/* Inner box styled as a card with rounded corners and shadow */}
        <Box className="auth-header"> {/* Container for the header text */}
          <h1>Welcome to Rate CWRU Courses!</h1> {/* Main welcome header */}
          <body1>Please enter your details below.</body1> {/* Subheader message */}
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
            backgroundColor: '#003071',  // Custom background color for Sign Up button
            color: 'white !important', // White text for contrast on dark background
            '&:hover': {
              backgroundColor: '#054398', // Slightly lighter blue on hover
            }
          }}
        >
          Sign Up
        </Button>
        <Button variant="text" onClick={handleForgotPassword} fullWidth sx={{ mt: 2 }}>
          Forgot Password?
        </Button>
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
