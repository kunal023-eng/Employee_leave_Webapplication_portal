import React from 'react';
import { Button } from '@mui/material'; // Import Button from Material-UI
import { logout } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default Logout;