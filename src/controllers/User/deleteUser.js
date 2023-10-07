const db = require("../../db");

const deleteUser = async (id) => {
  try {
    let user = await db.User.findByPk(id);

    const message = !user
      ? "User not found"
      : user.isDisabled
      ? "User is already disabled"
      : ((user.isDisabled = true), "The user has been deleted");

    if (message === "The user has been deleted") {
      await user.save();
    }

    return message;
  } catch (error) {
    console.log(error);

    throw new Error("There was an error:" + error);
  }
};

module.exports = deleteUser;
