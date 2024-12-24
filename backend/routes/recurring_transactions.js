const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Retrieve all recurring transactions for a user
router.get("/:userId/", async (req, res) => {
  const { userId } = req.params;
  try {
    const [recurringTransactions] = db.query(
      "SELECT * FROM recurring_transactions WHERE user_id = ?",
      [userId]
    );
    res.json(recurringTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve a specific recurring transaction by recurring_id
router.get("/recurring-transaction/:recurringId", async (req, res) => {
  const { recurringId } = req.params;
  try {
    const [recurringTransaction] = db.query(
      "SELECT * FROM recurring_transactions WHERE recurring_id = ?",
      [recurringId]
    );
    if (recurringTransaction.length === 0)
      return res
        .status(404)
        .json({ message: "Recurring transaction not found" });
    res.json(recurringTransaction[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new recurring transaction
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const {
    account_id,
    category_id,
    amount,
    frequency,
    next_due_date,
    description,
  } = req.body;
  try {
    const result = db.query(
      "INSERT INTO recurring_transactions (user_id, account_id, category_id, amount, frequency, next_due_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        account_id,
        category_id,
        amount,
        frequency,
        next_due_date,
        description,
      ]
    );
    res.status(201).json({ recurringId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update an existing recurring transaction
router.put("/recurring-transaction/:recurringId", async (req, res) => {
  const { recurringId } = req.params;
  const {
    account_id,
    category_id,
    amount,
    frequency,
    next_due_date,
    description,
  } = req.body;
  try {
    const result = db.query(
      "UPDATE recurring_transactions SET account_id = ?, category_id = ?, amount = ?, frequency = ?, next_due_date = ?, description = ? WHERE recurring_id = ?",
      [
        account_id,
        category_id,
        amount,
        frequency,
        next_due_date,
        description,
        recurringId,
      ]
    );
    if (result[0].affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Recurring transaction not found" });
    res.json({ message: "Recurring transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a recurring transaction
router.delete("/recurring-transaction/:recurringId", async (req, res) => {
  const { recurringId } = req.params;
  try {
    const result = db.query(
      "DELETE FROM recurring_transactions WHERE recurring_id = ?",
      [recurringId]
    );
    if (result[0].affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Recurring transaction not found" });
    res.json({ message: "Recurring transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
