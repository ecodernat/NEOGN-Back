const db = require("../../db");

const getUsers = async () => {
  const users = await db.User.findAll();

  if (!users.length) throw new Error("Users not found");

  return users;
};

module.exports = getUsers;
