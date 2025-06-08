import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2qmeJK4q-kEEKUJG86TjjENcr1XsEPLo",
  authDomain: "to-do-list-b50e4.firebaseapp.com",
  projectId: "to-do-list-b50e4",
  storageBucket: "to-do-list-b50e4.firebasestorage.app",
  messagingSenderId: "100439815065",
  appId: "1:100439815065:web:5ab4edf86dae6b8860d908",
  measurementId: "G-KG3Q1LXQB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;