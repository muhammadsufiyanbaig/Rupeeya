import React, { useContext, useState } from "react";
import { GlobalContext } from "../Global";
import { MdDelete, MdDownload } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import * as XLSX from "xlsx"; 
const Home = ({ children }) => {
  const { transactions, dispatch } = useContext(GlobalContext);
  const [formValues, setFormValues] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
  });

  const handleFormChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };
  const AddTransaction = () => {
    if (
      !formValues.description ||
      !formValues.date ||
      !formValues.amount ||
      !formValues.category
    ) {
      alert("Please fill in all fields before adding a new transaction.");
      return;
    }
    const simplifiedTransaction = {
      description: formValues.description,
      date: formValues.date,
      amount: formValues.amount,
      category: formValues.category,
    };
    dispatch({ type: "ADD_TRANSACTION", payload: simplifiedTransaction });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const calculateIncome = () => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.category === "Income"
    );
    return incomeTransactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
  };

  const calculateExpense = () => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.category === "Expense"
    );
    return expenseTransactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
  };

  const calculateBalance = () => {
    const totalIncome = calculateIncome();
    const totalExpense = calculateExpense();
    const totalCash = totalIncome - totalExpense;
    return totalCash;
  };

  const recentIncome = calculateIncome();
  const recentExpense = calculateExpense();
  const balance = calculateBalance();

  const renderHistory = () => {
    return (
      <div className="transaction-history-container overflow-y-auto max-h-96">
        {transactions.map((transaction, i) => {
          const isIncome = transaction.category === "Income";
          const textColor = isIncome ? "text-green-500" : "text-red-500";
          const bgColor = isIncome ? "bg-green-100" : "bg-red-100";

          return (
            <div
              key={i}
              className={`ml-0 sm:ml-6 relative ${bgColor} p-4 sm:p-6 border-r-0 sm:border-r-8 shadow-md my-4 flex flex-col sm:flex-row justify-between`}
            >
              <div className="absolute top-0 left-0 sm:static sm:left-auto">
                <div
                  className={`${isIncome ? "bg-green-600" : "bg-red-600"
                    } p-1 w-6 grid grid-rows-1 items-center text-xs text-white justify-center`}
                >
                  {isIncome ? "+" : "-"}
                </div>
              </div>
              <div className="mb-2 sm:mb-0">
                <p className="mt-4 mb-1 sm:mb-0">{transaction.description}</p>
              </div>
              <div className="mb-2 sm:mb-0">
                <p className="mb-1 sm:mb-0">{transaction.date}</p>
              </div>
              <div>
                <p className={textColor}>
                  {isIncome ? "+" : "-"}
                  {transaction.amount}
                </p>
              </div>
              {/* Delete each Transaction */}
              <div className="mt-2">
                <button
                  onClick={() => {
                    const updatedTransactions = [...transactions];
                    updatedTransactions.splice(i, 1);
                    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
                    window.location.reload(false)
                  }}

                  className="font-semibold bg-red-600 py-1 px-2 rounded-md text-white text-sm">
                  <FaDeleteLeft />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleDownload = () => {
    const data = transactions.map((transaction) => ({
      Description: transaction.description,
      Date: transaction.date,
      Amount: transaction.amount,
      Category: transaction.category,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };
  return (
    <>
      {children}
      <div>
        <>
          <div className="bg-gray-100">
            <div className="grid grid-cols-12 gap-0 ">
              <div className="flex justify-center h-full items-center fixed top-0">
                <p className="text-white text-5xl lg:text-7xl"></p>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
              <div>
                <div className="border-b">
                  <div className="my-4 px-6">
                    <h1 className="sm:text-3xl text-center font-bold text-2xl title-font mb-4 text-gray-900">
                      Rupeeya
                    </h1>
                  </div>
                </div>
                <div className="px-8 py-2">
                  <h4 className="text-lg text-gray-500 font-thin">
                    Your Balance
                  </h4>
                  <h4 className="text-2xl font-semibold">PKR {balance}</h4>
                </div>
                <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-2 my-2 px-6">
                  <div className="bg-green-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
                    <h1 className="text-xl font-light">Income</h1>
                    <h1 className="text-2xl text-green-100 font-semibold">
                      PKR {recentIncome}
                    </h1>
                  </div>
                  <div className="bg-red-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
                    <h1 className="text-xl font-light">Expense</h1>
                    <h1 className="text-2xl text-red-100 font-semibold">
                      PKR {recentExpense}
                    </h1>
                  </div>
                </div>
                <div className="px-8 my-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">History</h2>
                  </div>
                  {/* Delete All */}
                  <div className="text-right space-x-1 w-full">
                    <button
                      onClick={() => {
                        // dispatch({ type: "CLEAR_TRANSACTIONS" });
                        localStorage.clear("transactions");
                        window.location.reload(false)
                      }}
                      className="font-semibold bg-red-600 p-1 rounded-md text-white text-md"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="font-semibold bg-red-600 p-1 rounded-md text-white text-md"
                    >
                      <MdDownload />
                    </button>
                  </div>
                  {renderHistory()}
                </div>
                <div className="px-8 mt-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">
                      Add new transaction
                    </h2>
                  </div>
                  <div className="bg-white p-4 border-2 rounded-md">
                    <div className="mt-5 text-sm">
                      <label htmlFor="text" className="block text-black">
                        Text
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={handleFormChange}
                        className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Enter Text"
                        required
                      />
                    </div>

                    <div className="mt-5 text-sm">
                      <label htmlFor="date" className="block text-black">
                        Date
                      </label>
                      <input
                        type={"date"}
                        name="date"
                        value={formValues.date}
                        onChange={handleFormChange}
                        className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Enter Text"
                        required
                      />
                    </div>
                    <div className="mt-5 text-sm">
                      <label htmlFor="amount" className="block text-black">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleFormChange}
                        className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Enter Amount"
                        required
                      />
                      <div className="flex flex-col sm:flex-row justify-center m-4 gap-3">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <input
                            type="radio"
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
                            name="category"
                            value={`Income`}
                            onChange={handleOnChange}
                          />
                          <label className="ms-2 text-sm font-medium text-green-600">
                            Income
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded"
                            name="category"
                            value={`Expense`}
                            onChange={handleOnChange}
                          />
                          <label className="ms-2 text-sm font-medium text-red-600">
                            Expense
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={AddTransaction}
                        className="rounded-xl block text-center text-white bg-gray-800 p-3 duration-300  hover:bg-black w-full"
                      >
                        Add Transaction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
export default Home;
