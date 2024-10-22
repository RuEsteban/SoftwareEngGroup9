import React from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling

const listings = [
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
    const { id } = useParams();
    const listing = listings.find((listing) => listing.id === parseInt(id));

    if (!listing) {
        return <div>Listing not found!</div>;
    }

    return (
        <div className="listing-detail">
            <h2>{listing.title}</h2>
            <img src={listing.image} alt={listing.title} />
            <p>{listing.description}</p>
            <p>Rating: ⭐ {listing.rating}</p>
            <p>Distance: {listing.distance}</p>
        </div>
    );
};

export default ListingDetail;
