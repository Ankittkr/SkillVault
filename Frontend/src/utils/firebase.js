// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "loginskillvault.firebaseapp.com",
    projectId: "loginskillvault",
    storageBucket: "loginskillvault.firebasestorage.app",
    messagingSenderId: "704626797049",
    appId: "1:704626797049:web:f1d513b526158cd6cfb528",
    measurementId: "G-K9DF5FE6LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { provider, auth }
