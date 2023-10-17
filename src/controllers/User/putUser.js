const db = require("../../db");

const updateUser = async (id, data) => {
  const user = id.includes("-")
    ? await db.User.findOne({ where: { id } })
    : await db.User.findOne({ where: { clientId: id } });

  if (!user) throw new Error("User not found");

  await user.update({ ...user, ...data });

  return user;
};

module.exports = updateUser;
