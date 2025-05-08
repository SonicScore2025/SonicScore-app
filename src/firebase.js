// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfrHXW9kONnI0u_iwLmfse7du7SxGvPKo",
  authDomain: "sonicscore-api.firebaseapp.com",
  databaseURL:
    "https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sonicscore-api",
  storageBucket: "sonicscore-api.firebasestorage.app",
  messagingSenderId: "424145181803",
  appId: "1:424145181803:web:e0c44b6c22951d407f652e",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
