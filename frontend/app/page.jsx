"use client";

import { useState } from "react";
import AccordionItem from "@/components/accordian";
import Modal from "@/components/modal";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <main className="flex-1 p-4">
        {/* header section start */}
        <div className="p-4 bg-white shadow rounded-lg">
          {/* <h2 className="text-xl font-semibold">Welcome back, Shantnu</h2> */}
          {/* <p className="text-gray-500">Here’s what’s happening today</p> */}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-light">Net Worth</p>
              <p className="text-3xl text-green-500">₹86,000.00</p>
              {/* <p className="text-sm text-green-500">
                  +₹86,000.00 vs. last month
                </p> */}
            </div>
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
          </div>
        </div>

        {/* header section end */}

        {/* dashboard section start */}

        <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Graph Card */}
          {/* <div className="bg-white p-4 shadow rounded-lg"> */}
          {/* <h3 className="text-lg font-semibold">Net Worth</h3> */}
          {/* Add graph component or image here */}
          {/* <div className="h-32 bg-gray-200 rounded-lg mt-4"> */}
          {/* Graph Placeholder */}
          {/* </div> */}
          {/* </div> */}

          {/* Circular Assets and Debts Graph */}
          {/* <div className="bg-white p-4 shadow rounded-lg flex justify-center items-center">
              <div className="h-32 w-32 border-4 border-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">₹86,000</span>
              </div>
            </div> */}

          {/* Income and Spending */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Income</h3>
            <p className="text-2xl">₹0.00</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Spending</h3>
            <p className="text-2xl">₹0.00</p>
          </div>

          {/* Additional sections */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Savings Rate</h3>
            <p className="text-2xl">0.00%</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">
              Investing (coming soon...)
            </h3>
            <p className="text-2xl">₹0.00</p>
          </div>
        </div>

        {/* dashboard section end */}

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
      </main>
    </>
  );
}
