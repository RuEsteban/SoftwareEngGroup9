import React, { useState } from 'react';
import '../../App.css';
import './AddPost.css';
import Footer from '../Footer';
import axios from 'axios';
import {collection, addDoc, getDocs, doc, setDoc} from 'firebase/firestore'
import {db} from './Firebase'
import {listings} from './Services';
import {getAuth} from 'firebase/auth'



const AddPostPage = () => {

    const[postName, setPostName] = useState()
    const[postCaption, setCaption] = useState()
    const[cost, setCost] = useState()
    const[location, setLocation] = useState()
    const[businessName, setBusinessName] = useState()
    const[email, setEmail] = useState()
    const[phone, setPhone] = useState()

    //https://www.filestack.com/fileschool/react/react-file-upload/

    // const [file, setFile] = useState()
    // const [uploadedFileURL, setUploadedFileURL] = useState(null)

    const dbref = collection(db, "AllPosts")

    const send = async () =>
    {
        const auth = getAuth();

        try
        {
            const userPostDoc = doc(db, "AllPosts", auth.currentUser.uid);
            setDoc(userPostDoc, {merge: true});
            const userPostCollection = collection(userPostDoc, 'userPosts');
            await addDoc(userPostCollection, {
               PostName: postName,
               PostCaption: postCaption, 
               Cost: cost,
               Location: location,
               BusinessName: businessName,
               Email: email,
               Phone: phone
                }  
            );
            alert("Post Sent Successfully")

        }
        catch(error)
        {
            alert("Error while sending the post")
        }
    }

    // function handleChange(event) {
    //     setFile(event.target.files[0])
    // }
    
    // function handleSubmit(event) {
    //     event.preventDefault()
    //     const url = 'http://localhost:3000/add-post';
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('fileName', file.name);
    //     const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data',
    //         },
    //     };
    //     axios.post(url, formData, config).then((response) => {
    //         setFile(event.target.files[0]);
    //         //setUploadedFileURL(response/data/fileUrl);
    //     });

    // }


    return (
        <section className='page'>
            <div className='container'>
                <div className='box'>
                    <form>
                        <h2 className='addPostTxt'>Add Post</h2>
                        <div className='space'>
                            <label className='title'>
                                Post Name
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                className='text'
                                placeholder='eg. Pottery Class'
                                required
                                value={postName}
                                onChange={(e) => setPostName(e.target.value)}
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
                                name='description'
                                className='text'
                                rows='4'
                                placeholder='Add any job duties, expectations, requirements, etc'
                                value={postCaption}
                                onChange={(e) => setCaption(e.target.value)}
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
                                name='salary'
                                className='text'
                                required
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
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
                                id='location'
                                name='location'
                                className='text'
                                placeholder='Activity Location'
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
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
                                name='company'
                                className='text'
                                placeholder='Company Name'
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
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
                                type='email'
                                id='contact_email'
                                name='contact_email'
                                className='text'
                                placeholder='Email address for customers'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                name='contact_phone'
                                className='text'
                                placeholder='Optional phone for customers'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                type='submit'
                                onClick={send}
                            >
                                Add Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddPostPage;