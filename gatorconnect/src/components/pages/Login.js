import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const { identifier, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='login-container'>
            <form className='login-form'>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='identifier'>Email or Username</label>
                    <input
                        type='text'
                        name='identifier'
                        id='identifier'
                        value={identifier}
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
                    <button type='button' className='login-button'>Login</button>
                </div>
                <div className='form-group'>
                    <button type='button' className='google-login'>Sign In with Google</button>
                </div>
                <div className='form-group'>
                    <p>Don't have an account? <span onClick={() => navigate('/sign-up')} className='signup-link'>Sign Up</span></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
