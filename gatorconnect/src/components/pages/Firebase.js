import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';



const firebaseConfig = {
    apiKey: "AIzaSyDJUA793eEFVUbVIG2s6rLZ0jBZBgeOEq4",
    authDomain: "cengroup3031-d4a4c.firebaseapp.com",
    projectId: "cengroup3031-d4a4c",
    storageBucket: "cengroup3031-d4a4c.appspot.com",
    messagingSenderId: "1052017859368",
    appId: "1:1052017859368:web:ddf61ec493f1c41c4cce1d",
    measurementId: "G-BYVCY72X95"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result)=> {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilepic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilepic", profilepic);
       
        
    }).catch((error) =>  {
        console.log(error);
    });
};

export const signUpWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((result)=> {
        const user = result.user.displayName;
        const email = result.user.email;
        const profilepic = result.user.photoURL;

        localStorage.setItem("name", user);
        localStorage.setItem("email", email);
        //localStorage.setItem("profilePic", profilepic);


    }).catch((error)=> {
        console.log(error);
    })
}
