import { useState } from "react";
import { FaMobileAlt, FaWifi, FaMoneyBillWave, FaExchangeAlt, FaSearch } from "react-icons/fa";

function TransactionHistory({ transactions }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Icons for transaction types
  const transactionIcons = {
    Airtime: <FaMobileAlt className="text-blue-500" />,
    Data: <FaWifi className="text-green-500" />,
    Bills: <FaMoneyBillWave className="text-yellow-500" />,
    Transfer: <FaExchangeAlt className="text-red-500" />,
  };

  // Filter transactions based on type
  let filteredTransactions = filter === "All" ? transactions : transactions.filter((tx) => tx.type === filter);

  // Search functionality
  filteredTransactions = filteredTransactions.filter(
    (tx) =>
      tx.type.toLowerCase().includes(search.toLowerCase()) ||
      tx.date.toLowerCase().includes(search.toLowerCase()) ||
      tx.amount.toString().includes(search)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Transaction History</h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Filter Dropdown */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className="p-2 border rounded-lg w-full mb-4"
      >
        <option value="All">All Transactions</option>
        <option value="Airtime">Airtime</option>
        <option value="Data">Data</option>
        <option value="Bills">Bills</option>
        <option value="Transfer">Transfer</option>
      </select>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
            >
              <div className="flex items-center gap-3">
                {transactionIcons[tx.type]}
                <div>
                  <p className="text-gray-700">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.amount > 0 ? "text-red-500" : "text-green-500"}`}>
                ₦{tx.amount.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
