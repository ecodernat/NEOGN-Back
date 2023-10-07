const db = require("../../db");
const getPage = require("./getProductsPage");

const getFilteredProducts = async (category, min, max, order, page) => {
  let products = await db.Product.findAll();

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (min && max) {
    products = products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  if (order) {
    if (order === "A-Z") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "Z-A") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "Newest") {
      products.sort((a, b) => a.createdAt - b.createdAt);
    } else if (order === "Oldest") {
      products.sort((a, b) => b.createdAt - a.createdAt);
    } else if (order === "rating") {
      products.sort((a, b) => b.averageRating - a.averageRating);
    } else if (order === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (order === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (order === "discount") {
      products.sort((a, b) => b.discount - a.discount);
    } else {
      throw Error("Invalid order");
    }
  }

  page = page && page > 0 ? page : 1;

  return getPage(page, products);
};

module.exports = getFilteredProducts;
