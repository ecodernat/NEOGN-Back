const db = require("../../db");

const putProduct = async (id, data) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  await product.update({ ...product, ...data });

  return product;
};

module.exports = putProduct;
