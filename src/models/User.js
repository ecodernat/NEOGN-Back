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
    password: {
      type: DataTypes.STRING,
    },
    photo_id: {
      type: DataTypes.STRING,
    },
    photo_url: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/testing-pf-swiftbuy/image/upload/v1695223617/swiftbuy/users/default/bxzutsvzxzslpak5evcq.jpg",
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
