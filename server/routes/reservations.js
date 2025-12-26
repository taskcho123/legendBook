const express = require("express");
const router = express.Router();
const {
  createReservation,
  cancelReservation,
  getReservation,
} = require("../controllers/reservationController");

router.post("/", createReservation);
router.delete("/:userId", cancelReservation);
router.get("/:userId", getReservation);

module.exports = router;
