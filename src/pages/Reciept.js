import { useEffect } from "react";

function Receipt({ details, onClose }) {
  useEffect(() => {
    if (!details) return;
    console.log("Transaction Receipt:", details);
  }, [details]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-2">Transaction Receipt</h2>
        <p className="text-gray-700">Type: {details.type}</p>
        <p className="text-gray-700">Amount: ₦{details.amount.toLocaleString()}</p>
        <p className="text-gray-700">Date: {details.date}</p>
        <p className="text-gray-700">Status: ✅ Success</p>

        <button 
          onClick={() => window.print()} 
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
        >
          Print Receipt
        </button>

        <button 
          onClick={onClose} 
          className="block text-gray-500 mt-2 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Receipt;
