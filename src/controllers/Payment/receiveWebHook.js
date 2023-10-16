const { Order, User, Product } = require("../../db");
const {
  sendPurchaseEmail,
} = require("../../utils/nodemailer/sendPurchaseEmail");
const mercadopago = require("mercadopago");
const axios = require("axios");

const processedRequests = new Set();

const receiveWebHook = async (req, res) => {
  try {
    const { query } = req;
    const { params } = req;
    console.log("params", params.userId);
    console.log("req.body", req.body);

    const topic = query.topic || query.type;

    console.log({ topic });

    const requestId = query.id || query["data.id"];

    if (processedRequests.has(requestId)) {
      console.log(
        `Solicitud duplicada recibida con ID: ${requestId}. Ignorando.`
      );
      res.send();
      return;
    }

    processedRequests.add(requestId);

    switch (topic) {
      case "payment":
        const paymentId = requestId;
        console.log(topic, "getting payment", paymentId);
        payment = await mercadopago.payment.findById(paymentId);
        console.log("payment.body", payment.body);

        var { body } = await mercadopago.merchant_orders.findById(
          payment.body.order.id
        );
        break;

      case "merchant_order":
        const orderId = requestId;
        console.log(topic, "getting merchant order", orderId);
        var { body } = await mercadopago.merchant_orders.findById(orderId);
        break;
    }

    console.log("body merchant order", body);

    var paidAmount = 0;
    body.payments.forEach((payment) => {
      if (payment.status === "approved") {
        paidAmount += payment.transaction_amount;
      }
    });
    if (paidAmount >= body.total_amount) {
      console.log("El pago se completó 😄");
      try {
        if (params.userId && params.userId.trim() !== "") {
          const createUserResponse = await axios.post(
            "http://localhost:3001/api/orders",
            {
              userId: params.userId,
              paymentId: requestId,
              status: body.order_status,
              total: body.paid_amount,
              products: body.items,
              preferenceId: body.preference_id,
            }
          );
          if (createUserResponse.status === 200) {
            console.log("Order Created");
          }
        }
      } catch (error) {
        console.log("Usuario no existe");
      }
    } else {
      console.log("El pago NO se completó 😔");
    }

    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = receiveWebHook;
