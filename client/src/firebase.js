// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm-9vToplYsABqGXaaeDqMuQ3oIL95Tv0",
  authDomain: "zingy-2ae79.firebaseapp.com",
  projectId: "zingy-2ae79",
  storageBucket: "zingy-2ae79.firebasestorage.app",
  messagingSenderId: "893451545446",
  appId: "1:893451545446:web:8df02477a672c2dfe0f6a7",
  measurementId: "G-95SDYZJN3B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
