const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    photo_id: {
      type: DataTypes.STRING,
    },
    photo_url: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/testing-pf-swiftbuy/image/upload/v1698972257/neogn/default/profile_default_kwonxb.png",
    },
    address: {
      type: DataTypes.TEXT,
    },
    wishlist: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isDisable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
