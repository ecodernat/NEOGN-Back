const db = require("../../db");

const generateSKU = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let sku = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }
  return sku;
};

const createProduct = async (data) => {
  const product = {
    ...data,
    id: data.SKU ? data.SKU : generateSKU(),
  };

  let {
    id,
    name,
    description,
    category,
    image,
    price,
    stock,
    SKU,
    discount,
    rating,
    averageRating,
    isAvailable,
  } = product;
  const newProduct = await db.Product.create({
    id,
    name,
    description,
    category,
    image,
    price,
    stock,
    SKU,
    discount,
    rating,
    averageRating,
    isAvailable,
  });

  return newProduct;
};

module.exports = createProduct;
