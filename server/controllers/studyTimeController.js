const StudyTime = require("../models/studyTime");

exports.upsertStudyTime = async (req, res) => {
  const { userId, name, totalSeconds } = req.body;
  if (!userId || typeof totalSeconds !== "number" || Number.isNaN(totalSeconds)) {
    return res.status(400).json({ success: false, error: "userId and totalSeconds required" });
  }

  try {
    const doc = await StudyTime.findOneAndUpdate(
      { userId },
      { userId, name: name || "unknown", totalSeconds },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ success: true, studyTime: doc });
  } catch (err) {
    console.error("upsertStudyTime error", err);
    return res.status(500).json({ success: false, error: "save_failed" });
  }
};

exports.getAllStudyTimes = async (_req, res) => {
  try {
    const rows = await StudyTime.find({}).sort({ totalSeconds: -1, updatedAt: -1 });
    return res.json(rows);
  } catch (err) {
    console.error("getAllStudyTimes error", err);
    return res.status(500).json({ success: false, error: "fetch_failed" });
  }
};

exports.getUserStudyTime = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ success: false, error: "userId required" });
  try {
    const doc = await StudyTime.findOne({ userId });
    if (!doc) return res.json({ success: true, totalSeconds: 0 });
    return res.json({ success: true, totalSeconds: doc.totalSeconds, studyTime: doc });
  } catch (err) {
    console.error("getUserStudyTime error", err);
    return res.status(500).json({ success: false, error: "fetch_failed" });
  }
};

async function resetAllStudyTimesInternal() {
  try {
    await StudyTime.updateMany({}, { totalSeconds: 0, updatedAt: new Date() });
    console.log("[studyTime] all times reset to 0");
  } catch (err) {
    console.error("resetAllStudyTimesInternal error", err);
  }
}

exports.scheduleDailyReset = function scheduleDailyReset() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(5, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const msUntilNext = next.getTime() - now.getTime();
  console.log(`[studyTime] scheduling next reset in ${(msUntilNext / 1000 / 60).toFixed(1)} minutes`);

  setTimeout(() => {
    resetAllStudyTimesInternal();
    setInterval(resetAllStudyTimesInternal, 24 * 60 * 60 * 1000);
  }, msUntilNext);
};
