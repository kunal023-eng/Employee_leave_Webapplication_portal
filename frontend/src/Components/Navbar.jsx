import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">MyAuthApp</div>
      <div className="space-x-4 flex flex-wrap items-center">
        {role === "Admin" && (
          <>
            <Link to="/user-data" className="hover:text-gray-300 transition duration-200">
              User Data
            </Link>
            <Link to="/user-official-data" className="hover:text-gray-300 transition duration-200">
              User Official Data
            </Link>
            <Link to="/department" className="hover:text-gray-300 transition duration-200">
              Department
            </Link>
          </>
        )}

        {role === "HR" && (
          <Link to="/hr-dashboard" className="hover:text-gray-300 transition duration-200">
            HR Dashboard
          </Link>
        )}

        {role === "Employee" && (
          <>
            <Link to="/employee-dashboard" className="hover:text-gray-300 transition duration-200">
              Employee Dashboard
            </Link>
            <Link to="/send-message" className="hover:text-gray-300 transition duration-200">
              Send Message
            </Link>
            <Link to="/status" className="hover:text-gray-300 transition duration-200">
              Status              .vs/              .vs/
            </Link>
          </>
        )}
        

        {role === "Manager" && (
          <>
            <Link to="/manager-dashboard" className="hover:text-gray-300 transition duration-200">
              Manager Dashboard
            </Link>
            <Link to="/manager-notifications" className="hover:text-gray-300 transition duration-200">
              Notifications
            </Link>
            <Link to="/status" className="hover:text-gray-300 transition duration-200">
              Status
            </Link>
          </>
        )}

        {/* Show Login & Sign Up only if no token */}
        {!token && (
          <>
            <Link to="/login" className="hover:text-gray-300 transition duration-200">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300 transition duration-200">
              Sign Up
            </Link>
          </>
        )}

        {token && <Logout />}
      </div>
    </nav>
  );
};

export default Navbar;
