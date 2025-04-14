import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/AuthSlice';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5090/api/Admin/get-user-data');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee.id);
    setEditForm({
      id: employee.id,
      fullName: employee.fullName,
      email: employee.email,
      password: '',
      dateOfBirth: employee.dateOfBirth.split('T')[0],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5090/api/Admin/update-personal-data', editForm);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const lastRow = rowsPerPage * currentPage;
  const firstRow = lastRow - rowsPerPage;
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const currentRows = employees.slice(firstRow, lastRow);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <table className="w-full bg-white border border-gray-200 shadow-sm text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Full Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Password</th>
            <th className="border px-4 py-2 text-left">Date of Birth</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((emp) =>
            editingEmployee === emp.id ? (
              <tr key={emp.id} className="bg-yellow-50">
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="fullName"
                    value={editForm.fullName}
                    onChange={handleEditChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleEditChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEmployee(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={emp.id}>
                <td className="border px-4 py-2">{emp.fullName}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">{emp.password}</td>
                <td className="border px-4 py-2">
                  {new Date(emp.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(emp)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
