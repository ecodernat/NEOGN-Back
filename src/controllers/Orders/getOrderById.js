const db = require("../../db");

const getOrderPerId = async (id) => {
  const order = await db.Order.findByPk(id);

  return order;
};

module.exports = getOrderPerId;
