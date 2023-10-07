const db = require("../../db");
const avgRating = require("../../utils/helpers/Average/avgRating");

const ratingProduct = async (id, rating) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("product not found");

  if (product.dataValues.rating.length >= 50) {
    product.rating.shift();
  }

  const newRating = [...product.rating, rating];

  await product.update({
    ...product,
    rating: newRating,
    averageRating: avgRating(newRating),
  });

  return product;
};

module.exports = ratingProduct;
