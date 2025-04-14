import { useEffect, useState } from "react";
import axios from "axios";

const EmpManagerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [tempMessage, setTempMessage] = useState("");

  const managerId = localStorage.getItem("employeeId");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5090/api/Manager/manager/requests/${managerId}`);
      setRequestData(res.data.reverse());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateMessage = async (requestId, message) => {
    if (!message.trim()) return;
    try {
      await axios.put("http://localhost:5090/api/Manager/message-update", {
        requestId,
        message,
      });
      setEditingMessageId(null);
      setTempMessage("");
      fetchRequests();
    } catch (err) {
      console.error("Message update error:", err);
    }
  };

  const updateReview = async (requestId, status) => {
    try {
      await axios.put("http://localhost:5090/api/Manager/review", {
        requestId,
        managerId,
        status,
      });
      fetchRequests();
    } catch (err) {
      console.error("Review update error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const lastRow = currentPage * rowsPerPage;
  const firstRow = lastRow - rowsPerPage;
  const totalPages = Math.ceil(requestData.length / rowsPerPage);
  const currentRequestData = requestData.slice(firstRow, lastRow);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee Manager Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Employee</th>
                  <th className="px-4 py-2 border">Leave Type</th>
                  <th className="px-4 py-2 border">Reason</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Start Date</th>
                  <th className="px-4 py-2 border">End Date</th>
                  <th className="px-4 py-2 border">Message</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRequestData.map((req) => (
                  <tr key={req.requestId} className="text-center">
                    <td className="px-4 py-2 border">{req.employeeName}</td>
                    <td className="px-4 py-2 border">{req.leaveType}</td>
                    <td className="px-4 py-2 border">{req.reason}</td>
                    <td className="px-4 py-2 border">{req.status}</td>
                    <td className="px-4 py-2 border">{new Date(req.startDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{new Date(req.endDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">
                      {editingMessageId === req.requestId ? (
                        <input
                          className="border p-1 w-full"
                          value={tempMessage}
                          onChange={(e) => setTempMessage(e.target.value)}
                          onBlur={() => updateMessage(req.requestId, tempMessage)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") updateMessage(req.requestId, tempMessage);
                          }}
                          autoFocus
                        />
                      ) : (
                        <span
                          className="text-blue-600 cursor-pointer"
                          onClick={() => {
                            setEditingMessageId(req.requestId);
                            setTempMessage(req.message || "");
                          }}
                        >
                          {req.message?.trim() ? req.message : "Add Response"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => updateReview(req.requestId, "Approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateReview(req.requestId, "Rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default EmpManagerDashboard;
