import React, { useContext } from "react";
import { GlobalContext } from "../Global"; 

const Income = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
        Income
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {transactions.map((item, index) => {
          if (item.category === "Income") {
            return (
              <div
                key={index}
                className="max-w-xs mx-auto sm:mx-0 bg-white rounded-md shadow-lg p-4"
              >
                <h2 className="text-xl font-semibold mb-2">{item.description}</h2>
                <p className="text-gray-700 font-bold mb-4">PKR {item.amount}</p>
                <p className="text-gray-700 mb-2">{item.date}</p>
                <p className="text-green-500 text-2xl font-bold">+</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Income;
