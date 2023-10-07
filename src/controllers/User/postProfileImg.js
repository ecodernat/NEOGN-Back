const db = require("../../db");
const {
  uploadImgUser,
  delImageCloud,
} = require("../../utils/cloudinary/cloudinary");
const { deleteFile } = require("../../utils/helpers/delFile");

const postProfilePic = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file.path;
    const user = await db.User.findByPk(id);
    if (user.photo_id) {
      await delImageCloud(user.photo_id);
    }
    const upload = await uploadImgUser(image, user.username);
    await user.update({ photo_id: upload.public_id, photo_url: upload.url });
    deleteFile(image, 10000);
    res.status(200).json(upload.url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postProfilePic;
