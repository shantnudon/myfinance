const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Retrieve all accounts for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [accounts] = db.query("SELECT * FROM accounts WHERE user_id = ?", [
      userId,
    ]);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve a specific account by account_id
router.get("/account/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const [account] = db.query("SELECT * FROM accounts WHERE account_id = ?", [
      accountId,
    ]);
    if (account.length === 0)
      return res.status(404).json({ message: "Account not found" });
    res.json(account[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new account for a user
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { account_name, account_type, balance } = req.body;
  try {
    const result = db.query(
      "INSERT INTO accounts (user_id, account_name, account_type, balance) VALUES (?, ?, ?, ?)",
      [userId, account_name, account_type, balance]
    );
    res.status(201).json({ accountId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update an existing account
router.put("/account/:accountId", async (req, res) => {
  const { accountId } = req.params;
  const { account_name, account_type, balance } = req.body;
  try {
    const result = db.query(
      "UPDATE accounts SET account_name = ?, account_type = ?, balance = ? WHERE account_id = ?",
      [account_name, account_type, balance, accountId]
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete an account
router.delete("/account/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const result = db.query("DELETE FROM accounts WHERE account_id = ?", [
      accountId,
    ]);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
