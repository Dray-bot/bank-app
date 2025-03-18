import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white text-center px-6 overflow-hidden">
      {/* Background with wave effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700">
        <svg className="absolute bottom-0 left-0 w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" d="M0,128L48,122.7C96,117,192,107,288,138.7C384,171,480,245,576,256C672,267,768,213,864,186.7C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>

      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to D-Bank
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-lg">
          Secure, fast, and easy banking at your fingertips.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
