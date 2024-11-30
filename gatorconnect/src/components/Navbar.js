import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { user } from './/pages/SignUp.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [user, setUser] = useState(null);
    const [isAuthenticaed, setIsAuthenticated] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const auth = getAuth();

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const navSignUp = (e) => {
        e.preventDefault();
        navigate('/sign-up')

    }

    const tempLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/sign-up')
        } catch (error) {
            console.error("error signout", error);
        }
    };
    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

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


    const handleAddPost = () => {

        console.log('Navigating to Payment Setup...');
        const auth = getAuth();
        if (auth.currentUser) {
            navigate('/add-post');
        } else {
            navigate('/sign-up');
        }

    };


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img src='images/gclogo.png' alt='company logo' className='navbar-logo-img' />
                        GatorConnect
                        <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                                Listings
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/add-post' className='nav-links' onClick={handleAddPost}>
                                Post
                            </Link>
                        </li>
                        <li>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                        
                    </ul>
                    {user ? ( 
                        <>
                        <Button buttonStyle='btn--outline' onClick={tempLogout}>SIGN OUT</Button>

                        </>
                    ) : (
                        <>
                        {button && <Button onClick={navSignUp} buttonStyle='btn--outline'>SIGN UP</Button>}
                        </>
                    )}
                    <Link to='/profile' className='profile-icon'>
                        <img
                            src={user?.photoURL || '/images/profileicon.PNG'} // Use fallback image if URL is unavailable
                            alt='Profile icon' // Descriptive alt text
                            className='profile-icon-img'
                        />
                    </Link>

                </div>
            </nav>
        </>
    );
}

export default Navbar;