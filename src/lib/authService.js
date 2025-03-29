import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Signup function
export const signupUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login function
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
