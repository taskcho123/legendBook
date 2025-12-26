const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
