const express = require("express");
const router = express.Router();
// 간단한 헬스 체크용
router.get("/status", (req, res) => res.json({ ok: true }));
module.exports = router;
