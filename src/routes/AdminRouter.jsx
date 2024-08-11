import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import AdminAuth from "../auth/AdminAuth";
import AllUsers from "../pages/Admin/AllUsers";
import SellersList from "../pages/Admin/SellersList";
import BuyersList from "../pages/Admin/BuyersList";
import RegionsList from "../pages/Admin/RegionsList";
import PropertyCategory from "../pages/Admin/PropertyCategory";
import PropertyLists from "../pages/Admin/PropertyLists";
import CategoryList from "../pages/Admin/CategoryList";
import AmenityList from "../pages/Admin/AmenityList";
import ResidentialsList from "../pages/Admin/ResidentialsList";
import LandsList from "../pages/Admin/LandsList";

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
        <Route path="/propertycategory" element={< PropertyCategory/>} />
        {/* <Route path="/propertylist/:category" element={<PropertyLists />} /> */}
        <Route path="/landslist/:category" element={<LandsList />} />
        <Route path="/residentialslist/:category/:propertyType" element={<ResidentialsList />} />


        <Route path="*" element={<Navigate to="/admin/adminhomepage" />} />
        <Route path="/category" element={< CategoryList/>} />
        <Route path="/amenity" element={< AmenityList/>} />

      </Route>
    </Routes>
  );
};

export default AdminRouter;
