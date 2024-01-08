// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3b381.firebaseapp.com",
  projectId: "mern-estate-3b381",
  storageBucket: "mern-estate-3b381.appspot.com",
  messagingSenderId: "158337226671",
  appId: "1:158337226671:web:a542ceedb3406dab59c15a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);