import React from 'react';
import '../../App.css';
import './AddPost.css';
import Footer from '../Footer';

const AddPostPage = () => {
    return (
        <section className='page'>
            <div className='container'>
                <div className='box'>
                    <form onSubmit={SubmitEvent}>
                        <h2 className='addPostTxt'>Add Post</h2>
                        <div className='space'>
                            <label className='title'>
                                Job Listing Name
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                className='text'
                                placeholder='eg. Beautiful Apartment In Miami'
                                required
                                //value={title}
                                //onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='space'>
                            <label
                                htmlFor='description'
                                className='title'
                            >
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                className='text'
                                rows='4'
                                placeholder='Add any job duties, expectations, requirements, etc'
                                //value={description}
                                //onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddPostPage;