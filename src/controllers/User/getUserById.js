const db = require("../../db");

const getUser = async (id) => {
  try {
    const user = await db.User.findByPk(id, {
      include: [db.Order, db.Product],
    });

    return user
      ? user
      : (() => {
          throw new Error("User not found");
        })();
  } catch (error) {
    console.log(error);

    throw new Error("There was an error:" + error);
  }
};

module.exports = getUser;
