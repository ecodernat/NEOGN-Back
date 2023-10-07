const bcryptjs = require("bcryptjs");
const db = require("../../db");

const updateUser = async (id, data) => {
  const user = await db.User.findByPk(id);

  if (!user) throw new Error("User not found");

  if (data.password && data.password !== user.password)
    data.password = await bcryptjs.hash(password, 10);

  await user.update({ ...user, ...data });

  return user;
};

module.exports = updateUser;
