const { Router } = require("express");

const getAllOrders = require("../controllers/Orders/getAllOrders");
const getOrder = require("../controllers/Orders/getOrder");
const createOrder = require("../controllers/Orders/createOrder");
const getOrderById = require("../controllers/Orders/getOrderById");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrder(id);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/perid/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrderById(id);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newOrder = await createOrder(data);

    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
