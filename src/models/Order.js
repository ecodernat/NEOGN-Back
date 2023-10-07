const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      total: {
        type: DataTypes.STRING,
      },
      paymentMetod: {
        type: DataTypes.STRING,
        defaultValue: "Mercado Pago",
      },
      paymentId: {
        type: DataTypes.STRING,
      },
      preferenceId: {
        type: DataTypes.STRING,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "date",
      updatedAt: false,
    }
  );
};
