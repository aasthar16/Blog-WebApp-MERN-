// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-webapp-2ce20.firebaseapp.com",
  projectId: "mern-blog-webapp-2ce20",
  storageBucket: "mern-blog-webapp-2ce20.firebasestorage.app",
  messagingSenderId: "193740773778",
  appId: "1:193740773778:web:30cc06b6b5cd5b17bcc94b",
  measurementId: "G-6QCN6S91J6"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
