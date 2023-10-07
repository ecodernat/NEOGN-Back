const db = require("../../db");

const getPurchaseOrder = async (id) => {
  const order = await db.Order.findAll(
    { where: { userId: id } },
    {
      include: {
        model: db.Product,
        through: {
          attributes: [],
        },
      },
    }
  );

  return order;
};

module.exports = getPurchaseOrder;
