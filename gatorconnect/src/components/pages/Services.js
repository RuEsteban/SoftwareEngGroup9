import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import the CSS for styling
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import {collection, addDoc, getDocs, doc, QuerySnapshot} from 'firebase/firestore'
import {db} from './Firebase'


export const hardlistings = [
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

    // Add more listings as needed
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
