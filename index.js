const server = require("./src/server");
const { conn } = require("./src/db.js");
const bcryptjs = require("bcryptjs");
const data = require("./api/db.json");

const { Product, User } = require("./src/db");
const PORT = process.env.PORT || 3001;

const calculateAverageRating = require("./src/utils/helpers/avgRating");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      let idHard = "SKU000";

      const users = data.users.map((user) => {
        return {
          ...user,
          password: bcryptjs.hashSync(user.password, 10),
        };
      });

      const products = data.products.map((product) => {
        // const rating = product.rating.map((rat) => Math.round(rat));

        product.averageRating = calculateAverageRating(product.rating);
        product.discount = Math.floor(Math.random() * 25);

        let number = parseInt(idHard.split("U")[1]);
        number = number + 1;
        if (number >= 100) {
          idHard = idHard;
          return {
            ...product,
            id: `SKU${number}`,
            image_url: product.image,
          };
        }
        if (number < 10) {
          idHard = `SKU00${number}`;
          return {
            ...product,
            id: idHard,
            image_url: product.image,
          };
        }
        idHard = `SKU0${number}`;
        return {
          ...product,
          id: idHard,
          image_url: product.image,
        };
      });

      await Product.bulkCreate(products);
      await User.bulkCreate(users);

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
