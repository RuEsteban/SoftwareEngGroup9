import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
                      <h2>About Us</h2>
                      <Link to='/team'>Our Team</Link>
                      <Link to='/mission'>Our Mission</Link>
          </div>
          <div class='footer-link-items'>
                      <h2>Contact Us</h2>
                      <p className='footer-text'>randomemail@fakeemail.com</p>
                      <p className='footer-text'>123-321-4321</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
