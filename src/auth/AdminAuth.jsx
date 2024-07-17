import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

function AdminAuth() {
    const isAdminAuthenticated = useSelector(state => state.adminAuth.isAdminAuthenticated)
    const isAdmin = localStorage.getItem("admin")

    // Check if admin is authenticated and the admin flag is set
    return isAdminAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />
}

export default AdminAuth
