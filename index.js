const server = require("./src/server");
const { conn } = require("./src/db.js");

const dataProducts = require("./api/db.json");

const { Product } = require("./src/db");
const PORT = process.env.PORT || 3001;

const calculateAverageRating = require("./src/utils/helpers/avgRating");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      let idHard = "SKU000";

      const products = dataProducts.map((product) => {
        const rating = product.rating.map((rat) => Math.round(rat));

        product.averageRating = calculateAverageRating(rating);
        product.discount = Math.floor(Math.random() * 25);

        let number = parseInt(idHard.split("U")[1]);
        number = number + 1;
        if (number >= 100) {
          idHard = idHard;
          return {
            ...product,
            id: `SKU${number}`,
            image_url: [product.image],
          };
        }
        if (number < 10) {
          idHard = `SKU00${number}`;
          return {
            ...product,
            id: idHard,
            image_url: [product.image],
          };
        }
        idHard = `SKU0${number}`;
        return {
          ...product,
          id: idHard,
          image_url: [product.image],
        };
      });

      await Product.bulkCreate(products);

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
