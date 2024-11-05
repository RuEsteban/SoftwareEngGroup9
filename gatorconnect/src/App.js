import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services.js';
import Products from './components/pages/Products.js';
import SignUp from './components/pages/SignUp.js';
import Team from './components/pages/Team.js';
import Mission from './components/pages/Mission.js';
import Profile from './components/pages/Profile.js';
import AddPostPage from './components/pages/AddPostPage.js';
import ListingDetail from './components/pages/ListingDetails';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/team' element={<Team />} />
                    <Route path='/mission' element={<Mission />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/add-post' element= {<AddPostPage/>} />
                    <Route path='/listing/:id' element={<ListingDetail />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
