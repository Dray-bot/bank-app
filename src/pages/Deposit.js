import { useState } from "react";

function Deposit({ balance, deposit }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const quickAmounts = [1000, 5000, 10000, 20000];

  const handleDeposit = (e) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);

    if (!amount || depositAmount <= 0) {
      setMessage("⚠️ Please enter a valid deposit amount.");
      return;
    }

    deposit(depositAmount);
    const newEntry = { amount: depositAmount, date: new Date().toLocaleString() };
    setHistory([newEntry, ...history]);
    setMessage(`✅ Successfully deposited ₦${depositAmount.toLocaleString()}!`);
    setAmount("");
  };

  const printReceipt = (entry) => {
    const receiptContent = `
      <html>
      <head>
        <title>Deposit Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt { border: 2px solid black; padding: 20px; display: inline-block; text-align: left; }
          h2 { color: green; }
          .footer { margin-top: 10px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>Deposit Receipt</h2>
          <hr />
          <p><strong>Date:</strong> ${entry.date}</p>
          <p><strong>Amount:</strong> ₦${entry.amount.toLocaleString()}</p>
          <hr />
          <p class="footer">Thank you for banking with us!</p>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 500);
          }
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
        Deposit Funds
      </h2>

      <div className="bg-green-100 dark:bg-gray-800 p-4 rounded-lg text-center mb-4">
        <p className="text-gray-700 dark:text-gray-300 font-medium">Current Balance</p>
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">₦{balance.toLocaleString()}</h2>
      </div>

      <form onSubmit={handleDeposit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Enter deposit amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex flex-wrap gap-2 justify-center">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto"
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-500 dark:bg-green-600 text-white p-3 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-all"
        >
          Deposit Money
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {message}
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Deposit History</h3>
          <ul className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-h-60 overflow-auto">
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between py-1 border-b border-gray-300 dark:border-gray-700 last:border-none">
                <span className="dark:text-gray-300">₦{entry.amount.toLocaleString()}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{entry.date}</span>
                <button
                  onClick={() => printReceipt(entry)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-blue-600 transition-all"
                >
                  Print Receipt
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Deposit;
