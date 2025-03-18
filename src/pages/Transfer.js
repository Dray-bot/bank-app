import { useState } from "react";

function Transfer({ balance, withdraw }) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [bank, setBank] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [paymentPin, setPaymentPin] = useState(""); // PIN storage
  const [enteredPin, setEnteredPin] = useState(""); // User enters PIN
  const [isPinSet, setIsPinSet] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [receipt, setReceipt] = useState(null); // Store transaction receipt

  const banks = ["Access Bank", "GTBank", "UBA Bank", "Zenith Bank", "Opay", "Kuda", "PalmPay"];
  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleSetPin = () => {
    if (paymentPin.length !== 4) {
      setMessage("⚠️ PIN must be 4 digits.");
      return;
    }
    setIsPinSet(true);
    setMessage("✅ Payment PIN set successfully.");
  };

  const handleSendMoney = (e) => {
    e.preventDefault();
    if (!bank) return setMessage("⚠️ Select a bank.");
    if (!amount || Number(amount) <= 0) return setMessage("⚠️ Enter a valid amount.");
    if (!recipient) return setMessage("⚠️ Enter recipient's name.");
    if (Number(amount) > balance) return setMessage("❌ Not enough balance.");
    
    // Show PIN modal before completing transfer
    setShowPinModal(true);
  };

  const verifyPinAndTransfer = () => {
    if (enteredPin !== paymentPin) {
      setMessage("❌ Incorrect PIN. Try again.");
      return;
    }

    withdraw(Number(amount));
    setMessage(`✅ ₦${amount} sent to ${recipient} (${bank})!`);

    // Set the receipt data
    const newTransaction = { recipient, bank, amount: Number(amount), date: new Date().toLocaleString() };
    setHistory([newTransaction, ...history]);

    // Reset fields after transfer
    setAmount("");
    setRecipient("");
    setBank("");
    setShowPinModal(false);
    setEnteredPin("");
  };

  const handlePrintReceipt = (transaction) => {
    const receiptContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ddd; text-align: center;">
        <h2>Transaction Receipt</h2>
        <p><strong>Recipient:</strong> ${transaction.recipient}</p>
        <p><strong>Bank:</strong> ${transaction.bank}</p>
        <p><strong>Amount:</strong> ₦${transaction.amount}</p>
        <p><strong>Date:</strong> ${transaction.date}</p>
      </div>
    `;

    const printWindow = window.open("", "_blank", "width=600,height=400");
    printWindow.document.write("<html><head><title>Receipt</title>");
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style></head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Send Money 💸</h2>

      <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-lg my-4">
        <p className="text-gray-700 dark:text-gray-300">Available Balance</p>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">₦{balance}</h2>
      </div>

      {/* Set PIN Section */}
      {!isPinSet ? (
        <div className="p-4 border rounded-lg mb-4">
          <h3 className="font-semibold">Set Payment PIN 🔒</h3>
          <input
            type="password"
            maxLength="4"
            value={paymentPin}
            onChange={(e) => setPaymentPin(e.target.value)}
            placeholder="Enter 4-digit PIN"
            className="p-2 border rounded w-full my-2"
          />
          <button onClick={handleSetPin} className="bg-blue-600 text-white p-2 rounded w-full">
            Set PIN ✅
          </button>
        </div>
      ) : (
        <form onSubmit={handleSendMoney} className="flex flex-col gap-4">
          <select value={bank} onChange={(e) => setBank(e.target.value)} className="p-3 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
            <option value="">Select Bank</option>
            {banks.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <input type="text" placeholder="Enter recipient's name" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="p-3 border rounded" />
          <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 border rounded" />

          <div className="flex gap-2 flex-wrap">
            {quickAmounts.map((amt) => (
              <button key={amt} type="button" onClick={() => setAmount(amt)} className="p-2 bg-gray-200 rounded mb-2">
                ₦{amt}
              </button>
            ))}
          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:opacity-90">
            Send Money 🚀
          </button>
        </form>
      )}

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-bold text-blue-600">Enter PIN 🔑</h3>
            <input type="password" maxLength="4" value={enteredPin} onChange={(e) => setEnteredPin(e.target.value)} className="p-2 border rounded w-full my-3 text-center" />
            <div className="flex gap-2 justify-center">
              <button onClick={verifyPinAndTransfer} className="bg-green-600 text-white px-4 py-2 rounded">Confirm ✅</button>
              <button onClick={() => setShowPinModal(false)} className="bg-red-600 text-white px-4 py-2 rounded">Cancel ❌</button>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Recent Transfers</h3>
          <ul className="border p-3 rounded dark:border-gray-700">
            {history.slice(0, 3).map((tx, index) => (
              <li key={index} className="flex justify-between border-b py-2 dark:border-gray-700">
                <div>
                  <span className="text-gray-700 dark:text-gray-300">{tx.recipient} ({tx.bank})</span> <br />
                  <span className="font-bold text-gray-800 dark:text-gray-200">₦{tx.amount}</span>
                </div>
                <button 
                  onClick={() => handlePrintReceipt(tx)} 
                  className="bg-gray-600 text-white p-2 rounded"
                >
                  Print Receipt 🖨️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
    </div>
  );
}

export default Transfer;
