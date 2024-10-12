import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCSRGEfPvWLa0BZSILPqZk9YrT_FBE3NyI",
  authDomain: "cwru-courses.firebaseapp.com",
  projectId: "cwru-courses",
  storageBucket: "cwru-courses.appspot.com",
  messagingSenderId: "406423303050",
  appId: "1:406423303050:web:c77feaed56bddae0738e73",
  measurementId: "G-Z3TMZG0R7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export { auth }; // Exporting the initialized auth instance