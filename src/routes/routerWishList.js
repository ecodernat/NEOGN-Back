const { Router } = require("express");

const router = Router();

const addProductWishList = require("../controllers/WishList/addProductWishList");
const deleteProductWishList = require("../controllers/WishList/deleteProductWishList");
const getProductWishList = require("../controllers/WishList/getProductWishList");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await getProductWishList(id);
    res.json(favorite);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Obtén el ID del usuario de los parámetros de la ruta
    const productId = req.body.productId; // Obtén el ID del producto del cuerpo de la solicitud

    const addedProduct = await addProductWishList(productId, userId);

    if (addedProduct) {
      res.json({
        message: "The product was added to the wishlist successfully",
      });
    } else {
      res.json({
        message: "There was an issue adding the product to the wishlist",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id, idUser } = req.body;
    const delFromWishList = await deleteProductWishList(id, idUser);

    res.json(delFromWishList);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
