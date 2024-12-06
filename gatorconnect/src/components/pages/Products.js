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
         <>
             <div>
                <button style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'black',
                    color: 'white',
                }} onClick={handleAddPost}>
                    Post Here
                </button>  
             </div>
             <Footer />
         </>
    );
}

export default Products;