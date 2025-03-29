import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuO0ICa01BiEZujezD-io-0GEDOIJKL1g",
  authDomain: "bloommidwife-3d04c.firebaseapp.com",
  projectId: "bloommidwife-3d04c",
  storageBucket: "bloommidwife-3d04c.firebasestorage.app",
  messagingSenderId: "675051790387",
  appId: "1:675051790387:web:b25e1f0896374de9384346",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the auth instance
export const auth = getAuth(app);
