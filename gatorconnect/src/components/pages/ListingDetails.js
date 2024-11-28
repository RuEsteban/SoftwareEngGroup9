import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling

import {collection, addDoc, getDocs, doc, QuerySnapshot} from 'firebase/firestore'
import {db} from './Firebase'


const ListingDetail = () => {
    // State to store listings
    const [listings, setListings] = useState([]);

    useEffect(() => {
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
                            image: data.image || 'https://via.placeholder.com/300', // Default image if none provided
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


    const { id } = useParams();
    const listing = listings.find((listing) => listing.id === id);

    if (!listing) {
        return <div>Listing not found!</div>;
    }

    return (
        <div className="listing-detail-container">
            <div className="image-container">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
                <button className="book-button" onClick={() => console.log('Book button clicked')}>
                    Book
                </button>
            </div>
            <div className="listing-detail-info">
                <div className="listing-header">
                    <h2 className="listing-title">{listing.title}</h2>
                    <button className="save-button" onClick={() => console.log('Save button clicked')}>
                        <i className="fas fa-bookmark"></i> Save
                    </button>
                    {/* New paragraph for longer description */}
                    <p className="listing-description">{listing.description}</p>
                </div>
                <p className="cost">Cost: ${listing.cost}</p>
                <p className="rating">Rating: ⭐ {listing.rating}</p>
                <p className="distance">Distance: {listing.distance} miles</p>
            </div>
        </div>
    );

};

export default ListingDetail;
