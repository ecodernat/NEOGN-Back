const db = require("../../db");

const createOrder = async (data) => {
  const { userId, paymentId, status, total, products, preferenceId } = data;

  const newOrder = await db.Order.create({
    paymentId,
    status,
    total,
    products,
    preferenceId,
  });

  if (userId) {
    const user = await db.User.findByPk(userId);

    if (user) {
      await newOrder.setUser(userId);
      return newOrder;
    } else {
      throw new Error("The user was not found in the database.");
    }
  } else {
    return newOrder;
  }
};

module.exports = createOrder;
