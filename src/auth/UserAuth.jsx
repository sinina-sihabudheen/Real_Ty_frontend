// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// function UserAuth() {
//     const token = localStorage.getItem("access")

//   return token ? <Outlet/> : <Navigate to="/login"/>
// }

// export default UserAuth


import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserAuth() {
    const token = localStorage.getItem("access")
    const isAdmin = localStorage.getItem("role")
    

    // Check if user is authenticated and not an admin
    return token && isAdmin!='admin' ? <Outlet /> : <Navigate to="/login" />
}

export default UserAuth
