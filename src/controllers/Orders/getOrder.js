const db = require("../../db");

const getPurchaseOrder = async (id) => {
  const orders = await db.Order.findAll({
    where: { userId: id },
  });

  return orders;
};

module.exports = getPurchaseOrder;
