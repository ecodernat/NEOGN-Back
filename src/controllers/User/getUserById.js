const db = require("../../db");

const getUser = async (clientId) => {
  try {
    const user = await db.User.findOne({ where: { clientId } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = getUser;
