const express = require("express");
const router = express.Router();
const { autoReturnSeat } = require("../controllers/seatController");

router.post("/return", autoReturnSeat);

module.exports = router;
