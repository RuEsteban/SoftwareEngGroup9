import React from 'react';
import styles from './WeAreNeutralCard.module.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = Array(5).fill(null);

  return (
    <div className={styles.starRating}>
      {stars.map((_, index) => (
        <img
          key={index}
          src={index < fullStars ? "https://cdn.builder.io/api/v1/image/assets/TEMP/1dacc6c49051a229de649b0f71983bb28cf4cd313c203553bc8c156aa4656344?placeholderIfAbsent=true&apiKey=410985596b3c4d1da6d52ff8bd9cab4c" : "https://cdn.builder.io/api/v1/image/assets/TEMP/774ea9aeb0e4d35ad03abd2bf7e27d53bfc8f11d10cf97ea1ab5830ab351936d?placeholderIfAbsent=true&apiKey=410985596b3c4d1da6d52ff8bd9cab4c"}
          alt={index < fullStars ? "Filled star" : "Empty star"}
          className={styles.starIcon}
        />
      ))}
    </div>
  );
};

export default StarRating;
