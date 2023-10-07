const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, API_CLOUDINARY_KEY, API_CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_CLOUDINARY_KEY,
  api_secret: API_CLOUDINARY_SECRET,
});

module.exports = cloudinary;
