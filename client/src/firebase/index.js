// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-tube.firebaseapp.com",
  projectId: "mern-tube",
  storageBucket: "mern-tube.appspot.com",
  messagingSenderId: "1016661303474",
  appId: "1:1016661303474:web:e18dc66df1c51ca80da9ab",
  measurementId: "G-DHF1CX7DGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;
