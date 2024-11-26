const express = require("express");
const controller = require("../controller/led.controller");
const router = express.Router();
router.patch("/change-status/:status/:id", controller.changeStatus);
module.exports = router;
