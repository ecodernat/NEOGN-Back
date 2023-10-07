const db = require("../../db");

const addProductWishList = async (id, idUser) => {
  const productWishList = await db.Product.findByPk(id);
  const user = await db.User.findByPk(idUser);

  if (!user || !productWishList) throw new Error("ID Error");

  await user.addProducts(productWishList);

  return productWishList;
};

module.exports = addProductWishList;
