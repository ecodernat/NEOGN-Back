// De prueba

const avgProducts = (products) => {
  let sum = 0;

  const allProducts = products.map((product) => {
    for (let x = 0; x < product.rating.length; x++) {
      sum = sum + product.rating[x];
    }
    let avg = sum / product.rating.length;
    sum = 0;
    return {
      ...product.dataValues,
      rating: avg,
    };
  });
  return allProducts;
};

module.exports = avgProducts;
