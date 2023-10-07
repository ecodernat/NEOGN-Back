const fs = require("fs");

const deleteFile = (images, delay) => {
  for (let img of images) {
    setTimeout(() => {
      fs.unlink(img.path, (error) => {
        error ? console.log("Error") : console.log("Success");
      });
    }, delay);
  }
};

module.exports = { deleteFile };
