import React, { useState, useEffect } from 'react';
import './SignUp.css'; 
import { signInWithGoogle, auth, signUpWithEmail, } from './Firebase.js'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';



function SignUp() {

    const navigate = useNavigate();
    const [isAuthenticaed, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

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

        // Handle sign-up logic, such as sending data to a backend
        console.log('Sign Up Successful:', formData);
        signUpWithEmail(email, password);
    };

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        signInWithGoogle();

    }
    const tempLogout = async () => {
        const auth = getAuth();
        try {
            console.clear();
            await signOut(auth);
            
        } catch (error){
            console.error("error signout", error);
        }
    };

    useEffect(() => {
        const auth = getAuth(); 
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                
                setIsAuthenticated(true);
                setUser(user);
                //navigate('/');
            } else {
           
                setIsAuthenticated(false);
                setUser(null);
            }
        });


        return () => unsubscribe();
    }, []);

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                {isAuthenticaed ? (
                    <div>
                        <h2>
                            {user?.displayName || user?.email}
                        </h2>
                        <img src = {user?.photoURL}></img>
                    </div>
                ): (
                    <h2>Sign Up</h2>
                )}
               
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
                    <button type='submit' className='sign-up-button'>Sign Up</button>
                </div>
                <div className='form-group'>
                    <button onClick={handleGoogleSubmit} className='google-sign-up'> Sign In with Google</button>
                </div>
                <div className='form-group'>
                    <button onClick={tempLogout} className='logout'> temp logout</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
