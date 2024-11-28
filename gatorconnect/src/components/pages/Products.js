import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useBeforeUnload, useNavigate, useSearchParams } from 'react-router-dom';



function Products() {
    const navigate = useNavigate();

    const handleAddPost = () => {
        console.log('Navigating to Payment Setup...');
        const auth = getAuth();
        if(auth.currentUser){
            navigate('/add-post');
        }else{
            navigate('/sign-up');
        }
    
    };

    return (

        <div className='footer-container'>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                      <h2>About Us</h2>
                      <Link to='/team'>Our Team</Link>
                      <Link to='/mission'>Our Mission</Link>
                      
                        <button style={{
                        // display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        padding: '10px 20px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        backgroundColor: 'black', 
                        color: 'white', 
                        }} onClick = {handleAddPost}>
                            Post Here
                            </button>  
                        
                    </div>
                    <div class='footer-link-items'>
                      <h2>Contact Us</h2>
                      <p className='footer-text'>randomemail@fakeemail.com</p>
                      <p className='footer-text'>123-321-4321</p>
                    </div>
                </div>
            </div>
        </div>
            
            
        
        
        
        // <>
        //     <div>
        //         <h1>Post Here</h1>
        //     </div>
        //     <Footer />
        // </>
    );
}

export default Products;