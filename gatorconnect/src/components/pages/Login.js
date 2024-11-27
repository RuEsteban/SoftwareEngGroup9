import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isNotUser, setIsNotUser] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const auth = getAuth();
   
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signInUser = (e) => {
        setIsNotUser(false);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            setUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        })
        .catch((error) => {
            setIsNotUser(true);
            const errorCode = error.code;
            const errorMessage = error.errorMessage;
        });
    }

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
        .then((userCredentials) => {
            const user = userCredentials.user;
            setUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        })
        .catch((error) => {
            setIsNotUser(true);
            const errorCode = error.code;
            const errorMessage = error.errorMessage;
        });
    };

    return (
        <div className='login-container'>
            <form className='login-form'>
            
                <div>
                    <h2>{user?.displayName || user?.email}</h2>
                    <img src={user?.photoURL}  />
                </div>
                
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='identifier'>Email or Username</label>
                    <input
                        type='text'
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
                    <button onClick ={signInUser} type='button' className='login-button'>Login</button>
                </div>
                <div className='form-group'>
                    <button onClick = {handleGoogleSubmit} type='button' className='google-login'>Sign In with Google</button>
                </div>
                <div className='form-group'>
                    <p>Don't have an account? <span onClick={() => navigate('/sign-up')} className='signup-link'>Sign Up</span></p>
                </div>
                {isNotUser ? (
                    <div>
                        <p className = 'no-account'>No account found, please sign up</p>
                    </div>
                ) : (
                    <h2></h2>
                )}
            </form>
        </div>
    );
}

export default Login;
