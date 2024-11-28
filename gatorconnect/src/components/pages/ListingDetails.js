import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling

import {collection, addDoc, getDocs, doc, QuerySnapshot} from 'firebase/firestore'
import {db} from './Firebase'

const hardlistings = [
    {
        id: 1,
        title: "Joe's Diner",
        category: "Restaurants",
        rating: 4.5,
        cost: 15,
        distance: "2.1",
        image: "https://example.com/image1.jpg",
        description: "A cozy diner offering classic American comfort food, great coffee, and a warm atmosphere."
    },
    {
        id: 2,
        title: "Bella Italia",
        category: "Restaurants",
        rating: 4.2,
        cost: 20,
        distance: "3.5",
        image: "https://example.com/image2.jpg",
        description: "Authentic Italian cuisine featuring homemade pasta and wood-fired pizza in a charming setting."
    },
    {
        id: 3,
        title: "Sushi Express",
        category: "Restaurants",
        rating: 4.8,
        cost: 30,
        distance: "1.2",
        image: "https://example.com/image3.jpg",
        description: "Quick and delicious sushi options made from the freshest ingredients, perfect for a quick meal."
    },
    {
        id: 4,
        title: "Taco Fiesta",
        category: "Restaurants",
        rating: 4.0,
        cost: 10,
        distance: "5.0",
        image: "https://example.com/image4.jpg",
        description: "Vibrant Mexican eatery known for its flavorful tacos and festive atmosphere."
    },
    {
        id: 5,
        title: "The Vegan Spot",
        category: "Restaurants",
        rating: 4.7,
        cost: 25,
        distance: "4.2",
        image: "https://example.com/image5.jpg",
        description: "A plant-based restaurant offering a variety of creative dishes that are both healthy and satisfying."
    },
    {
        id: 6,
        title: "Burger Barn",
        category: "Restaurants",
        rating: 3.9,
        cost: 12,
        distance: "2.7",
        image: "https://example.com/image6.jpg",
        description: "Casual burger joint with a selection of gourmet burgers and hand-cut fries."
    },

    // Category: Fitness
    {
        id: 7,
        title: "Peak Performance Gym",
        category: "Fitness",
        rating: 4.5,
        cost: 40,
        distance: "1.8",
        image: "https://example.com/image7.jpg",
        description: "State-of-the-art gym equipped with modern fitness equipment and personal training options."
    },
    {
        id: 8,
        title: "Zen Yoga Studio",
        category: "Fitness",
        rating: 4.9,
        cost: 30,
        distance: "2.5",
        image: "https://example.com/image8.jpg",
        description: "Serene yoga studio offering classes for all levels in a peaceful environment."
    },
    {
        id: 9,
        title: "Downtown CrossFit",
        category: "Fitness",
        rating: 4.3,
        cost: 45,
        distance: "3.1",
        image: "https://example.com/image9.jpg",
        description: "High-intensity CrossFit gym focused on community and results, suitable for all fitness levels."
    },
    {
        id: 10,
        title: "Pilates Place",
        category: "Fitness",
        rating: 4.6,
        cost: 35,
        distance: "4.4",
        image: "https://example.com/image10.jpg",
        description: "Dedicated Pilates studio featuring expert instructors and tailored classes for improved strength and flexibility."
    },
    {
        id: 11,
        title: "Kickboxing Center",
        category: "Fitness",
        rating: 4.2,
        cost: 25,
        distance: "3.6",
        image: "https://example.com/image11.jpg",
        description: "Energetic kickboxing classes that combine fitness and self-defense techniques for all skill levels."
    },
    {
        id: 12,
        title: "Flex Gym",
        category: "Fitness",
        rating: 4.0,
        cost: 20,
        distance: "2.9",
        image: "https://example.com/image12.jpg",
        description: "Local gym with a friendly atmosphere, offering various fitness classes and equipment."
    },

    // Category: Entertainment
    {
        id: 13,
        title: "Cinema Park",
        category: "Entertainment",
        rating: 4.4,
        cost: 10,
        distance: "2.0",
        image: "https://example.com/image13.jpg",
        description: "A modern cinema featuring the latest blockbusters and a variety of snacks."
    },
    {
        id: 14,
        title: "Escape Room Central",
        category: "Entertainment",
        rating: 4.7,
        cost: 25,
        distance: "3.3",
        image: "https://example.com/image14.jpg",
        description: "Thrilling escape room experiences with challenging puzzles and immersive themes."
    },
    {
        id: 15,
        title: "Fun Zone Arcade",
        category: "Entertainment",
        rating: 4.1,
        cost: 15,
        distance: "1.5",
        image: "https://example.com/image15.jpg",
        description: "An arcade packed with games and prizes, perfect for a fun outing with family or friends."
    },
    {
        id: 16,
        title: "Bowling Alley",
        category: "Entertainment",
        rating: 4.3,
        cost: 18,
        distance: "4.0",
        image: "https://example.com/image16.jpg",
        description: "A family-friendly bowling alley with lanes, food options, and special events."
    },
    {
        id: 17,
        title: "Music Hall",
        category: "Entertainment",
        rating: 4.8,
        cost: 50,
        distance: "2.8",
        image: "https://example.com/image17.jpg",
        description: "A vibrant venue hosting live music performances from various artists and genres."
    },
    {
        id: 18,
        title: "Mini Golf Course",
        category: "Entertainment",
        rating: 4.2,
        cost: 12,
        distance: "3.0",
        image: "https://example.com/image18.jpg",
        description: "A fun mini golf course featuring unique holes and a friendly atmosphere for all ages."
    },

    // Category: Shopping
    {
        id: 19,
        title: "Mall of Wonders",
        category: "Shopping",
        rating: 4.5,
        cost: 0,
        distance: "5.0",
        image: "https://example.com/image19.jpg",
        description: "A sprawling shopping mall with a variety of stores, eateries, and entertainment options."
    },
    {
        id: 20,
        title: "Tech Gadgets Store",
        category: "Shopping",
        rating: 4.4,
        cost: 100,
        distance: "3.2",
        image: "https://example.com/image20.jpg",
        description: "Your go-to destination for the latest tech gadgets and accessories."
    },
    {
        id: 21,
        title: "Vintage Clothing",
        category: "Shopping",
        rating: 4.6,
        cost: 30,
        distance: "2.4",
        image: "https://example.com/image21.jpg",
        description: "Charming shop specializing in curated vintage clothing and unique accessories."
    },
    {
        id: 22,
        title: "Local Farmer's Market",
        category: "Shopping",
        rating: 4.8,
        cost: 20,
        distance: "1.1",
        image: "https://example.com/image22.jpg",
        description: "Fresh produce and handmade goods from local vendors in a vibrant market setting."
    },
    {
        id: 23,
        title: "Book Haven",
        category: "Shopping",
        rating: 4.9,
        cost: 15,
        distance: "3.5",
        image: "https://example.com/image23.jpg",
        description: "A cozy bookstore with a wide selection of titles and a comfortable reading area."
    },
    {
        id: 24,
        title: "Artisan Craft Store",
        category: "Shopping",
        rating: 4.3,
        cost: 25,
        distance: "4.2",
        image: "https://example.com/image24.jpg",
        description: "Handcrafted items and art supplies from local artisans, perfect for unique gifts."
    }
];


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
