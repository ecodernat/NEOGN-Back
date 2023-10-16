const db = require("../../db");

const updateUser = async (clientId, data) => {
  const user = await db.User.findOne({ where: { clientId } });

  if (!user) throw new Error("User not found");

  await user.update({ ...user, ...data });

  return user;
};

module.exports = updateUser;
