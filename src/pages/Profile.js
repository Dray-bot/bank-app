import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [newPin, setNewPin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handlePinChange = () => {
    if (newPin.length !== 4) {
      setMessage("PIN must be 4 digits.");
      return;
    }

    if (user) {
      const updatedUser = { ...user, pin: newPin };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("PIN updated successfully!");
      setNewPin("");
    }
  };

  if (!user) return <p className="text-center text-red-500">No user found. Sign up first.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">Profile</h2>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center mb-4">
        <p className="text-gray-700 dark:text-gray-300 font-medium">Name</p>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 font-medium mt-3">Account Number</p>
        <h3 className="text-lg font-semibold">{user.accountNumber}</h3>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {user.pin ? "Change PIN" : "Set PIN"}
        </h3>
        <input
          type="password"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handlePinChange}
          className="bg-blue-500 dark:bg-blue-600 text-white p-3 rounded-lg w-full mt-3 hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          {user.pin ? "Update PIN" : "Set PIN"}
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Profile;
