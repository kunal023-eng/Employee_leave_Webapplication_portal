import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/AuthSlice';

const UserOfficialData = () => {
  const [employeeOrgs, setEmployeeOrgs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    employeeId: '',
    fullName: '',
    departmentId: '',
    role: '',
    managerId: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrgData();
    fetchDepartments();
  }, []);

  const fetchOrgData = async () => {
    try {
      const res = await axios.get('http://localhost:5090/api/Admin/get-department-role-manager');
      setEmployeeOrgs(res.data);
    } catch (error) {
      console.error('Failed to fetch employee organization details:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:5090/api/Admin/GetDepartments');
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.empId);
    setEditForm({
      employeeId: emp.empId,
      fullName: emp.fullName || '',
      departmentId: emp.departmentId || '',
      role: emp.role || '',
      managerId: emp.managerId || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (editForm.employeeId === Number(editForm.managerId)) {
      alert("An employee cannot be their own manager.");
      return;
    }

    try {
      
      await axios.put('http://localhost:5090/api/Admin/update-department-role-manager', {
        employeeId: editForm.employeeId,
        fullName: editForm.fullName,
        departmentId: Number(editForm.departmentId),
        role: editForm.role,
        managerId: editForm.managerId ? Number(editForm.managerId) : null,
      });
      setEditingId(null);
      fetchOrgData();
    } catch (error) {
      console.error('Failed to update employee details:', error);
    }
  };

  const lastRow = rowsPerPage * currentPage;
  const firstRow = lastRow - rowsPerPage;
  const totalPages = Math.ceil(employeeOrgs.length / rowsPerPage);
  const currentRows = employeeOrgs.slice(firstRow, lastRow);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const roleOptions = ['Employee', 'HR', 'Manager', 'Admin'];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Organization Details</h2>

      <table className="w-full bg-white border border-gray-200 shadow-sm text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Emp ID</th>
            <th className="border px-4 py-2 text-left">Full Name</th>
            <th className="border px-4 py-2 text-left">Department</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Manager ID</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((emp) =>
            editingId === emp.empId ? (
              <tr key={emp.empId} className="bg-yellow-50">
                <td className="border px-4 py-2">{emp.empId}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="fullName"
                    value={editForm.fullName}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    name="departmentId"
                    value={editForm.departmentId}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="">-- Select Department --</option>
                    {departments.map((dept) => (
                      <option key={dept.deptId} value={dept.deptId}>
                        {dept.deptName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="">-- Select Role --</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="managerId"
                    value={editForm.managerId}
                    onChange={handleChange}
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
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={emp.empId}>
                <td className="border px-4 py-2">{emp.empId}</td>
                <td className="border px-4 py-2">{emp.fullName}</td>
                <td className="border px-4 py-2">{emp.deptName ?? '-'}</td>
                <td className="border px-4 py-2">{emp.role}</td>
                <td className="border px-4 py-2">{emp.managerId ?? '-'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(emp)}
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

      {/* Pagination */}
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

      {/* Logout */}
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

export default UserOfficialData;
