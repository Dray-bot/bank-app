import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff
import Airtime from "./Airtime";
import Data from "./Data";
import Transfer from "./Transfer";
import Deposit from "./Deposit";
import Bills from "./Bills";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [balance, setBalance] = useState(50000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [message, setMessage] = useState("");
  const [showBalance, setShowBalance] = useState(true); // State to control balance visibility

  const [accountNumber, setAccountNumber] = useState(""); // New state to store account number

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else {
      setUser(storedUser);
      if (!storedUser.accountNumber) {  // Check if the user has an account number
        const newAccountNumber = generateAccountNumber();
        storedUser.accountNumber = newAccountNumber; // Assign the generated account number
        setAccountNumber(newAccountNumber); // Set it in state
        localStorage.setItem("user", JSON.stringify(storedUser)); // Save the updated user data
      } else {
        setAccountNumber(storedUser.accountNumber); // If the user already has an account number, set it
      }
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handlePinChange = () => {
    if (newPin.length !== 4) {
      setMessage("⚠️ PIN must be 4 digits.");
      return;
    }
    setPin(newPin);
    setMessage("✅ PIN updated successfully!");
    setNewPin("");
  };

  const generateAccountNumber = () => {
    // Function to generate a random 10-digit account number
    return Math.floor(Math.random() * 9000000000 + 1000000000);
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <button className="md:hidden p-4 text-blue-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <Menu size={28} />
      </button>

      <div className={`fixed md:relative w-64 bg-white dark:bg-gray-800 p-6 border-r transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-1/4`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">D-Bank</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-4">Hello, {user.name} 👋</h3>
        <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg text-center mb-6">
          <p className="text-gray-700 dark:text-gray-300">Available Balance</p>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {showBalance ? `₦${balance.toLocaleString()}` : "****"}
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-blue-500 dark:text-blue-400 text-sm"
            >
              {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <ul className="space-y-3">
          {["home", "airtime", "data", "transfer", "deposit", "bills", "profile"].map((tab) => (
            <li key={tab}>
              <button onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-lg text-left ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-900"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <button onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="w-full md:w-3/4 p-8">
        {activeTab === "home" && <div><h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2><p>Welcome to D-Bank! Manage your transactions easily.</p></div>}
        {activeTab === "airtime" && <Airtime balance={balance} withdraw={(amt) => setBalance(balance - amt)} />}
        {activeTab === "data" && <Data balance={balance} withdraw={(amt) => setBalance(balance - amt)} />}
        {activeTab === "transfer" && <Transfer balance={balance} withdraw={(amt) => setBalance(balance - amt)} />}
        {activeTab === "deposit" && <Deposit balance={balance} deposit={(amt) => setBalance(balance + amt)} />}
        {activeTab === "bills" && <Bills balance={balance} withdraw={(amt) => setBalance(balance - amt)} />}

        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">Profile</h2>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center mb-4">
              <p className="text-gray-700 dark:text-gray-300 font-medium">Name</p>
              <h3 className="text-lg font-semibold">{user.name}</h3>

              <p className="text-gray-700 dark:text-gray-300 font-medium mt-3">Bank</p>
              <h3 className="text-lg font-semibold">D-Bank</h3>

              <p className="text-gray-700 dark:text-gray-300 font-medium mt-3">Account Number</p>
              <h3 className="text-lg font-semibold">{accountNumber}</h3>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{pin ? "Change Transaction PIN" : "Set Transaction PIN"}</h3>
              <input type="password" maxLength="4" placeholder="Enter 4-digit PIN" value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200" />
              <button onClick={handlePinChange} className="bg-blue-500 text-white p-3 rounded-lg w-full mt-3 hover:bg-blue-600">
                {pin ? "Update PIN" : "Set PIN"}
              </button>
            </div>

            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
