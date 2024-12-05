import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetails.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { useBeforeUnload, useNavigate, useSearchParams } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import { collection, setDoc, getDocs, getDoc, addDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './Firebase';

const ListingDetail = () => {
    // State to store listings
    const [listings, setListings] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false); // State to toggle bookmark icon
    const navigate = useNavigate();
    const [posterID, setposterID] = useState("");
    const [posterName, setposterName] = useState("");
    const { id } = useParams();

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
                        if(doc.id === id){
                            setposterID(userDoc.id);
                            setposterName(data.BusinessName);
                        }
                        return {
                            id: doc.id,
                            title: data.PostName || 'Untitled Listing',
                            description: data.PostCaption || 'No description available.',
                            image: data.image || '/images/img-home.jpg',
                            rating: data.rating || 5,
                            distance: data.Location || 'Unknown location',
                            cost: data.Cost || '1'
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

    useEffect(()=> {
        console.log("use effect", posterID);
    }, [posterID]);

    //const { id } = useParams();
    const listing = listings.find((listing) => listing.id === id);

    if (!listing) {
        return <div>Listing not found!</div>;
    }

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
    };

    const createMessaging = async () => {
        console.log("on click of message", posterID);

        const auth = getAuth();
        const curUser = auth.currentUser.uid;
        const otherUser = posterID;
        const combinedMessageID = curUser + " " + otherUser;
        const reverse = otherUser + " " + curUser;
        try {
            const docRef = doc(db, 'Messaging', reverse);
            const docCheck = await getDoc(docRef);
            console.log("what the hell");
            if(docCheck.exists()){
                console.log("what the fuck");
                navigate('/messages');
            }else {
                console.log("combined",combinedMessageID);
        
                const userMessageDoc = doc(db, 'Messaging', combinedMessageID);
                setDoc(userMessageDoc, {merge: true});
                const receiverCollection = collection(userMessageDoc, 'Messages'); 
              
                const temp = "IGNORE";
                await setDoc(doc(receiverCollection, temp + posterID), {
                    merge: true,
                    name: auth.currentUser.displayName,
                })
                await setDoc(doc(receiverCollection, temp + auth.currentUser.uid), {
                    merge: true,
                    name: posterName,
                }
                
                )
                navigate('/messages');
            }
        }catch (error){
            console.log(error)}
       
       

    }
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
                <p className="cost">Cost: {listing.cost || 'N/A'}</p>
                <p className="rating">Rating: ⭐ {listing.rating}</p>
                <p className="distance">Location: {listing.distance}</p>
                <button onClick={createMessaging}>Message</button>
            </div>
        </div>
    );
};

export default ListingDetail;
