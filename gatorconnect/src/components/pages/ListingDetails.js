import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling

import {collection, addDoc, getDocs, doc, QuerySnapshot} from 'firebase/firestore'
import {db} from './Firebase'

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

const ListingDetail = () => {
    // State to store listings
    const [listings, setListings] = useState(hardlistings);

    // Fetch Firestore data
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'userData')); 
                const fetchedListings = querySnapshot.docs.map((doc) => {
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


    const { id } = useParams();
    const listing = listings.find((listing) => listing.id === id);

    if (!listing) {
        return <div>Listing not found!</div>;
    }

    return (
        <div className="listing-detail">
            <img src={listing.image} alt={listing.title} />
            <div className="listing-detail-content">
                <h2>{listing.title}</h2>
                <p>{listing.description}</p>
                <p className="rating">Rating: ⭐ {listing.rating}</p>
                <p>Distance: {listing.distance}</p>
            </div>
        </div>
    );
};

export default ListingDetail;
