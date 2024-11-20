import { auth } from './config'; // Import your firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';

// Helper function to validate @case.edu email
const isCaseEduEmail = (email) => {
  return email.endsWith('@case.edu');
};

// Sign-up function with email verification
export const signUpWithEmail = async (email, password) => {
  try {
    if (!isCaseEduEmail(email)) {
      throw new Error('Email must end with @case.edu');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    if (!isCaseEduEmail(email)) {
      throw new Error('Email must end with @case.edu');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if email is verified
    if (!user.emailVerified) {
      throw new Error('Email not verified. Please check your inbox and verify your email before logging in.');
    }

    console.log('User logged in:', user);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Forgot password function
export const forgotPassword = async (email) => {
  try {
    if (!isCaseEduEmail(email)) {
      throw new Error('Email must end with @case.edu');
    }

    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Get the currently signed-in user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen for authentication state changes
export const listenForAuthStateChanges = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('User signed in:', user);
      callback(user);
    } else {
      // User is signed out
      console.log('No user signed in');
      callback(null);
    }
  });
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
