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
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
