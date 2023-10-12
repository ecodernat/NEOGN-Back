const db = require("../../db");
const {
  delMultiImg,
  uploadMultiImg,
} = require("../../utils/cloudinary/cloudinary");
const { deleteFile } = require("../../utils/helpers/delFile");

const putProduct = async (id, data, images) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  let updateProduct = { ...data };

  if (Array.isArray(images) && images.length > 0) {
    if (Array.isArray(product.image_id) && product.image_id > 0) {
      await delMultiImg(product.image_id);
    }

    const category = updateProduct.category ?? product.category;
    const result = await uploadMultiImg(images, category);

    const url = result.map((img) => img.secure_url);
    const public_id = result.map((img) => img.public_id);

    updateProduct = {
      ...updateProduct,
      image_id: public_id,
      image_url: url,
    };
    deleteFile(images);
  }

  await product.update({ ...product, ...updateProduct });

  return product;
};

module.exports = putProduct;
