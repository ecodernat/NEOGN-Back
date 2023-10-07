const { Op } = require("sequelize");
const db = require("../../db");


async function getProductsByMinRating(min) {
  try {
    const products = await db.Product.findAll({
      where: {
        averageRating: {
          [Op.gte]: min
        }
      }
    });
    return products;
  } catch (error) {
    throw new Error("Error retrieving products by minimum rating");
  }
}

module.exports = getProductsByMinRating;