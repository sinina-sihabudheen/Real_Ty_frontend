import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Home from "../pages/User/Home";
import UserAuth from "../auth/UserAuth";
import { ListedProperties } from "../pages/Seller/ListedProperties";
import PropertyList from "../pages/User/PropertyList";
import ForgotPassword from "../pages/User/ForgotPassword";
import PropertyType from "../pages/Seller/PropertyType";
import PropertyForm from "../pages/Seller/PropertyForm";
import ListingPackages from "../pages/Seller/ListingPackages";
import EditProperty from "../pages/Seller/EditProperty";
import SinglePropertyDetails from "../pages/User/SinglePropertyDetails";
import SubscriptionPage from "../components/subscriptions/Stripe";
import UserProfile from "../pages/User/UserProfile";
import SellerProfile from "../pages/User/SellerProfile";
import SuccessSubscription from "../pages/Seller/SuccessSubscription";
import CancelSubscription from "../pages/Seller/CancelSubscription";
import SellerSingleProperty from "../pages/Seller/SellerSingleProperty";
import Invoice from "../pages/Seller/Invoice";
import ChatComponent from "../pages/User/ChatComponent";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<UserAuth />}>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/listedproperties" element={<ListedProperties isSeller />} />
        <Route path="/propertylist" element={<PropertyList />} />
        <Route path="/property_type" element={<PropertyType />} />
        <Route path="/property_form" element={<PropertyForm />} />
        <Route path="/listing_package" element={<ListingPackages />} />
        <Route path="/edit_property/:id/:category" element={<EditProperty />} />
        <Route path="/single_property/:id/:category" element={<SinglePropertyDetails />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/success" element={<SuccessSubscription />} />
        <Route path="/cancel" element={<CancelSubscription />} />
        <Route path="/sellerprofile/:userId" element={<SellerProfile />} />
        <Route path="/seller_singleproperty/:id/:category" element={<SellerSingleProperty />} />
        <Route path="/invoice/:subscriptionId" element={<Invoice />} />
        <Route path="/chat/:sellerId/:propertyId" element={<ChatComponent />} />
      </Route>
      
    </Routes>
  );
}

export default UserRouter;
