const express = require("express");
const router = express.Router();
const {
  upsertStudyTime,
  getAllStudyTimes,
  getUserStudyTime,
} = require("../controllers/studyTimeController");

router.get("/all", getAllStudyTimes);
router.get("/:userId", getUserStudyTime);
router.post("/update", upsertStudyTime);

module.exports = router;
