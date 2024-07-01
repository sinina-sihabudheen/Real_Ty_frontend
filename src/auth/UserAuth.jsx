import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserAuth() {
    const token = localStorage.getItem("access")

  return token ? <Outlet/> : <Navigate to="/login"/>
}

export default UserAuth
