// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDnlaV49kONGmvHYNgv-q8w2rccdqawqA",
  authDomain: "my-assignment-11-a288a.firebaseapp.com",
  projectId: "my-assignment-11-a288a",
  storageBucket: "my-assignment-11-a288a.firebasestorage.app",
  messagingSenderId: "785028292865",
  appId: "1:785028292865:web:d49099acbf62fa14817b00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);