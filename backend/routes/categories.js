const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Retrieve all categories for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [categories] = db.query(
      "SELECT * FROM categories WHERE user_id = ?",
      [userId]
    );
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve a specific category by category_id
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [category] = db.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [categoryId]
    );
    if (category.length === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json(category[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new category
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { category_name, category_type } = req.body;
  try {
    const result = db.query(
      "INSERT INTO categories (user_id, category_name, category_type) VALUES (?, ?, ?)",
      [userId, category_name, category_type]
    );
    res.status(201).json({ categoryId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update an existing category
router.put("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { category_name, category_type } = req.body;
  try {
    const result = db.query(
      "UPDATE categories SET category_name = ?, category_type = ? WHERE category_id = ?",
      [category_name, category_type, categoryId]
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a category
router.delete("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = db.query("DELETE FROM categories WHERE category_id = ?", [
      categoryId,
    ]);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
