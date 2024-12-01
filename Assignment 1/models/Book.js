
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  publicationYear: { type: Number },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/150",
    validate: {
      validator: function (url) {
        return /^https?:\/\/.+/.test(url);
      },
      message: "Invalid URL format",
    },
  },
  isbn: { type: String, unique: true, sparse: true },
  description: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
