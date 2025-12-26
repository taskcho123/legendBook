const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudyTimeSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    totalSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyTime", StudyTimeSchema);
