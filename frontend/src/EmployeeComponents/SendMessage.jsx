import React, { useState, useEffect } from "react";
import axios from "axios";

const SendMessage = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("employeeId");
    if (storedId) {
      setEmployeeId(parseInt(storedId));
    } else {
      setError("Employee ID not found in localStorage.");
    }
  }, []);

  const handleSend = async () => {
    if (!employeeId || !message.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5090/api/Employee/Send request", {
        employeeId,
        message,
      });
      setResponse("Message sent successfully.");
      setMessage("");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      // Reset response message after 3 seconds
      setTimeout(() => setResponse(null), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-2xl shadow-md border border-gray-200 space-y-4">
      <h2 className="text-xl font-bold text-center">Send Message to Manager</h2>

      <p className="text-sm text-gray-500">Employee ID: {employeeId || "Not Available"}</p>

      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
        rows={4}
      />

      <button
        onClick={handleSend}
        disabled={!employeeId || !message.trim() || loading}
        className={`w-full py-2 rounded-md text-white transition-colors duration-200 
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </div>
        ) : (
          "Send"
        )}
      </button>

      {response && (
        <div className="text-green-600 text-sm text-center transition-opacity duration-300">
          ✅ {response}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center transition-opacity duration-300">
          ❌ Error: {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default SendMessage;
