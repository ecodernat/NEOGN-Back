const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mercadopago = require("mercadopago");
const helmet = require("helmet");
const compression = require("compression");

const router = require("./routes");

const server = express();

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

server.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://http2.mlstatic.com"],
  },
}));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan("dev"));
server.use(compression());
server.use(cors());

server.use("/api", router);

module.exports = server;
