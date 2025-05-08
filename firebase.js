// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL:
    "https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
