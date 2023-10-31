require("dotenv").config();
const { Sequelize } = require("sequelize");

const orderModel = require("./models/Order");
const paymentModel = require("./models/Payment");
const productModel = require("./models/Product");
const userModel = require("./models/User");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/neogn`,
  {
    logging: false,
    native: false,
  }
);

orderModel(sequelize);
paymentModel(sequelize);
productModel(sequelize);
userModel(sequelize);

const { User, Order, Product } = sequelize.models;

Product.belongsToMany(User, { through: "ProductsUser" });
User.belongsToMany(Product, { through: "ProductsUser" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
