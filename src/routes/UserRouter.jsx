import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Home from "../pages/User/Home";
import AgentProfile from "../pages/User/AgentProfile";
import UserAuth from "../auth/UserAuth";
import SellerRegister from "../pages/Seller/SellerRegister";
import { ListedProperties } from "../pages/Seller/ListedProperties";
import PropertyList from "../pages/User/PropertyList";
import ForgotPassword from "../pages/User/ForgotPassword";
import PropertyType from "../pages/Seller/PropertyType";
import PropertyForm from "../pages/Seller/PropertyForm";
import ListingPackages from "../pages/Seller/ListingPackages";
import EditProperty from "../pages/Seller/EditProperty";
import SinglePropertyDetails from "../pages/User/SinglePropertyDetails";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<UserAuth />}>
        <Route path="/agentprofile" element={<AgentProfile />} />
        <Route path="/sellerregister" element={<SellerRegister isBuyer />} />
        <Route path="/listedproperties" element={<ListedProperties isSeller />} />
        <Route path="/propertylist" element={<PropertyList />} />
        <Route path="/property_type" element={<PropertyType />} />
        <Route path="/property_form" element={<PropertyForm />} />
        <Route path="/listing_package" element={<ListingPackages />} />
        <Route path="/edit_property/:id/:category" element={<EditProperty />} />
        <Route path="/single_property/:id/:category" element={<SinglePropertyDetails />} />

      </Route>
    </Routes>
  );
}

export default UserRouter;
