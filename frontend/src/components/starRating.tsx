import React from 'react';

interface StarRatingProps {
    rating : number
}

const StarRating : React.FC<StarRatingProps> = ({ rating }) => {
  const MAX_STARS = rating;

  // Round the rating to the nearest half star
  const roundedRating = Math.round(rating * 2) / 2;

  // Create an array of stars based on the rounded rating
  const stars = Array.from({ length: MAX_STARS }, (_, index) => {
    const isHalf = index + 0.5 === roundedRating;
    const isFull = index + 1 <= roundedRating;

    return (
      <span key={index} className={`star ${isFull ? 'full' : ''} ${isHalf ? 'half' : ''}`}>
        ★
      </span>
    );
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
