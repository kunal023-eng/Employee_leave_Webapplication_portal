import React from 'react';
import AdminDashboard from "../DashBoard/AdminDashboard";
import EmployeeDashboard from "../DashBoard/EmployeeDashboard";
import HRDashBoard from "../DashBoard/HRDashBoard";
import EmpManagerDashboard from "../EmployeeComponents/EmpManagerDashboard";

const DashboardPage = ({ role }) => {
  if (!role) {
    return <div className="text-center mt-10 text-2xl font-bold">Loading...</div>;
  }

  if (role === 'Admin') {
    return <AdminDashboard />;
  }

  if (role === 'Employee') {
    return <EmployeeDashboard />;
  }

  if (role === 'HR') {
    return <HRDashBoard />;
  }

  if (role === 'Manager') {
    return <EmployeeDashboard  />;
  }

  return <div className="text-center mt-10 text-2xl font-bold">Welcome to Dashboard</div>;
};

export default DashboardPage;
