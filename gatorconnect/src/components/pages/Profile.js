import React, {useState, useEffect} from 'react';
import './Profile.css';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import {collection, addDoc, getDocs, doc, QuerySnapshot, deleteDoc} from 'firebase/firestore'
import {db} from './Firebase'

import { useNavigate } from 'react-router-dom';


function Profile() {
    const username = "JohnDoe";
    const email = "johndoe@example.com";
    const profilePicture = "https://via.placeholder.com/150"; // Placeholder image

    const handleChangePassword = () => {
        console.log('Navigating to Change Password...');
    };

    const handleSetupPayment = () => {
        console.log('Navigating to Payment Setup...');
    };

    // Sample data for listings with rating and distance
    const hardlistings = [
        {
            id: 1,
            title: "Cozy Apartment in Downtown",
            description: "A lovely 2-bedroom apartment with modern amenities.",
            image: "https://via.placeholder.com/300",
            rating: 4.5,
            distance: "2 miles away"
        },
        {
            id: 2,
            title: "Beachside Villa",
            description: "Enjoy ocean views and a private pool in this beautiful villa.",
            image: "https://via.placeholder.com/300",
            rating: 4.7,
            distance: "5 miles away"
        },
        {
            id: 3,
            title: "Mountain Cabin",
            description: "Perfect for a quiet retreat with stunning mountain views.",
            image: "https://via.placeholder.com/300",
            rating: 4.9,
            distance: "20 miles away"
        },
        {
            id: 4,
            title: "City Loft",
            description: "Stylish loft in the heart of the city, close to everything.",
            image: "https://via.placeholder.com/300",
            rating: 4.6,
            distance: "1 mile away"
        },
    ];

    // State to store listings
    const [listings, setListings] = useState(hardlistings);

    // Fetch Firestore data
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'userData')); 
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

                setListings((prevListings) => [...prevListings, ...fetchedListings]); // Update state with fetched listings
            } catch (error) {
                console.error('Error fetching listings: ', error);
            }
        };

        fetchListings();
    }, []);

    const deleteListing = async (id) => {
        try{
            const docRef = doc(db, 'userData', id);
            await deleteDoc(docRef);
            setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
        }
        catch(error){
            console.error("Error deleting listing: ", error);
        }
    };

    const navigate = useNavigate();
    const toEditPage = (id) => {
        navigate(`/edit-listing/${id}`);
    };


    return (
        <div className="page-container">
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-card">
                        <img src={profilePicture} alt="Profile" className="profile-picture" />
                        <h2 className="username">{username}</h2>
                        <p className="email">{email}</p>
                        <div className="profile-buttons">
                            <button onClick={handleChangePassword} className="profile-button">
                                Change Password
                            </button>
                            <button onClick={handleSetupPayment} className="profile-button">
                                Set Up Payment
                            </button>
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
                                                <img
                                                    src={listing.image}
                                                    alt={listing.title}
                                                    className="cards__item__img"
                                                />
                                            </figure>
                                            <div className="cards__item__info">
                                                <h5 className="cards__item__text">{listing.description}</h5>
                                                <div className="cards__item__details">
                                                    <div className="cards__item__distance">
                                                        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }} />
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
