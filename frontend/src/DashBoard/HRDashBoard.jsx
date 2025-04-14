import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HRDashBoard = () => {
  const [summaries, setSummaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5090/api/hr/hr/leave-summary');
      setSummaries(response.data);
    } catch (error) {
      console.error('Error fetching leave summary:', error);
    }
  };

  const lastRow = currentPage * rowsPerPage;
  const firstRow = lastRow - rowsPerPage;
  const totalPages = Math.ceil(summaries.length / rowsPerPage);
  const currentRows = summaries.slice(firstRow, lastRow);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leave Summary for HR</h2>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Total Requests</th>
            <th className="border px-4 py-2">Approved</th>
            <th className="border px-4 py-2">Rejected</th>
            <th className="border px-4 py-2">Remaining Holiday</th>
            <th className="border px-4 py-2">Approved By</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((summary, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{summary.employeeName}</td>
              <td className="border px-4 py-2">{summary.email}</td>
              <td className="border px-4 py-2">{summary.totalRequests}</td>
              <td className="border px-4 py-2">{summary.approvedRequests}</td>
              <td className="border px-4 py-2">{summary.rejectedRequests}</td>
              <td className="border px-4 py-2">{summary.remainingHoliday}</td>
              <td className="border px-4 py-2">
                {summary.approvedByManagers.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={prevPage}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HRDashBoard;
