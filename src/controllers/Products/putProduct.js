const db = require("../../db");
const {
  deleteImg,
  uploadImgProduct,
} = require("../../utils/helpers/Cloudinary/cloudinary");

const putProduct = async (id, data) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  let updateProduct = { ...data };

  await product.update(updateProduct);

  return product;
};

module.exports = putProduct;
