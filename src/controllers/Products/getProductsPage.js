const db = require("../../db");

const getProductsPage = async (page, products, url) => {
  const allProducts =
    Array.isArray(products) && products.length > 0
      ? products
      : await db.Product.findAll();

  page = page ? Number(page) : 1;

  const lastProduct = page * 10;
  const firstProduct = lastProduct - 10;
  const currentProducts = allProducts.slice(firstProduct, lastProduct);

  const next = page + 1 <= Math.ceil(allProducts.length / 10) ? page + 1 : null;
  const prev = page - 1 >= 1 ? page - 1 : null;

  url = url ?? "products";

  const data = {
    info: {
      count: allProducts.length,
      pages: Math.ceil(allProducts.length / 10),
      next: next
        ? `https://neogn-back.up.railway.app/api/${url}?page=${next}`
        : next,
      prev: prev
        ? `https://neogn-back.up.railway.app/api/${url}?page=${prev}`
        : prev,
    },
    results: currentProducts,
  };

  return data;
};

module.exports = getProductsPage;
