import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Attendance from '../pages/Attendance';
import CreateAttendance from '../pages/CreateAttendance';
import History from './pages/History';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/history" element={<History />} />
      <Route path="/create-attendance" element={<CreateAttendance />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
};

export default AppRoutes;