const express = require("express");
const cron = require("node-cron");

const port = 3007;

const app = express();
app.use(express.json());

const db = require("./config/db");

function checkConnection() {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database as id", connection.threadId);
    connection.release(); // Release the connection back to the pool
  });
}

app.use("/accounts", require("./routes/accounts"));
app.use("/budgets", require("./routes/budgets"));
app.use("/categories", require("./routes/categories"));
app.use("/recurring_transactions", require("./routes/recurring_transactions"));
app.use("/transactions", require("./routes/transactions"));

app.listen(port, () => {
  checkConnection();
  console.log(`Server is running on port ${port}`);
});

// Runs every day at midnight (00:00) to check for due recurring transactions
cron.schedule("28 16 * * *", async () => {
  console.log("Running recurring transactions job...");
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [dueTransactions] = db.query(
      "SELECT * FROM recurring_transactions WHERE next_due_date <= ?",
      [today]
    );

    // Process each recurring transaction
    for (const transaction of dueTransactions) {
      const {
        user_id,
        account_id,
        category_id,
        amount,
        frequency,
        recurring_id,
      } = transaction;

      // Insert into transactions table
      db.query(
        "INSERT INTO transactions (user_id, account_id, category_id, amount, transaction_date, transaction_type) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, account_id, category_id, amount, today, "Income"] // Assuming salary is "Income"
      );

      // Calculate the next due date based on the frequency
      let nextDueDate = new Date(transaction.next_due_date);

      switch (frequency) {
        case "Daily":
          nextDueDate.setDate(nextDueDate.getDate() + 1);
          break;
        case "Weekly":
          nextDueDate.setDate(nextDueDate.getDate() + 7);
          break;
        case "Monthly":
          nextDueDate.setMonth(nextDueDate.getMonth() + 1);
          break;
        case "Yearly":
          nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
          break;
      }

      const formattedNextDueDate = nextDueDate.toISOString().slice(0, 10);

      // Update the next due date for the recurring transaction
      db.query(
        "UPDATE recurring_transactions SET next_due_date = ? WHERE recurring_id = ?",
        [formattedNextDueDate, recurring_id]
      );
    }

    console.log("Recurring transactions processed successfully.");
  } catch (error) {
    console.error("Error processing recurring transactions:", error.message);
  }
});
