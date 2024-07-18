import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

function AdminAuth() {
    const isAdminAuthenticated = useSelector(state => state.adminAuth.isAdminAuthenticated)
    // const isAdmin = localStorage.getItem("admin")
    const isAdmin = localStorage.getItem('admin') === 'true'; 

    return isAdminAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />
}

export default AdminAuth
