const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Retrieve all transactions for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [transactions] = db.query(
      "SELECT * FROM transactions WHERE user_id = ?",
      [userId]
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new transaction
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const {
    account_id,
    category_id,
    amount,
    transaction_date,
    description,
    transaction_type,
  } = req.body;
  try {
    const result = db.query(
      "INSERT INTO transactions (user_id, account_id, category_id, amount, transaction_date, description, transaction_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        account_id,
        category_id,
        amount,
        transaction_date,
        description,
        transaction_type,
      ]
    );

    res.status(201).json({ transactionId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve a specific transaction by transaction_id
router.get("/transaction/:transactionId", async (req, res) => {
  const { transactionId } = req.params;
  try {
    const [transaction] = db.query(
      "SELECT * FROM transactions WHERE transaction_id = ?",
      [transactionId]
    );
    if (transaction.length === 0)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a transaction
router.put("/transaction/:transactionId", async (req, res) => {
  const { transactionId } = req.params;
  const {
    account_id,
    category_id,
    amount,
    transaction_date,
    description,
    transaction_type,
  } = req.body;
  try {
    const result = db.query(
      "UPDATE transactions SET account_id = ?, category_id = ?, amount = ?, transaction_date = ?, description = ?, transaction_type = ? WHERE transaction_id = ?",
      [
        account_id,
        category_id,
        amount,
        transaction_date,
        description,
        transaction_type,
        transactionId,
      ]
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Transaction not found" });

    // Optionally, adjust account balance if amount or transaction type is changed (not implemented here).
    res.json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a transaction
router.delete("/transaction/:transactionId", async (req, res) => {
  const { transactionId } = req.params;
  try {
    const result = db.query(
      "DELETE FROM transactions WHERE transaction_id = ?",
      [transactionId]
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
