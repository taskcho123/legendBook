const express = require("express");
const router = express.Router();
const { listBooks } = require("../controllers/bookController");

router.get("/", listBooks);

module.exports = router;
