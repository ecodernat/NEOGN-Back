const db = require("../../db");

const getAdmins = async (req, res) => {
  try {
    const admins = await db.User.findAll({
      where: {
        isAdmin: true,
      },
    });

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = getAdmins;
