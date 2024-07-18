import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import AdminAuth from "../auth/AdminAuth";
import AllUsers from "../pages/Admin/AllUsers";
import SellersList from "../pages/Admin/SellersList";
import BuyersList from "../pages/Admin/BuyersList";
import RegionsList from "../pages/Admin/RegionsList";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminAuth />}>
        <Route path="/adminhomepage" element={<AdminHomePage />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/sellers" element={<SellersList />} />
        <Route path="/buyers" element={<BuyersList />} />
        <Route path="/regions" element={< RegionsList/>} />
        <Route path="*" element={<Navigate to="/admin/adminhomepage" />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
