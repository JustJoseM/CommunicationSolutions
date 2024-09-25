// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2_qZWW5fFIf-boGPuFDQUpxgAzPDRNQM",
  authDomain: "communnications-solutions.firebaseapp.com",
  projectId: "communnications-solutions",
  storageBucket: "communnications-solutions.appspot.com",
  messagingSenderId: "821640426696",
  appId: "1:821640426696:web:a91a3a7aaf839e3782a1fd",
  measurementId: "G-ZQS89Y3BF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(db);
const analytics = getAnalytics(db);

export { db };