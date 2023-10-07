const db = require("../../db");
const transporter = require("../../services/nodemailer/config");

const sendRegistrationEmail = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const mailOptionsRegistro = {
      from: "test.ecomerce420@gmail.com",
      to: user.email,
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
            <a class="cta-button" href="http://swiftbuypf.netlify.app">Visit SwiftBuy</a>
        </div>
        <div class="footer">
            <p>© 2023 Henry Project. All rights reserved.</p>
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

module.exports = { sendRegistrationEmail };
