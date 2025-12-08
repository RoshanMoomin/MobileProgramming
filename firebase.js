// firebase.js (React Native compatible)
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0PClqHuQdPvknb8EWBI67VMux-Vjau0s",
  authDomain: "mobile-programming-58a94.firebaseapp.com",
  projectId: "mobile-programming-58a94",
  storageBucket: "mobile-programming-58a94.firebasestorage.app",
  messagingSenderId: "861853920738",
  appId: "1:861853920738:web:0f33833b41e76766339dbb",
  measurementId: "G-0FPZZSX2Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export DB so other files can use
export const db = getDatabase(app);