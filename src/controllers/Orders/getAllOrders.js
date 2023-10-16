const db = require("../../db");

const getAllOrders = async () => {
  const orders = await db.Order.findAll();

  if (!orders) throw new Error("Orders not found");

  return orders;
};

module.exports = getAllOrders;
