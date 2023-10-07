const { Order, User, Product } = require("../../db");
const { sendPurchaseEmail } = require("../../utils/email");
const mercadopago = require("mercadopago");

const receiveWebHook = async (req, res) => {
  try {
    const {query} = req;
    console.log(req.body);
    console.log(query);
    const topic = query.topic || query.type;
    console.log({topic});
    switch (topic) {
      case "payment":
        const paymentId = query.id || query['data.id'];
        console.log(topic, 'getting payment', paymentId);
        payment = await mercadopago.payment.findById(paymentId);
        // console.log(payment);

        var { body } = await mercadopago.merchant_orders.findById(payment.body.order.id);
        break;

      case "merchant_order":
        const orderId = query.id;
        console.log(topic, 'getting payment', orderId);
        var { body } = await mercadopago.merchant_orders.findById(orderId);
        break;
    }

    console.log(body);

    var paidAmount = 0;
    body.payments.forEach(payment => {
      if(payment.status === 'approved') {
        paidAmount += payment.transaction_amount;
      }
    });
    if(paidAmount >= body.total_amount) {
      console.log('El pago se completó 😄');
    } else {
      console.log('El pago NO se completó 😔');
    }

    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = receiveWebHook;
