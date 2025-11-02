// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,

  // apiKey: "AIzaSyASpT9mXhrX71AG0yOzL10rnesGzAct-Ao",
  // authDomain: "smart-deals-cc929.firebaseapp.com",
  // projectId: "smart-deals-cc929",
  // storageBucket: "smart-deals-cc929.firebasestorage.app",
  // messagingSenderId: "994511396528",
  // appId: "1:994511396528:web:433a59ec49feb113dde575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);