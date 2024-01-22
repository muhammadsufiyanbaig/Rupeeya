import React, { useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../Global";
import Chart from "chart.js/auto";

const Statistics = () => {
  const { transactions } = useContext(GlobalContext);

  const incomeTransactions = transactions.filter((item) => item.category === "Income");
  const expenseTransactions = transactions.filter((item) => item.category === "Expense");

  const totalIncome = incomeTransactions.reduce((total, item) => total + parseFloat(item.amount), 0);
  const totalExpense = expenseTransactions.reduce((total, item) => total + parseFloat(item.amount), 0);

  const chartRef = useRef(null);

  const updateChart = (totalIncome, totalExpense) => {
    const ctx = chartRef.current.getContext("2d");
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    chartRef.current.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ['Income and Expense'],
        datasets: [
          {
            label: "Income",
            data: [totalIncome],
            backgroundColor: "rgb(220,252,231)",
            borderColor: "rgb(34,197,94)",
            borderWidth: 3,
          },
          {
            label: "Expense",
            data: [totalExpense],
            backgroundColor: "rgb(254,226,226)",
            borderColor: "rgb(220,38,38)",
            borderWidth: 3,
          },
        ],
        
      },
    });
  };

  useEffect(() => {
    updateChart(totalIncome, totalExpense);
  }, [totalIncome, totalExpense]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="border-gray-300 border-b-2 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 py-3 sm:p-4">
          <div className="mb-4 sm:mb-0">
            <p className="text-base font-bold text-gray-500 pb-1">Income</p>
            <p className="leading-none text-xl font-bold text-green-500">PKR {totalIncome}</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-500 pb-1">Expense</p>
            <p className="leading-none text-xl font-bold text-red-600">-PKR {totalExpense}</p>
          </div>
        </div>
      </div>
      <div>
        <canvas ref={chartRef} className="w-full"></canvas>
      </div>
    </div>
  );
};

export default Statistics;
