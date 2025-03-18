import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const savedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Saved user data:", savedUser);  // Debugging log to check if data is retrieved

    setTimeout(() => {
      if (savedUser) {
        // Debugging: Check if email and password match correctly
        console.log("Checking email:", savedUser.email.trim(), email.trim());
        console.log("Checking password:", savedUser.password.trim(), password.trim());

        // Ensure no leading/trailing spaces
        const emailMatch = savedUser.email.trim() === email.trim();
        const passwordMatch = savedUser.password.trim() === password.trim();

        if (emailMatch && passwordMatch) {
          navigate("/dashboard");
        } else {
          setMessage("Wrong email or password");
          setIsLoading(false);
        }
      } else {
        setMessage("No user found");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login to D-Bank</h2>

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className={`p-3 rounded-lg w-full text-white transition ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
