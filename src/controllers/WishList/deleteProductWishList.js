const db = require("../../db");

const deleteProductWishList = async (id, idUser) => {
  const productWishList = await db.Product.findByPk(id);
  const user = await db.User.findByPk(idUser);

  if (!productWishList || !user) throw new Error("ID Error");

  await user.removeProducts(productWishList);

  return productWishList;
};

module.exports = deleteProductWishList;
