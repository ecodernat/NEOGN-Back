const calculateAverageRating = (ratingArray) => {
  const validRatings = ratingArray.filter(
    (rating) => typeof rating === "number" && !isNaN(rating)
  );
  const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
  const avg = validRatings.length > 0 ? totalRating / validRatings.length : 0;
  return parseFloat(avg.toFixed(2));
};

module.exports = calculateAverageRating;
