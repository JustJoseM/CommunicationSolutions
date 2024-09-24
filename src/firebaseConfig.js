import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Correct import for Firebase Authentication
import {getAnalysis} from "firebase/analytics"
import { getFirestore } from 'firebase/firestore';  // Import Firestore


// Your Firebase configuration object
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

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);  // Firebase Authentication setup
const db = getFirestore(app);  // Firestore setup

// Export both auth and db
export { auth, db };
