import { useState } from "react";

function SetTransactionPin({ onPinSet }) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSetPin = () => {
    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match.");
      return;
    }

    localStorage.setItem("transactionPin", pin);
    alert("Transaction PIN set successfully!");
    onPinSet();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Set Transaction PIN</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="password"
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter 4-digit PIN"
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        placeholder="Confirm PIN"
        maxLength={4}
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2 rounded w-full" onClick={handleSetPin}>
        Set PIN
      </button>
    </div>
  );
}

export default SetTransactionPin;
