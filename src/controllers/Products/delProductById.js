const db = require('../../db');

const deleteProduct = async (productId) => {
  const product = await db.Product.findByPk(productId);

  if (!product) throw new Error('Product not found');

  if (!product.isAvailable) throw new Error('Product is already deleted');

  product.isAvailable = false;
  await product.save();
};

module.exports = deleteProduct;