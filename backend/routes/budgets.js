const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Retrieve all budgets for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [budgets] = db.query("SELECT * FROM budgets WHERE user_id = ?", [
      userId,
    ]);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve a specific budget by budget_id
router.get("/budget/:budgetId", async (req, res) => {
  const { budgetId } = req.params;
  try {
    const [budget] = db.query("SELECT * FROM budgets WHERE budget_id = ?", [
      budgetId,
    ]);
    if (budget.length === 0)
      return res.status(404).json({ message: "Budget not found" });
    res.json(budget[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new budget
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { category_id, amount, start_date, end_date } = req.body;
  try {
    const result = db.query(
      "INSERT INTO budgets (user_id, category_id, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
      [userId, category_id, amount, start_date, end_date]
    );
    res.status(201).json({ budgetId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update an existing budget
router.put("/budget/:budgetId", async (req, res) => {
  const { budgetId } = req.params;
  const { category_id, amount, start_date, end_date } = req.body;
  try {
    const result = db.query(
      "UPDATE budgets SET category_id = ?, amount = ?, start_date = ?, end_date = ? WHERE budget_id = ?",
      [category_id, amount, start_date, end_date, budgetId]
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Budget not found" });
    res.json({ message: "Budget updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a budget
router.delete("/budget/:budgetId", async (req, res) => {
  const { budgetId } = req.params;
  try {
    const result = db.query("DELETE FROM budgets WHERE budget_id = ?", [
      budgetId,
    ]);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Budget not found" });
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
