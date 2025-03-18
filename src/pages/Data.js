import { useState } from "react";

function Data({ balance, withdraw }) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const networks = ["MTN", "Glo", "Airtel", "9mobile"];
  const quickAmounts = [500, 1000, 2000, 5000];

  const buyData = (e) => {
    e.preventDefault();
    const dataAmount = Number(amount);

    if (!network) {
      setMessage("⚠️ Select a network.");
      return;
    }
    if (!amount || dataAmount <= 0) {
      setMessage("⚠️ Enter a valid amount.");
      return;
    }
    if (phone.length !== 11) {
      setMessage("⚠️ Enter a valid 11-digit phone number.");
      return;
    }
    if (balance < dataAmount) {
      setMessage("❌ Not enough balance.");
      return;
    }

    withdraw(dataAmount);
    setMessage(`✅ ₦${dataAmount} data bought for ${phone} on ${network}!`);

    const newHistory = { phone, network, amount: dataAmount, date: new Date().toLocaleString() };
    setHistory([newHistory, ...history]);

    setAmount("");
    setPhone("");
    setNetwork("");
  };

  const printReceipt = (purchase) => {
    setReceipt(purchase);
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">Buy Data 📶</h2>

      <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg text-center my-4">
        <p>Available Balance</p>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">₦{balance}</h2>
      </div>

      <form onSubmit={buyData} className="flex flex-col gap-4">
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">Select Network</option>
          {networks.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />

        <div className="flex flex-wrap gap-2 justify-between">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ₦{amt}
            </button>
          ))}
        </div>

        <button type="submit" className="bg-blue-600 dark:bg-blue-500 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-all">
          Buy Data 🚀
        </button>
      </form>

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">Recent Purchases</h3>
          <ul className="border p-3 rounded bg-gray-50 dark:bg-gray-800">
            {history.slice(0, 3).map((item, index) => (
              <li key={index} className="flex justify-between border-b py-2 border-gray-300 dark:border-gray-600">
                <div>
                  <span>{item.phone} ({item.network})</span> <br />
                  <span className="font-bold">₦{item.amount}</span>
                </div>
                <button onClick={() => printReceipt(item)} className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500">
                  🖨 Print
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Data;
