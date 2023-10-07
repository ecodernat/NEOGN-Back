const { Router } = require("express");

const createPreferenceMP = require("../controllers/Payment/createPreferenceMP");
const receiveWebHookMP = require("../controllers/Payment/receiveWebHook");

const router = Router();

router.post("/create-preference", createPreferenceMP);

router.post("/webhook", receiveWebHookMP);

module.exports = router;
