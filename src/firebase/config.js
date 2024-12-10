// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEJt_Z8mggU_ckUCpQjK3-3ArlrBmvPHc",
  authDomain: "ambiente-python-431822.firebaseapp.com",
  projectId: "ambiente-python-431822",
  storageBucket: "ambiente-python-431822.firebasestorage.app",
  messagingSenderId: "952921538910",
  appId: "1:952921538910:web:e3080bad1df2dc94e80fcf",
  measurementId: "G-8TV19DH24E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export { analytics };
export default app;
