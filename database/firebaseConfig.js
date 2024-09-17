import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2_qZWW5fFIf-boGPuFDQUpxgAzPDRNQM",
  authDomain: "communnications-solutions.firebaseapp.com",
  projectId: "communnications-solutions",
  storageBucket: "communnications-solutions.appspot.com",
  messagingSenderId: "821640426696",
  appId: "1:821640426696:web:a91a3a7aaf839e3782a1fd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
