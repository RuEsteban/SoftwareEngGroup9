import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import './Mission.css';

function Mission() {
    return (
        <>
            <div className="mission-container">
                <div className="mission-content">
                    <h1 className="mission-title">Our Mission</h1>
                    <p className="mission-text">
                        At <span className="mission-highlight">Gator Connect</span>, our mission is to empower local and small businesses
                        by providing a platform to showcase their services to the community. We believe that every business, no matter
                        how small, deserves the opportunity to thrive.
                    </p>
                    <p className="mission-text">
                        By connecting businesses with local customers, we aim to foster a vibrant, sustainable economy that benefits everyone.
                        Our platform is user-friendly, ensuring businesses can focus on what they do best: serving their customers, while we handle
                        the marketing and exposure.
                    </p>
                    <p className="mission-cta">
                        Join us in supporting local businesses and building a stronger community!
                    </p>
                </div>
            </div>
            <Footer />
        </> 
    );
}

export default Mission;
