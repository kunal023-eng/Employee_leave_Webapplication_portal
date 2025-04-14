import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      await axios.post("http://localhost:5090/api/Auth/register", {
        fullName,
        email,
        password,
        confirmPassword,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Signup failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="flex flex-col bg-white w-1/3 p-4 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <label htmlFor="name">Full Name</label>
        <input
          className="m-2 p-2 border border-gray-300 rounded"
          id="name"
          type="text"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="m-2 p-2 border border-gray-300 rounded"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          className="m-2 p-2 border border-gray-300 rounded"
          id="dob"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />

        <label htmlFor="pass">Password</label>
        <input
          className="m-2 p-2 border border-gray-300 rounded"
          id="pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <label htmlFor="confirmPass">Confirm Password</label>
        <input
          className="m-2 p-2 border border-gray-300 rounded"
          id="confirmPass"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        <button
          className="hover:bg-amber-800 m-2 p-2 bg-amber-500 text-white rounded flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <img
              src="/path-to-loading.gif"
              alt="Loading..."
              className="h-5 w-5"
            />
          ) : (
            "Sign Up"
          )}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
