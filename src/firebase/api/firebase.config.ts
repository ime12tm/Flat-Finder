// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtDtYzK-THBduiDXyYRqFBvYKpGDSLUa0",
  authDomain: "flatfinder-24479.firebaseapp.com",
  projectId: "flatfinder-24479",
  storageBucket: "flatfinder-24479.appspot.com",
  messagingSenderId: "674961793942",
  appId: "1:674961793942:web:537764f2cb38d21fec73b7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
