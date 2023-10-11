const { Op } = require("sequelize");
const db = require("../../db");
const getProductsPage = require("./getProductsPage");

const getProducts = async (name) => {
  // const products = name
  //   ? await db.Product.findAll({
  //       where: { name: { [Op.like]: `%${name}` } },
  //     })
  //   : await db.Product.findAll();

  const products = await db.Product.findAll();

  if (name) {
    const productsByName = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    return productsByName;
  }

  return products;
};

module.exports = getProducts;
