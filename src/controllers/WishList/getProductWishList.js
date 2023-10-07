const db = require("../../db");

const getProductWishList = async (id) => {
  const userWishList = await db.User.findByPk(id, {
    include: {
      model: db.Product,
    },
  });
  return userWishList;
};

module.exports = getProductWishList;
