
const express = require("express");
const { body, validationResult } = require("express-validator");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("imageUrl").optional().isURL().withMessage("Invalid URL format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/", async (req, res) => {
  const { genre, author, publicationYear, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (genre) filter.genre = genre;
  if (author) filter.author = author;
  if (publicationYear) filter.publicationYear = publicationYear;

  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const count = await Book.countDocuments(filter);

    res.json({ books, total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
