// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth for authentication
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2_qZWW5fFIf-boGPuFDQUpxgAzPDRNQM",
  authDomain: "communnications-solutions.firebaseapp.com",
  projectId: "communnications-solutions",
  storageBucket: "communnications-solutions.appspot.com",
  messagingSenderId: "821640426696",
  appId: "1:821640426696:web:1033665e268a946b82a1fd",
  measurementId: "G-JLZF5X0T9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app);
export { auth, db };