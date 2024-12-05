import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import './Profile.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {collection, addDoc, getDocs, doc, QuerySnapshot} from 'firebase/firestore'
import {db} from './Firebase'


export const hardlistings = [
    {
        id: 1,
        title: "Cozy Apartment in Downtown",
        description: "A lovely 2-bedroom apartment with modern amenities.",
        image: "/images/img-home.jpg",
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

    // Add more listings as needed
];

const ListingsPage = () => {
    
    // State to store listings
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const fetchListings = async () => {
          
            try {
                //const newFetchedListings = [];
                const documentArray = await getDocs(collection(db, "AllPosts")); // make sure it iterates through every single document
                documentArray.forEach(async (userDoc)  => {
                    console.log("doc id", userDoc.id);
                    const userDocument = doc(db, "AllPosts", userDoc.id);
                    const userCollection = collection(userDocument, 'userPosts');
                    console.log("u", userCollection.id);
                    const querySnapshot = await getDocs(userCollection); 
                    const fetchedListings = querySnapshot.docs.map((doc, index) => {
                        console.log("doc name", doc.id);
                        const data = doc.data();
                        return {
                            id: doc.id, // Assign an incremental ID for each listing
                            title: data.PostName || 'Untitled Listing',
                            description: data.PostCaption || 'No description available.',
                            image: data.image || '/images/img-home.jpg', // Default image if none provided
                            rating: data.rating || 5, // Default rating
                            distance: data.Location || 'Unknown location',
                        };
                        
                    });
                    setListings((prevListings) => [...prevListings, ...fetchedListings]); 
                })
            } catch (error) {
                console.error('Error fetching listings: ', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <>
            <div className="listings-content">
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                            {listings.map((listing) => (
                                <li key={listing.id} className="cards__item">
                                    <Link className="cards__item__link" to={`/listing/${listing.id}`}>
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
                                                <div className="cards__item__rating" style={{ textAlign: 'right' }}>
                                                    <span>⭐ {listing.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
         </>
    );
};

export default ListingsPage;
