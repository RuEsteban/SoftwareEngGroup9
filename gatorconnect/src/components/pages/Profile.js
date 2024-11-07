import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Footer from '../Footer';

function Profile() {
    const navigate = useNavigate();

    const username = "JohnDoe";
    const email = "johndoe@example.com";
    const profilePicture = "https://via.placeholder.com/150";

    const handleChangePassword = () => {
        console.log('Navigating to Change Password...');
    };

    const handleSetupPayment = () => {
        console.log('Navigating to Payment Setup...');
    };

    const handleNavigateToMessaging = () => {
        navigate('/messages');
    };

    const listings = [
        { id: 1, title: "Cozy Apartment in Downtown", description: "A lovely 2-bedroom apartment with modern amenities.", image: "https://via.placeholder.com/300", rating: 4.5, distance: "2 miles away" },
        { id: 2, title: "Beachside Villa", description: "Enjoy ocean views and a private pool in this beautiful villa.", image: "https://via.placeholder.com/300", rating: 4.7, distance: "5 miles away" },
        { id: 3, title: "Mountain Cabin", description: "Perfect for a quiet retreat with stunning mountain views.", image: "https://via.placeholder.com/300", rating: 4.9, distance: "20 miles away" },
        { id: 4, title: "City Loft", description: "Stylish loft in the heart of the city, close to everything.", image: "https://via.placeholder.com/300", rating: 4.6, distance: "1 mile away" },
    ];

    return (
        <div className="page-container">
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-card">
                        <img src={profilePicture} alt="Profile" className="profile-picture" />
                        <h2 className="username">{username}</h2>
                        <p className="email">{email}</p>
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
