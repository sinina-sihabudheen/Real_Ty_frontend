import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import { useSelector } from "react-redux";

const AdminRouter = () => {
  const isAdminAuthenticated = useSelector(state => state.adminAuth.isAdminAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      {isAdminAuthenticated ? (
        <>
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="*" element={<Navigate to="/admin/adminhomepage" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/admin/login" />} />
      )}
    </Routes>
  );
};

export default AdminRouter;
