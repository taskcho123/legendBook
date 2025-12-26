const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  seatNumber: String,
  occupiedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  occupiedAt: Date,
});

module.exports = mongoose.model("Seat", SeatSchema);
