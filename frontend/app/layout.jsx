"use client";

import { useState } from "react";
import AccordionItem from "@/components/accordian";
import "./globals.css";
import Modal from "@/components/modal";
import axios from "axios";

// export const metadata = {
//   title: "DON FINANCE MANAGER",
//   description: "Manage all your finances in one place.",
// };

export default function RootLayout({ children }) {
  const userId = 1; // Hardcoded for now
  const [openIndex, setOpenIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [selectedOption, setSelectedOption] = useState("accounts"); // Default option

  // Handle change in dropdown selection
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAccountsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(`/accounts/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBudgetsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(`/budgets/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoriesSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(`/categories/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(`/investment/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(`/transactions/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecurringTransactionsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(
        `/recurring_transactions/${userId}`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <html lang="en">
      <body>
        <Modal isOpen={isModalOpen} onClose={toggleModal} title="Add Details">
          <div>
            <select
              id="category"
              name="category"
              value={selectedOption}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="accounts">Accounts</option>
              <option value="budgets">Budgets</option>
              <option value="categories">Categories</option>
              <option value="transaction">Transaction</option>
              <option value="recurring_transactions">
                Recurring Transactions
              </option>
            </select>

            {selectedOption === "accounts" && (
              <form onSubmit={handleAccountsSubmit}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Accounts Form
                  </h3>
                  <div>
                    <input
                      type="text"
                      className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="account_name"
                      placeholder="Enter Account Name"
                    />
                  </div>
                  <div>
                    <select
                      name="account_type"
                      className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Savings">Savings</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Investment">Investment</option>
                      <option value="Bank">Bank</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="balance"
                      placeholder="Enter Account Balance"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                    />
                  </div>
                </div>
              </form>
            )}

            {selectedOption === "budgets" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Budgets Form
                </h3>

                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="amount"
                    placeholder="Enter Budget Amount"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="start_date"
                    placeholder="Enter Start Date"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="end_date"
                    placeholder="Enter End Date"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                  />
                </div>
              </div>
            )}

            {selectedOption === "categories" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Categories Form
                </h3>
                <div>
                  <input
                    type="category_name"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="account_name"
                    placeholder="Enter Category Name"
                  />
                </div>
                <div>
                  <select
                    name="category_type"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                  {/* <input
                    type="category_type"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="account_name"
                    placeholder="Enter Category Type"
                  /> */}
                </div>
                <div>
                  <input
                    type="submit"
                    className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                  />
                </div>
              </div>
            )}

            {selectedOption === "investment" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Investment Form
                </h3>

                <div>
                  <input
                    type="submit"
                    className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                  />
                </div>
              </div>
            )}

            {selectedOption === "transaction" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Transaction Form
                </h3>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="category_id"
                    placeholder="Enter Category ID"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="amount"
                    placeholder="Enter Amount"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="transaction_date"
                    placeholder="Enter Transaction Date"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="description"
                    placeholder="Enter Description"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="transaction_type"
                    placeholder="Enter Transaction Type"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                  />
                </div>
              </div>
            )}

            {selectedOption === "recurring_transactions" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Recurring Transactions Form
                </h3>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="account_id"
                    placeholder="Enter Account ID"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="category_id"
                    placeholder="Enter Category ID"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="frequency"
                    placeholder="Enter Frequency"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="next_due_date"
                    placeholder="Enter Next Due Date"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full max-w-md px-4 py-3 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="description"
                    placeholder="Enter Description"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
                  />
                </div>
              </div>
            )}
          </div>
        </Modal>

        <div className="flex min-h-screen bg-gray-100">
          <div className="w-full lg:w-1/5 h-screen p-4">
            <div className="flex items-center justify-between p-2">
              <h1 className="text-xl font-bold">DON FINANCE MANAGER</h1>
              <div className="relative">
                {/* maybe we can add user something here */}
              </div>
            </div>
            <nav className="mt-8 space-y-4">
              <a href="/">
                <button className="flex gap-4 px-3 py-2 items-center w-full rounded-[10px] font-medium hover:bg-white cursor-pointer">
                  Dashboard
                </button>
              </a>
              <a href="/accounts">
                <button className="flex gap-4 px-3 py-2 items-center w-full rounded-[10px] font-medium hover:bg-white cursor-pointer">
                  Accounts
                </button>
              </a>
              <a href="/transactions">
                <button className="flex gap-4 px-3 py-2 items-center w-full rounded-[10px] font-medium hover:bg-white cursor-pointer">
                  Transactions
                </button>
              </a>
            </nav>
            {/* <div className="absolute bottom-4 left-4">
            <button className="text-gray-700 hover:text-gray-900">
              Logout
            </button>
          </div> */}
            <div className="flex justify-between gap-2 m-2">
              <div className="my-auto">Portfolio</div>
              {/* <div>
              <select className="border rounded-md p-2 text-sm">
                <option value="1W">1 day</option>
                <option value="1W">1 week</option>
                <option value="1M">1 month</option>
                <option value="3M">3 month</option>
                <option value="3M">6 month</option>
                <option value="3M">1 year</option>
              </select>
            </div> */}
              <div>
                <button
                  onClick={toggleModal}
                  className=" text-white p-2 hover:bg-blue-100 focus:outline-none"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <AccordionItem
                title="Savings"
                isOpen={openIndex === 0}
                toggleOpen={() => toggleAccordion(0)}
              >
                <p>This is the content for the first accordion item.</p>
              </AccordionItem>

              <AccordionItem
                title="Investment"
                isOpen={openIndex === 1}
                toggleOpen={() => toggleAccordion(1)}
              >
                <p>This is the content for the second accordion item.</p>
              </AccordionItem>

              <AccordionItem
                title="Credit card"
                isOpen={openIndex === 2}
                toggleOpen={() => toggleAccordion(2)}
              >
                <p>This is the content for the third accordion item.</p>
              </AccordionItem>
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
