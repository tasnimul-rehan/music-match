// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9--GDniMQgRcvJOElSQ2tBunjuVPRkH4",
  authDomain: "music-match-wireframe.firebaseapp.com",
  projectId: "music-match-wireframe",
  storageBucket: "music-match-wireframe.firebasestorage.app",
  messagingSenderId: "331239326719",
  appId: "1:331239326719:web:ef2097ac7d977e8cc01dca",
  measurementId: "G-4CMELKF4KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);