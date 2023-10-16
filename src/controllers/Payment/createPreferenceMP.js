const { User } = require("../../db");
const mercadopago = require("mercadopago");

const createPreference = async (req, res) => {
  try {
    const { items, transaction_amount, userId } = req.body;
    console.log("USER:", userId);
    let preference = {
      transaction_amount,
      items,
      back_urls: {
        success: "http://localhost:5173/",
      },
      notification_url: `https://13a7-2800-810-5ea-82b6-65a6-9426-c179-f589.ngrok-free.app/api/payment/webhook/${userId}`,
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
