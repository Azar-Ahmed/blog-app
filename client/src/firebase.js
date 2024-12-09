// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-4bfd7.firebaseapp.com",
  projectId: "blog-app-4bfd7",
  storageBucket: "blog-app-4bfd7.firebasestorage.app",
  messagingSenderId: "660018660479",
  appId: "1:660018660479:web:df41980575154dc0832b4a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);