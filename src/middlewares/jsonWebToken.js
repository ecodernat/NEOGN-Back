const jwt = require("jsonwebtoken");
const { JWT_SIGN } = process.env;

const tokenGenerator = async (data) => {
  const token = await jwt.sign(data, JWT_SIGN, {
    expiresIn: "24h",
  });
  return token;
};

const tokenValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    await jwt.verify(token, JWT_SIGN);

    // req.token = token;

    next();
  } catch (error) {
    res.status(500).json({ error: "You don't have access to this site" });
  }
};

module.exports = { tokenGenerator, tokenValidator };
