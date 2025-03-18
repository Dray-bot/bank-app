import { useState } from "react";
import { Bolt, Wifi, Droplets, Tv, Home, FileText } from "lucide-react";

function Bills({ balance, withdraw }) {
  const [amount, setAmount] = useState("");
  const [billType, setBillType] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const billOptions = [
    { name: "Electricity", icon: <Bolt className="text-yellow-500" /> },
    { name: "Water", icon: <Droplets className="text-blue-500" /> },
    { name: "Internet", icon: <Wifi className="text-green-500" /> },
    { name: "Cable TV", icon: <Tv className="text-purple-500" /> },
    { name: "Rent", icon: <Home className="text-gray-500" /> },
    { name: "Other", icon: <FileText className="text-red-500" /> },
  ];

  const handleBillPayment = (e) => {
    e.preventDefault();
    const billAmount = parseFloat(amount);

    if (!billType) {
      setMessage("⚠️ Select a bill type.");
      return;
    }

    if (!amount || billAmount <= 0) {
      setMessage("⚠️ Enter a valid amount.");
      return;
    }

    if (balance < billAmount) {
      setMessage("❌ Insufficient funds.");
      return;
    }

    withdraw(billAmount);
    const newTransaction = { billType, amount: billAmount, date: new Date().toLocaleString() };
    setHistory([newTransaction, ...history]);
    setMessage(`✅ Paid ₦${billAmount.toLocaleString()} for ${billType}!`);
    setAmount("");
    setBillType("");
  };

  const printReceipt = (entry) => {
    const receiptContent = `
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 20px; }
          .receipt { border: 2px solid black; padding: 20px; display: inline-block; text-align: left; }
          h2 { color: blue; }
          .footer { margin-top: 10px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>Receipt</h2>
          <hr />
          <p><strong>Date:</strong> ${entry.date}</p>
          <p><strong>Bill:</strong> ${entry.billType}</p>
          <p><strong>Amount:</strong> ₦${entry.amount.toLocaleString()}</p>
          <hr />
          <p class="footer">Thank you!</p>
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
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">Pay Bills</h2>

      <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-lg text-center mb-4">
        <p className="text-gray-700 dark:text-gray-300 font-medium">Balance</p>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">₦{balance.toLocaleString()}</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {billOptions.map(({ name, icon }) => (
          <button
            key={name}
            className={`flex flex-col items-center p-3 border rounded-lg transition-all ${
              billType === name ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
            }`}
            onClick={() => setBillType(name)}
          >
            {icon}
            <span className="text-sm mt-1">{name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleBillPayment} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 dark:bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
        >
          Pay Bill
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {message}
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">History</h3>
          <ul className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between items-center py-1 border-b border-gray-300 dark:border-gray-700 last:border-none">
                <div>
                  <span className="dark:text-gray-300">{entry.billType}</span>
                  <span className="font-medium dark:text-gray-200 ml-2">₦{entry.amount.toLocaleString()}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs block">{entry.date}</span>
                </div>
                <button 
                  onClick={() => printReceipt(entry)} 
                  className="bg-blue-500 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-600 transition-all"
                >
                  Print
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Bills;
