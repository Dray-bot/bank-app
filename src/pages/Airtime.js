import { useState } from "react";

function Airtime({ balance, withdraw }) {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("");
  const [message, setMessage] = useState("");
  const [recentPurchases, setRecentPurchases] = useState([]);

  const networks = ["MTN", "Glo", "Airtel", "9mobile"];
  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAirtimePurchase = (e) => {
    e.preventDefault();
    const airtimeAmount = parseFloat(amount);

    if (!network) return setMessage("⚠️ Please select a network provider.");
    if (!amount || airtimeAmount <= 0) return setMessage("⚠️ Please enter a valid amount.");
    if (!phoneNumber || phoneNumber.length !== 11) return setMessage("⚠️ Please enter a valid 11-digit phone number.");
    if (balance < airtimeAmount) return setMessage("❌ Insufficient balance for this purchase.");

    withdraw(airtimeAmount);
    setMessage(`✅ ₦${airtimeAmount.toLocaleString()} airtime purchased for ${phoneNumber} on ${network}!`);

    setRecentPurchases([{ phoneNumber, network, amount: airtimeAmount, date: new Date().toLocaleString() }, ...recentPurchases]);
    setAmount(""); setPhoneNumber(""); setNetwork("");
  };

  const printReceipt = (purchase) => {
    const receipt = `
      <html>
      <head>
        <title>Airtime Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt { border: 1px solid #000; padding: 20px; max-width: 300px; margin: auto; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>Airtime Receipt</h2>
          <p><strong>Date:</strong> ${purchase.date}</p>
          <p><strong>Phone:</strong> ${purchase.phoneNumber}</p>
          <p><strong>Network:</strong> ${purchase.network}</p>
          <p><strong>Amount:</strong> ₦${purchase.amount.toLocaleString()}</p>
          <p>Thank you for using our service!</p>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    const printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(receipt);
    printWindow.document.close();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">Buy Airtime</h2>

      <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg text-center mb-4">
        <p className="text-gray-700 dark:text-gray-300 font-medium">Available Balance</p>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">₦{balance.toLocaleString()}</h2>
      </div>

      <form onSubmit={handleAirtimePurchase} className="flex flex-col gap-4">
        <select value={network} onChange={(e) => setNetwork(e.target.value)} className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white">
          <option value="">Select Network</option>
          {networks.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
        />

        <div className="flex gap-2 flex-wrap">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 dark:bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700">
          Buy Airtime
        </button>
      </form>

      {recentPurchases.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Recent Purchases</h3>
          <div className="overflow-x-auto">
            <ul className="border p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              {recentPurchases.slice(0, 3).map((purchase, index) => (
                <li key={index} className="flex justify-between items-center text-gray-600 dark:text-gray-300 border-b dark:border-gray-700 last:border-b-0 py-2">
                  <div>
                    <span>{purchase.phoneNumber} ({purchase.network})</span> <br />
                    <span className="font-bold text-blue-600 dark:text-blue-400">₦{purchase.amount.toLocaleString()}</span>
                  </div>
                  <button onClick={() => printReceipt(purchase)} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600">
                    Print Receipt
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Airtime;
