import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Home from "../pages/User/Home";
import AgentProfile from "../pages/User/AgentProfile";
import BuyerProfile from "../pages/User/BuyerProfile";
import UserAuth from "../auth/UserAuth";


function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 

      <Route element={<UserAuth />}>
        <Route path="/agentprofile" element={<AgentProfile />} />
      </Route>
      <Route path="/buyerprofile" element={<BuyerProfile />} />
    </Routes>
  );
}

export default UserRouter;
