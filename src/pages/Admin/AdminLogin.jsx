import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAdminLogin} from '../../utils/adminAuth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdminLogin(email, password, dispatch, navigate);
      };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <h2 className="text-2xl font-semibold">Admin Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2  border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2  border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                      
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Login
                    </button>                
                </form>            
            </div>
        </div>
    );
};

export default Login;



// // src/pages/Admin/AdminLogin.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { adminLoginSuccess } from "../../redux/adminAuthSlice";
// import { toast } from "react-toastify";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform admin login API call and get response
//       const response = await adminLogin(email, password); // Replace with your actual admin login API function
//       // Assuming successful login, dispatch adminLoginSuccess action
//       dispatch(adminLoginSuccess(response.data)); // Assuming response.data contains adminUser, access, refresh, etc.
//       toast.success("Admin Login Successful");
//       navigate("/admin/home");
//     } catch (error) {
//       console.error("Admin Login Error:", error);
//       toast.error("Admin Login Failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
