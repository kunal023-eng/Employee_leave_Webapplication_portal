import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';
import UserData from './AdminComponents/UserData';
import UserOfficialData from './AdminComponents/UserOfficialData';
import Department from './AdminComponents/Department';
import HRDashBoard from './DashBoard/HRDashBoard';
import EmployeeDashboard from './DashBoard/EmployeeDashboard';
import EmpManagerDashboard from './EmployeeComponents/EmpManagerDashboard';
import ManagerNotifications from './EmployeeComponents/ManagerNotifications';
import SendMessage from './EmployeeComponents/SendMessage';
import Status from './EmployeeComponents/Status';
const App = () => {
    const Navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-data"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <UserData />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-official-data"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <UserOfficialData />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/department"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <Department />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/hr-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["HR"]}>
                            <HRDashBoard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manager-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["Manager"]}>
                            <EmpManagerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manager-notifications"
                    element={
                        <ProtectedRoute allowedRoles={["Manager"]}>
                            <ManagerNotifications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/send-message"
                    element={
                        <ProtectedRoute allowedRoles={["Employee"]}>
                            <SendMessage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/status"
                    element={
                        <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
                            <Status />
                        </ProtectedRoute>
                    }
                />
                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
};

export default App;
