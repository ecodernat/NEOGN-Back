const { Router } = require("express");
const getAdmins = require("../controllers/Admin/getAdmins");

const router = Router();

router.get("/", getAdmins);

module.exports = router;
