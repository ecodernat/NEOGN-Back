const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const mercadopago = require("mercadopago");

const server = express();

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/api", router);

module.exports = server;
