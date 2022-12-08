import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-tube.firebaseapp.com",
  projectId: "mern-tube",
  storageBucket: "mern-tube.appspot.com",
  messagingSenderId: "1016661303474",
  appId: "1:1016661303474:web:e18dc66df1c51ca80da9ab",
  measurementId: "G-DHF1CX7DGZ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
