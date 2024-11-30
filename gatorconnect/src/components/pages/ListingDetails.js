import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetails.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from './Firebase';

const ListingDetail = () => {
    // State to store listings
    const [listings, setListings] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false); // State to toggle bookmark icon

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const documentArray = await getDocs(collection(db, "AllPosts"));
                documentArray.forEach(async (userDoc) => {
                    const userDocument = doc(db, "AllPosts", userDoc.id);
                    const userCollection = collection(userDocument, 'userPosts');
                    const querySnapshot = await getDocs(userCollection);
                    const fetchedListings = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: data.PostName || 'Untitled Listing',
                            description: data.PostCaption || 'No description available.',
                            image: data.image || 'https://via.placeholder.com/300',
                            rating: data.rating || 5,
                            distance: data.Location || 'Unknown location',
                        };
                    });
                    setListings((prevListings) => [...prevListings, ...fetchedListings]);
                });
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

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
    };

    return (
        <div className="listing-detail-container">
            <div className="image-container">
                <img src={listing.image} alt={listing.title} />
                <button className="book-button" onClick={() => console.log('Book button clicked')}>
                    Book
                </button>
            </div>
            <div className="listing-detail-info">
                <div className="listing-header">
                    <h2 className="listing-title">{listing.title}</h2>
                    <button className="save-button" onClick={toggleBookmark}>
                        <FontAwesomeIcon icon={isBookmarked ? solidBookmark : regularBookmark} />
                    </button>
                </div>
                <p className="listing-description">{listing.description}</p>
                <p className="cost">Cost: ${listing.cost || 'N/A'}</p>
                <p className="rating">Rating: ⭐ {listing.rating}</p>
                <p className="distance">Location: {listing.distance}</p>
            </div>
        </div>
    );
};

export default ListingDetail;
