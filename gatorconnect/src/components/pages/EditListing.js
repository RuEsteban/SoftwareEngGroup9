import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import './EditListing.css';

function EditListing() {
    const { id } = useParams(); // Get listing ID from the URL
    const navigate = useNavigate();

    const [listing, setListing] = useState({
        BusinessName: '',
        Cost: '',
        Email: '',
        Location: '',
        Phone: '',
        PostCaption: '',
        PostName: '',
    });

    // Fetch listing data
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const docRef = doc(db, 'userData', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setListing({
                        BusinessName: data.BusinessName || '',
                        Cost: data.Cost || '',
                        Email: data.Email || '',
                        Location: data.Location || '',
                        Phone: data.Phone || '',
                        PostCaption: data.PostCaption || '',
                        PostName: data.PostName || '',
                    });
                } else {
                    console.error('Listing not found!');
                }
            } catch (error) {
                console.error('Error fetching listing: ', error);
            }
        };

        fetchListing();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setListing((prevListing) => ({ ...prevListing, [name]: value }));
    };

    // Save changes to Firestore
    const handleSave = async () => {
        try {
            const docRef = doc(db, 'userData', id);
            await updateDoc(docRef, {
                BusinessName: listing.BusinessName,
                Cost: listing.Cost,
                Email: listing.Email,
                Location: listing.Location,
                Phone: listing.Phone,
                PostCaption: listing.PostCaption,
                PostName: listing.PostName,
            });
            console.log('Listing updated successfully!');
            navigate('/profile'); // Navigate back to the Profile page
        } catch (error) {
            console.error('Error updating listing: ', error);
        }
    };

    return (
        <section className='page'>
            <div className='container'>
                <div className='box'>
                    <form>
                        <h2 className='addPostTxt'>Edit Post</h2>
                        <div className='space'>
                            <label className='title'>
                                Post Name
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='PostName'
                                className='text'
                                placeholder='eg. Pottery Class'
                                required
                                value={listing.PostName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='description'
                                className='title'
                            >
                                Post Caption
                            </label>
                            <textarea
                                id='description'
                                name='PostCaption'
                                className='text'
                                rows='4'
                                placeholder='Add any job duties, expectations, requirements, etc'
                                value={listing.PostCaption}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='type'
                                className='title'
                            >
                                Cost
                            </label>
                            <select
                                id='salary'
                                name='Cost'
                                className='text'
                                required
                                value={listing.Cost}
                                onChange={handleChange}
                            >
                                <option value='Under $10'>Under $10</option>
                                <option value='$10 - 20'>$10 - $20</option>
                                <option value='$20 - 30'>$20 - $30</option>
                                <option value='$30 - 40'>$30 - $40</option>
                                <option value='$40 - 50'>$40 - $50</option>
                                <option value='$50 - 60'>$50 - $60</option>
                                <option value='$60 - 70'>$60 - $70</option>
                                <option value='$70 - 80'>$70 - $80</option>
                                <option value='$80 - 90'>$80 - $90</option>
                                <option value='$90 - 100'>$90 - $100</option>
                                <option value='Over $100'>Over $100</option>
                            </select>
                        </div>
                        <div className='space'>
                            <label className='title'>
                                Location
                            </label>
                            <input
                                type='text'
                                id='Location'
                                name='Location'
                                className='text'
                                placeholder='Activity Location'
                                required
                                value={listing.Location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='company'
                                className='title'
                            >
                                Business Name
                            </label>
                            <input
                                type='text'
                                id='company'
                                name='BusinessName'
                                className='text'
                                placeholder='Company Name'
                                value={listing.BusinessName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='contact_email'
                                className='title'
                            >
                                Contact Email
                            </label>
                            <input
                                type='Email'
                                id='contact_email'
                                name='Email'
                                className='text'
                                placeholder='Email address for customers'
                                required
                                value={listing.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='contact_phone'
                                className='title'
                            >
                                Contact Phone
                            </label>
                            <input
                                type='tel'
                                id='contact_phone'
                                name='Phone'
                                className='text'
                                placeholder='Optional Phone for customers'
                                value={listing.Phone}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <form className='space'onSubmit={handleSubmit}>
                            <h1 className='title'>Upload File</h1>
                            <input type='file' onChange={handleChange}/>
                            <button type='submit'>Upload</button>
                        </form>
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>} */}
                        <div>
                            <button
                                className='post-button'
                                type='button'
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default EditListing;
