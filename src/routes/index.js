const { Router } = require("express");
const routerProduct = require("./routerProduct");
const routerUser = require("./routerUser");
const routerOrders = require("./routerOrder");
const routerPayment = require("./routerPayment");
const routerWishList = require("./routerWishList");
const routerAdmin = require("./routerAdmin");

const router = Router();

router.use("/products", routerProduct);
router.use("/users", routerUser);
router.use("/payment", routerPayment);
router.use("/favorite", routerWishList);
router.use("/admin", routerAdmin);
router.use("/orders", routerOrders);

module.exports = router;
