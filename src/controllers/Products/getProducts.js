const { Op } = require("sequelize");
const db = require("../../db");

const getProducts = async (name) => {
  const products = name
    ? await db.Product.findAll({
        where: { name: { [Op.like]: `%${name}` } },
      })
    : await db.Product.findAll();

  if (!products) throw new Error("Products not found");

  return products;
};

module.exports = getProducts;
