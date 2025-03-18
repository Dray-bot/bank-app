import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    const userData = {
      ...formData,
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(), // Random 10-digit account number
    };

    // Save the user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect to the dashboard after successful sign-up
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
        <p className="text-lg">Join D-Bank and start banking smarter.</p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-gray-900"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          Sign Up
        </button>
      </motion.form>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4"
      >
        Already have an account? {" "}
        <span 
          onClick={() => navigate("/login")} 
          className="text-yellow-400 cursor-pointer font-bold hover:underline"
        >
          Login
        </span>
      </motion.p>
    </div>
  );
}

export default SignUp;
