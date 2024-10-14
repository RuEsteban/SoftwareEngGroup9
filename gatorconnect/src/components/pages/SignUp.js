import React, { useState } from 'react';
import './SignUp.css'; 
import {firebase} from "../..Firebase/firebase.js"
import { addDoc,collection } from "@firebase/firestore"

function SignUp() {
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
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
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
                <button type='submit' className='sign-up-button'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
