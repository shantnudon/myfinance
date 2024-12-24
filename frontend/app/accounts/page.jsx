import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full p-4">
        <div className=" mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-gray-500">Assets</h2>
              <p className="text-3xl font-semibold">₹86,000.00</p>
              <p className="text-green-500">+₹86,000.00 vs. last month</p>
            </div>
            <div className="text-right">
              <h2 className="text-gray-500">Liabilities</h2>
              <p className="text-3xl font-semibold">₹0.00</p>
              <p className="text-gray-500">No change vs. prior period</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Assets</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {/* <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> */}
                <span>Investment</span>
                <span className="ml-2 text-gray-500">74.4%</span>
              </div>
              <div className="flex items-center">
                {/* <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span> */}
                <span>Depository</span>
                <span className="ml-2 text-gray-500">25.6%</span>
              </div>
            </div>
            <div className="relative mb-4">
              <div
                className="absolute top-0 left-0 h-1 bg-blue-500 "
                // style="width: 74.4%;"
              ></div>
              <div
                className="absolute top-0 left-0 h-1 bg-purple-500 "
                // style="width: 100%;"
              ></div>
            </div>
            {/* <div className="flex justify-between items-center mb-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                <i className="fas fa-plus mr-2"></i> New account
              </button>
              <div className="relative">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                  1M <i className="fas fa-caret-down ml-2"></i>
                </button>
              </div>
            </div> */}
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">NAME</th>
                  <th className="py-2">% OF TOTAL</th>
                  <th className="py-2">VALUE</th>
                  <th className="py-2">CHANGE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 flex items-center">
                    <i className="fas fa-circle text-purple-500 mr-2"></i>{" "}
                    Depository · 1
                  </td>
                  <td className="py-2">25.6%</td>
                  <td className="py-2">₹22,000.00</td>
                  <td className="py-2 text-green-500">+₹22,000.00</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 flex items-center">
                    <i className="fas fa-circle text-blue-500 mr-2"></i>{" "}
                    Investment · 5
                  </td>
                  <td className="py-2">74.4%</td>
                  <td className="py-2">₹64,000.00</td>
                  <td className="py-2 text-green-500">+₹64,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
