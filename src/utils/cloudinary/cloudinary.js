const cloudinary = require("../../services/cloudinary/config");

const uploadMultiImg = async (imageArray, category) => {
  const images = [];
  for (let img of imageArray) {
    const promise = cloudinary.uploader.upload(img.path, {
      folder: `neogn/products/${category}`,
    });
    images.push(promise);
  }
  return await Promise.all(images);
};

const uploadImgProduct = async (filePath, category) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: `neogn/products/${category}`,
    allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"],
  });
};

const uploadImgUser = async (filePath, username) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: `neogn/users/${username}`,
    allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"],
  });
};

const delImageCloud = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

const delMultiImg = async (publicIdArray) => {
  const del = [];
  for (let id of publicIdArray) {
    const promise = cloudinary.uploader.destroy(id);
    del.push(promise);
  }
  return await Promise.all(del);
};

module.exports = {
  uploadImgProduct,
  uploadImgUser,
  delImageCloud,
  uploadMultiImg,
  delMultiImg,
};
