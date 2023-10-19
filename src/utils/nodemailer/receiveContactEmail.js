const transporter = require("../../services/nodemailer/config");

const receiveContactEmail = (name, email, message) => {
  try {
    const mailOptionsRegistro = {
      from: email,
      to: process.env.EMAIL_TESTING,
      subject: "Message receive!",
      html: `
   <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Message receive!</title>
    <style>
        body {
            font-family: Poppins, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 16px;
            text-decoration: none;
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
          background-color: rgb(239, 68, 68);
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
            <h1>The message we receive from user:</h1>
            <h3>${name}</h3>
            <h3>${email}</h3>
        </div>
        <div class="content">
            
            <p class="message">${message}</p>
  
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
        console.log("Receive contact email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico de registro:", error);
  }
};

module.exports = { receiveContactEmail };
