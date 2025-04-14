import React, { useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!startDate || !endDate || !reason || !leaveType) {
      setError('All fields are required!');
      return;
    }

    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) {
      setError('Employee ID not found in localStorage.');
      return;
    }

    const leaveRequest = {
      startDate,
      endDate,
      reason,
      leaveType,
    };
    try{
      const status = await axios.get('http://localhost:5090/api/Employee/Status',{
        params: { employeeId },
      })
    }
    catch(err){
      console.error('Error fetching status:', err);
    }

    try {
      const response = await axios.post(
        `http://localhost:5090/api/Employee/submit/${employeeId}`,
        leaveRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setStartDate('');
      setEndDate('');
      setReason('');
      setLeaveType('');
      setSuccess('Leave request submitted successfully!');
    } catch (err) {
      const msg = err.response?.data || err.message || 'Error submitting leave request';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Submit Leave Request
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="leaveType" className="block text-gray-700 font-medium mb-1">
              Leave Type
            </label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Leave Type --</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Annual">Annual</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
              rows="4"
              placeholder="Enter your reason for leave"
              maxLength="500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
