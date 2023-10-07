const db = require("../../db");

const signUp = async ({ name, username, email, password, photo }) => {
  try {
    if (!name || !username || !email || !password) {
      throw new Error("Missing data");
    }

    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
      photo: photo,
    };

    const [user, created] = await db.User.findOrCreate({
      where: { email: email },
      defaults: userData,
    });

    if (!created) {
      throw new Error("Email already exists");
    }

    return user;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating user: " + error);
  }
};

module.exports = signUp;
