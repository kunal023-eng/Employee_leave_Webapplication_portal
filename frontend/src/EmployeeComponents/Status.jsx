import { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // You can adjust page size here

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5090/api/Employee/Status?employeeId=${employeeId}`
        );
        setStatusData(response.data.reverse()); // Reverse to show latest status on top
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchStatus();
    } else {
      console.warn("No employeeId found in localStorage.");
      setLoading(false);
    }
  }, [employeeId]);

  // Pagination logic
  const lastRow = currentPage * rowsPerPage;
  const firstRow = lastRow - rowsPerPage;
  const totalPages = Math.ceil(statusData.length / rowsPerPage);
  const currentData = statusData.slice(firstRow, lastRow);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Leave Status</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : statusData.length === 0 ? (
        <p className="text-center text-gray-500">No status found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Leave Type</th>
                  <th className="px-4 py-2 border">Reason</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Message</th>
                  <th className="px-4 py-2 border">Manager</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="px-4 py-2 border">{item.leaveType}</td>
                    <td className="px-4 py-2 border">{item.reason}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          item.status === "Approved"
                            ? "bg-green-500"
                            : item.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-gray-700">
                      {item.message || "—"}
                    </td>
                    <td className="px-4 py-2 border text-gray-700">
                      {item.managerName || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Status;
