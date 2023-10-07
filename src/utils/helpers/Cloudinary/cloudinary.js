const { uploader, config } = require("cloudinary").v2;

const { CLOUD_NAME, API_CLOUDINARY_KEY, API_CLOUDINARY_SECRET } = process.env;

config({
  cloud_name: CLOUD_NAME,
  api_key: API_CLOUDINARY_KEY,
  api_secret: API_CLOUDINARY_SECRET,
});

const uploadImgProduct = async (filePath) => {
  return await uploader.upload(filePath, {
    folder: "NEOGN/products",
  });
};

const uploadImgUser = async (filePath) => {
  return await uploader.upload(filePath, {
    folder: "NEOGN/users",
  });
};

const deleteImg = async (publicId) => {
  return await uploader.destroy(publicId);
};

module.exports = { uploadImgProduct, uploadImgUser, deleteImg };
