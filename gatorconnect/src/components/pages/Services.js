import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const listings = [
    // Category: Restaurants
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



const renderCostIcons = (cost) => {
    if (cost < 20) {
        return <FontAwesomeIcon icon={faDollarSign} />;
    } else if (cost >= 20 && cost <= 50) {
        return (
            <>
                <FontAwesomeIcon icon={faDollarSign} />
                <FontAwesomeIcon icon={faDollarSign} />
            </>
        );
    } else {
        return (
            <>
                <FontAwesomeIcon icon={faDollarSign} />
                <FontAwesomeIcon icon={faDollarSign} />
                <FontAwesomeIcon icon={faDollarSign} />
            </>
        );
    }
};

const ListingsPage = () => {
    const [ratingFilter, setRatingFilter] = useState(0);
    const [costFilter, setCostFilter] = useState(100);
    const [distanceFilter, setDistanceFilter] = useState(20);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortCost, setSortCost] = useState('default');
    const [sortDistance, setSortDistance] = useState('default');

    const uniqueCategories = [...new Set(listings.map(listing => listing.category))];

    const filteredListings = listings
        .filter((listing) => {
            const matchesRating = listing.rating >= ratingFilter;
            const matchesCost = listing.cost <= costFilter;
            const matchesDistance = parseFloat(listing.distance) <= distanceFilter;
            const matchesCategory = categoryFilter === '' || listing.category === categoryFilter;
            return matchesRating && matchesDistance && matchesCategory && matchesCost;
        })
        .sort((a, b) => {
            if (sortCost === 'lowToHigh') {
                return a.cost - b.cost;
            } else if (sortCost === 'highToLow') {
                return b.cost - a.cost;
            }
            return 0; // default or no sorting
        })
        .sort((a, b) => {
            if (sortDistance === 'lowToHigh') {
                return parseFloat(a.distance) - parseFloat(b.distance);
            } else if (sortDistance === 'highToLow') {
                return parseFloat(b.distance) - parseFloat(a.distance);
            }
            return 0; // default or no sorting
        });

    return (
        <div className="listings-content">
            <div className="filter-section">
                <div className="filter-group">
                    <label className="filter-label" htmlFor="category-filter">Filter by Category:</label>
                    <select
                        id="category-filter"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="filter-input"
                    >
                        <option value="">All</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="rating-filter">Min Rating: {ratingFilter}</label>
                    <input
                        id="rating-filter"
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                        className="filter-slider"
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="distance-filter">Max Distance: {distanceFilter} miles</label>
                    <input
                        id="distance-filter"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={distanceFilter}
                        onChange={(e) => setDistanceFilter(parseFloat(e.target.value))}
                        className="filter-slider"
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="cost-filter">Max Cost: {costFilter}</label>
                    <input
                        id="cost-filter"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={costFilter}
                        onChange={(e) => setCostFilter(parseFloat(e.target.value))}
                        className="filter-slider"
                    />
                </div>

                {/* Sorting dropdowns for Cost and Distance */}
                <div className="filter-group">
                    <label className="filter-label" htmlFor="sort-cost">Sort by Cost:</label>
                    <select
                        id="sort-cost"
                        value={sortCost}
                        onChange={(e) => setSortCost(e.target.value)}
                        className="filter-input"
                    >
                        <option value="default">Default</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="sort-distance">Sort by Distance:</label>
                    <select
                        id="sort-distance"
                        value={sortDistance}
                        onChange={(e) => setSortDistance(e.target.value)}
                        className="filter-input"
                    >
                        <option value="default">Default</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
            </div>

            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        {filteredListings.map((listing, index) => (
                            <li key={index} className="cards__item">
                                <Link className="cards__item__link" to={`/listing/${(index+1)}`}>
                                    <figure className="cards__item__pic-wrap" data-category={listing.category}>
                                        <img
                                            src={listing.image}
                                            alt={listing.title}
                                            className="cards__item__img"
                                        />
                                    </figure>
                                    <div className="cards__item__info">
                                        <h5 className="cards__item__text">{listing.title}</h5>
                                        <div className="cards__item__details">
                                            <div className="cards__item__distance">
                                                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }} />
                                                {listing.distance}
                                            </div>
                                            <div className="cards__item__rating" style={{ textAlign: 'right' }}>
                                                <span>⭐ {listing.rating}</span>
                                            </div>
                                            <div className="cards__item__cost">
                                                {renderCostIcons(listing.cost)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
};

export default ListingsPage;
