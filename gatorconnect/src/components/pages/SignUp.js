import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { signInWithGoogle} from './Firebase.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification, updateProfile, onAuthStateChanged, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



function SignUp() {
    const navigate = useNavigate();
    const [isAuthenticaed, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Sign Up Successful:', formData);
    };

    const handleGoogleSubmit = (e) => {
        const auth = getAuth();
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        }) 
        .catch((error) => {
            const errorCode = error.errorCode
        })
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: username,
                email: email,
                password: password,
            })
            
        })
        .catch((error) => {
            const errorCode = error.errorCode
        })
    }
    const tempLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("error signout", error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
            
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <button onClick={handleEmailSubmit} type='submit' className='sign-up-button'>Sign Up</button>
                </div>
                <div className='form-group'>
                    <button onClick={handleGoogleSubmit} className='google-sign-up'> Sign In with Google</button>
                </div>
                
                <div className='form-group'>
                    <p>Already have an account? <span onClick={() => navigate('/login')} className='login-link'>Log In</span></p>
                </div>
                
            </form>
        </div>
    );
}

export default SignUp;
