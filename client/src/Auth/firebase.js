// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxEX6_OEtvBI57Zxm9692fblh9yWcvl3Y",
  authDomain: "soundbeam-38272.firebaseapp.com",
  projectId: "soundbeam-38272",
  storageBucket: "soundbeam-38272.appspot.com",
  messagingSenderId: "764100093511",
  appId: "1:764100093511:web:a9f0569dc800fad951b362",
  measurementId: "G-PY3V4KM9GE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth, analytics };
