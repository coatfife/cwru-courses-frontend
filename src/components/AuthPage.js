import React, {useContext, useState} from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { signUpWithEmail, loginWithEmail, forgotPassword, logout, getCurrentUser } from '../firebase/firebase';
import {CourseContext} from "../contexts/CourseContext";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setUser} = useContext(CourseContext);

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
    try {
      await forgotPassword(email);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };


  const renderForm = () => {

    return (
      <Box>
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
        <Button variant="outlined" onClick={handleSignIn} fullWidth sx={{ mt: 2 }}>
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
              backgroundColor: '#054398'  
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
    );
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid lightgray', borderRadius: '8px' }}>
      {renderForm()}
    </Box>
  );
};

export default AuthPage;
