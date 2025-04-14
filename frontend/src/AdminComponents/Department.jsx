import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5090/api/Admin/GetDepartments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartment.trim()) return;

    try {
      await axios.post(`http://localhost:5090/api/Admin/AddDepartment/${newDepartment}`);
      setNewDepartment('');
      fetchDepartments(); // Refresh the list
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Department Management</h2>

      {/* Add New Department Form */}
      <form onSubmit={handleAddDepartment} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Enter new department name"
            className="border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Department
          </button>
        </div>
      </form>

      {/* Departments List */}
      <table className="w-[800px] border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Department ID</th>
            <th className="px-4 py-2 text-left">Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.deptId} className="border-t border-gray-300">
              <td className="px-4 py-2">{dept.deptId}</td>
              <td className="px-4 py-2">{dept.deptName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
