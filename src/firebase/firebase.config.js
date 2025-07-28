
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCMQQK_CtfYBvh7MNXTYcDC4B2bSGuAeA",
  authDomain: "construction-9e9df.firebaseapp.com",
  projectId: "construction-9e9df",
  storageBucket: "construction-9e9df.firebasestorage.app",
  messagingSenderId: "704555395461",
  appId: "1:704555395461:web:f5e18600c771ef47eb7cec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
