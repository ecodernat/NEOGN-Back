const { User } = require("../../db");
const mercadopago = require("mercadopago");

const createPreference = async (req, res) => {
  try {
    const { items, transaction_amount, userId } = req.body;
    // console.log("USER:", userId);
    let preference = {
      transaction_amount,
      items,
      back_urls: {
        success: process.env.DEPLOY_FRONT,
      },
      notification_url: `${process.env.DEPLOY_BACK}/api/payment/webhook/${userId}`,
      // auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    const data = response.body;
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

module.exports = createPreference;
