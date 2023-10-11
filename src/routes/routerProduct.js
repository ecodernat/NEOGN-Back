const { Router } = require("express");

const upload = require("../services/multer/config");

const createProduct = require("../controllers/Products/createProduct");
const getProductById = require("../controllers/Products/getProductById");
const getProducts = require("../controllers/Products/getProducts");
const getProductsPage = require("../controllers/Products/getProductsPage");
const putProduct = require("../controllers/Products/putProduct");
const putRatingProduct = require("../controllers/Products/putRatingProducts");
const getFilteredProductsHandler = require("../controllers/Products/getProductFilter");
const deleteProduct = require("../controllers/Products/delProductById");

const router = Router();

router.get("/filter", async (req, res) => {
  try {
    const { category, min, max, order, page } = req.query;

    let products = await getFilteredProductsHandler(
      category,
      min,
      max,
      order,
      page
    );
    if (products.results.length === 0) {
      res
        .status(400)
        .json({ mensaje: "There are no products matching the filters" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

/**----            Traer productos             ----**/
router.get("/", async (req, res) => {
  try {
    const { name, page } = req.query;

    if (page) {
      const products = await getProductsPage(page);
      if (!products.results.length) throw Error("Invalid page");
      return res.json(products);
    }
    let products = name ? await getProducts(name) : await getProducts();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let product = await getProductById(id);

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----            Crear producto               ----**/

router.post("/create", upload.array("image"), async (req, res) => {
  try {
    const data = req.body;
    const images = req.files ?? null;
    const newProduct = await createProduct(data, images);

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----               Modificar producto          ----**/
router.put("/update/:id", upload.array("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const images = req.files ?? null;

    const product = await putProduct(id, data, images);

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----                   Rating                  ----**/

router.put("/rating/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const product = await putRatingProduct(id, rating);
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----          Borrado logico producto          ----**/

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Product successfully removed" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting product" });
  }
});

// router.post("/images/:id", upload.array("image"), (req, res) => {
//   try {
//     const { id } = req.params;
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
