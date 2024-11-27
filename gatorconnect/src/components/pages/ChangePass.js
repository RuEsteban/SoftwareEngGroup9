import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification, updatePassword , onAuthStateChanged, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



function ChangePass() {
    const navigate = useNavigate();
    const [isAuthenticaed, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const [updatedPass, setupdatedPass] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const { password, confirmPassword, } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangePassword = (e) => {
        setupdatedPass(false);
        const auth = getAuth();
        const user = auth.currentUser;

        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        updatePassword(user, confirmPassword)
        .then(() => {
            setupdatedPass(true);
        }).catch((error) => {
            const errorCode = error.errorCode
        })
        console.log('Sign Up Successful:', formData);
    };

   
  
    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleChange}>
        
                <div className='form-group'>
                    <label htmlFor='password'>New password</label>
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
                    <label htmlFor='confirmPassword'>Confirm new password</label>
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
                    <button onClick={handleChangePassword} type='submit' className='sign-up-button'>Change Password</button>
                </div>
                {updatedPass ? (
                    <div>
                        <p className = 'change-pass'>Password successfully updated</p>
                    </div>
                ) : (
                    <h2></h2>
                )}
        
            </form>
        </div>
    );
}

export default ChangePass;
