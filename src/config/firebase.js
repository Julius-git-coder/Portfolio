import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aquatrack-34a8b.firebaseapp.com",
  projectId: "aquatrack-34a8b",
  storageBucket: "aquatrack-34a8b.firebasestorage.app",
  messagingSenderId: "839061131699",
  appId: "1:839061131699:web:2bed8143ed3d164ba93bc6",
  measurementId: "G-P88RYL0RH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
