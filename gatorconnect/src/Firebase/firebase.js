// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB3yTz2GiPw4BpGlk3q5EXO5HZX3n5siI",
  authDomain: "cen3031-2afdd.firebaseapp.com",
  projectId: "cen3031-2afdd",
  storageBucket: "cen3031-2afdd.appspot.com",
  messagingSenderId: "862915274477",
  appId: "1:862915274477:web:d049b830afbdbc2f2e0ee4",
  measurementId: "G-L0SP5MWVS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebase = getFirestore(app);