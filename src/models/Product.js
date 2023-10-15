const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    image_id: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image_url: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    rating: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: null,
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
