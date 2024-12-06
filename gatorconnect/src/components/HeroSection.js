import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const navProducts = () => {
    navigate('/add-post');

};
const navServices = () => {
  navigate('/services');

};
  return (
    <div className='hero-container'>
      <h1>GATOR CONNECT</h1>
      <div className='hero-btns'>
        <Button
          onClick = {navProducts}
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          POST
        </Button>
        <Button
          onClick = {navServices}
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          BROWSE
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
