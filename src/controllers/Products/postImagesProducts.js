const db = require("../../db");
const {
  delMultiImg,
  uploadMultiImg,
} = require("../../utils/cloudinary/cloudinary");
const { deleteFile } = require("../../utils/helpers/delFile");

const postImagesProducts = async (id, images) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  if (!Array.isArray(images) || !images.length > 0)
    throw new Error("Not images uploaded");

  if (Array.isArray(product.image_id) && product.image_id > 0) {
    await delMultiImg(product.image_id);
  }

  const category = product.category;
  const result = await uploadMultiImg(images, category);

  const url = result.map((img) => img.secure_url);
  const public_id = result.map((img) => img.public_id);

  const updateProduct = {
    image_id: public_id,
    image_url: url,
  };
  deleteFile(images, 10000);

  await product.update({ ...product, ...updateProduct });
};

module.exports = postImagesProducts;
