const { User } = require("../../db");
const mercadopago = require("mercadopago");

const createPreference = async (req, res) => {
  try {

    const { items, shipinfo, transaction_amount, userId } = req.body;

    let user;
    if (userId) {
      user = await User.findByPk(userId);
    }
    const newOrder =
      user &&
      (await user.createOrder({
        total: transaction_amount,
        userId,
        products: items,
      }));
    var preference = {
      shippinginfo: shipinfo,
      transaction_amount,
      items,
      back_urls: {
        success: 'http://localhost:5173/',
      },
      notification_url: 'https://c8bc-2800-810-5ea-2fb-1116-f07d-c27a-798e.ngrok-free.app/api/payment/webhook',
      external_reference: newOrder ? `${newOrder.id}` : "",
    };

    const response = await mercadopago.preferences.create(preference);
    const data = response.body;
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

module.exports = createPreference;
