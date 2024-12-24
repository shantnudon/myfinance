import React from "react";

const page = () => {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-500">Total transactions</div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-500">Income</div>
            <div className="text-2xl font-bold">₹0.00</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-500">Expenses</div>
            <div className="text-2xl font-bold">₹0.00</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search transactions by name"
              className="flex-grow p-2 border rounded mr-2"
            />
            <button className="p-2 bg-gray-200 rounded">
              <i className="fas fa-filter"></i> Filter
            </button>
          </div>
          <div className="text-center text-gray-500">
            <p className="mb-2">No entries found</p>
            <p>Try adding an entry, editing filters or refining your search</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="p-2 bg-gray-200 rounded mr-2">
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="p-2">1</span>
              <button className="p-2 bg-gray-200 rounded">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <div>
              <label htmlFor="rows-per-page" className="mr-2">
                Rows per page
              </label>
              <select id="rows-per-page" className="p-2 border rounded">
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
