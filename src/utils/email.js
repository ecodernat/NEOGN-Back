const nodemailer = require("nodemailer");
const { User, Product } = require("../db");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmail = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const mailOptionsRegistro = {
      from: "test.ecomerce420@gmail.com",
      to: user.email, // correo electrónico almacenado en User
      subject: "Successful registration",
      html: `
   <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>¡Thanks for registering!</title>
    <style>
        body {
            font-family: Poppins, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid black;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 30px;
        }

        .thank-you {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .message {
            font-size: 16px;
            line-height: 1.5;
        }

        .cta-button {
          display: inline-block;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background-color: #dd6bbb;
          color: #000000;
          text-decoration: none;
          text-style: none;
          border-radius: 5px;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            font-weight: 800;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>¡Thanks for registering!</h1>
        </div>
        <div class="content">
            <p class="thank-you">¡Hi ${user.name}!</p>
            <p class="message">Thank you for registering on our site. We are excited to have you 
            as part of our community.</p>
            <p class="message">If you have any questions or need help, don't hesitate to contact us.</p>
            <p class="message">¡We hope you enjoy all the benefits we have to offer.!</p>
            <p class="message">Click the button below to start exploring our site:</p>
            <a class="cta-button" href="">Visit NEOGN</a>
        </div>
        <div class="footer">
            <p>© 2023 NEOGN. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
  `,
    };

    transporter.sendMail(mailOptionsRegistro, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Registration email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico de registro:", error);
  }
};

const sendPurchaseEmail = async (user, order) => {
  try {
    const productList = await Promise.all(
      order.products.map(async (product) => {
        const item = await Product.findByPk(product.id);
        if (!item) {
          throw new Error(`Product not found with id: ${product.id}`);
        }
        return {
          name: item.title.slice(0, 45) + "...",
          price: item.price,
        };
      })
    );
    const formattedDate = new Date().toLocaleDateString();

    function getStatusBasedEmailHtml(user, productList, status) {
      if (status === "success") {
        return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Thank you for your purchase at NEOGN!</title>
          <style>
              /* Estilos generales */
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f8f9fa;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }

              .cta-button {
                display: inline-block;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background-color: #dd6bbb;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
              }
      
              /* Estilos para la tarjeta */
              .card {
                  padding: 20px;
                  background-color: #f7f7f7;
                  border-radius: 5px;
                  border: 1px solid #e5e5e5;
                  margin-bottom: 20px;
              }
      
              /* Estilos para la lista de productos */
              .product-list {
                  list-style: none;
                  padding: 0;
                  margin: 15px 0;
                  color: #333333;
              }
      
              .product-list li {
                  margin-bottom: 5px;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="card">
                  <h1>Thank you for your purchase at NEOGN!</h1>
                  <p>Hi ${user.name}!</p>
                  <p>Thank you for making your purchase on our site. We hope you are excited to receive your order.</p>
              </div>
              <div class="card">
                  <h2>Here are the details of your purchase:</h2>
                  <ul class="product-list">
                      ${productList
                        .map(
                          (product) =>
                            `<li>Producto: ${product.name}<br>Precio: ${product.price}</li>`
                        )
                        .join("")}
                  </ul>
                  <p>Date of purchase: ${formattedDate}</p>
                  <p>If you have any questions or need help with your order, don't hesitate to contact us.</p>
                  <p>We hope you enjoy your purchase and come back soon!</p>
                  <p>Click the button below to visit our site:</p>
                  <a class="cta-button" href="">Visit NEOGN</a>
              </div>
              <p class="footer">© 2023 NEOGN. All rights reserved.</p>
          </div>
      </body>
      
      </html>
      `;
      } else {
        return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Continue your shopping at NEOGN!</title>
          <style>
              /* Estilos generales */
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f8f9fa;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
      
              /* Estilos para la tarjeta */
              .card {
                  padding: 20px;
                  background-color: #fce9e9;
                  border-radius: 5px;
                  border: 1px solid #e5e5e5;
                  margin-bottom: 20px;
              }
      
              /* Estilos para el botón */
              .cta-button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #dd6bbb;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
      
              .cta-button:hover {
                  background-color: #c55fa5;
              }
      
              /* Estilos para el pie de página */
              .footer {
                  text-align: center;
                  font-size: 14px;
                  font-weight: 800;
                  color: #888888;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="card">
                  <h1>Continue your shopping at NEOGN!</h1>
                  <p>Hi ${user.name}!</p>
                  <p>We noticed that your payment was not approved, but don't worry. You can continue your purchase at another time.</p>
              </div>
              <div class="card">
                  <p>If you have any problems with the payment or need more information, do not hesitate to contact us.</p>
                  <p>We hope to see you soon at NEOGN!</p>
                  <p>Click the button below to visit our site:</p>
                  <a class="cta-button" href="">Visit NEOGN</a>
              </div>
              <p class="footer">© 2023 NEOGN. All rights reserved.</p>
          </div>
      </body>
      
      </html>
      `;
      }
    }

    const mailOptionsCompra = {
      from: "test.ecomerce420@gmail.com",
      to: user.email,
      subject: "Purchase confirmation",
      html: getStatusBasedEmailHtml(user, productList, order.status),
    };

    transporter.sendMail(mailOptionsCompra, (error, info) => {
      if (error) {
        console.error("Error sending purchase email:", error);
      } else {
        console.log("Purchase email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error sending purchase email:", error);
  }
};

module.exports = {
  sendRegistrationEmail,
  sendPurchaseEmail,
};
