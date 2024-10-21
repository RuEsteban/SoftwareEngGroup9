import React from 'react';
import styles from './WeAreNeutralCard.module.css';
import StarRating from './StarRating';

const WeAreNeutralCard = () => {
  return (
    <article className={styles.card}>
      <div className={styles.description}>
        <div className={styles.imageWrapper}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/977cfafb76fd78d8b8603bb15666cf016cc650fac432a6ba5437a8161890b988?placeholderIfAbsent=true&apiKey=410985596b3c4d1da6d52ff8bd9cab4c" 
            alt="We Are Neutral" 
            className={styles.cardImage}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.cardTitle}>We Are Neutral</h2>
          <div className={styles.cardDetails}>
            <div className={styles.ratingWrapper}>
              <div className={styles.starRating}>
                <StarRating rating={4} />
                <span className={styles.ratingCount}>52</span>
              </div>
              <div className={styles.separator} />
            </div>
            <div className={styles.distanceWrapper}>
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/adfd3e1ecf444d37d54ef9b6074906ad9361e1b44e6e755f4219df2efc9652bb?placeholderIfAbsent=true&apiKey=410985596b3c4d1da6d52ff8bd9cab4c" 
                alt="Distance icon" 
                className={styles.distanceIcon}
              />
              <span>2 Miles</span>
            </div>
            <span className={styles.categoryTag}>Environment</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WeAreNeutralCard;
