import { useBeforeUnload, useNavigate, useSearchParams } from 'react-router-dom';
﻿import React, {useState, useEffect} from 'react';
import './Profile.css';
import Footer from '../Footer';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {collection, addDoc, getDocs, doc, QuerySnapshot, deleteDoc} from 'firebase/firestore'
import {db} from './Firebase'



function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthenticaed, setIsAuthenticated] = useState(false);
    const auth = getAuth();
    const [listings, setListings] = useState([]);

   

    const handleChangePassword = () => {
        console.log('Navigating to Change Password...');
        navigate('/changePassword');

    };

    const handleSetupPayment = () => {
        console.log('Navigating to Payment Setup...');
        navigate('/stripe');

    };

    const handleNavigateToMessaging = () => {
        navigate('/messages');
    };

   
   
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
            }else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return () => unsubscribe();
    } ,[auth]);


    useEffect(() => {
        const auth = getAuth();
        const fetchListings = async () => {
            try {
                const userDocument = doc(db, 'AllPosts', auth.currentUser.uid);
                const userCollection = collection(userDocument, 'userPosts');
                const querySnapshot = await getDocs(userCollection); 
                
                const fetchedListings = querySnapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    return {
                        id: doc.id, // Assign an incremental ID for each listing
                        title: data.PostName || 'Untitled Listing',
                        description: data.PostCaption || 'No description available.',
                        image: data.image || 'https://via.placeholder.com/300', // Default image if none provided
                        rating: data.rating || 5, // Default rating
                        distance: data.Location || 'Unknown location',
                    };
                });

                setListings(fetchedListings); // Update state with fetched listings
            } catch (error) {
                console.error('Error fetching listings: ', error);
            }
        };

        fetchListings();
    }, [Profile]);

    
    const deleteListing = async (id) => {
        try{
            const auth = getAuth();
            const userDocument = doc(db, "AllPosts", auth.currentUser.uid);
            const userCollection = collection(userDocument, 'userPosts');
            const userPost = doc(userCollection, id);
            console.log(userPost.id);
            await deleteDoc(userPost);
            setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
        }
        catch(error){
            console.error("Error deleting listing: ", error);
        }
    };

    const toEditPage = (id) => {
        navigate(`/edit-listing/${id}`);
    };


    return (
        <div className="page-container">
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-card">
                        <img src={user?.photoURL} alt="Profile" className="profile-picture" />
                        <h2 className="username">{user?.displayName}</h2>
                        <p className="email">{user?.email}</p>
                        <div className="profile-buttons">
                            <button onClick={handleChangePassword} className="profile-button">Change Password</button>
                            <button onClick={handleSetupPayment} className="profile-button">Set Up Payment</button>
                            <button onClick={handleNavigateToMessaging} className="profile-button">Go to Messaging</button>
                        </div>
                    </div>
                </div>
                <div className="listings-content">
                    <h2>Your Listings</h2>
                    <div className="cards__container">
                        <div className="cards__wrapper">
                            <ul className="cards__items">
                                {listings.map((listing) => (
                                    <li key={listing.id} className="cards__item">
                                        <a className="cards__item__link" href="#">
                                            <figure className="cards__item__pic-wrap" data-category={listing.title}>
                                                <img src={listing.image} alt={listing.title} className="cards__item__img" />
                                            </figure>
                                            <div className="cards__item__info">
                                                <h5 className="cards__item__text">{listing.description}</h5>
                                                <div className="cards__item__details">
                                                    <div className="cards__item__distance">
                                                        {listing.distance}
                                                    </div>
                                                    <div className="cards__item__rating">
                                                        <span>⭐ {listing.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <button
                                            className='delete-button'
                                            onClick={() => deleteListing(listing.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className='edit-button'
                                            onClick={() => toEditPage(listing.id)}
                                        >
                                            Edit
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
}

export default Profile;
