const db = require("../../db");
const { uploadMultiImg } = require("../../utils/cloudinary/cloudinary");
const { deleteFile } = require("../../utils/helpers/delFile");

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

const createProduct = async (data, images) => {
  if (Array.isArray(images) && images.length > 0) {
    const response = await uploadMultiImg(images, data.category);
    const url = response.map((img) => img.secure_url);
    const public_id = response.map((img) => img.public_id);
    const product = {
      ...data,
      image_id: url,
      image_url: public_id,
      id: data.SKU ? data.SKU : generateSKU(),
    };

    const newProduct = await db.Product.create(product);
    deleteFile(images, 10000);
    return newProduct;
  }
  const product = {
    ...data,
    id: data.SKU ? data.SKU : generateSKU(),
  };
  const newProduct = await db.Product.create(product);
  return newProduct;
};

module.exports = createProduct;
