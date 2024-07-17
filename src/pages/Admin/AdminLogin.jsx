import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAdminLogin} from '../../utils/adminAuth';
import { toast } from 'sonner';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [passwordView,setPasswordView] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdminLogin(email, password, dispatch, navigate)
          .catch(error => {
            toast.error('Login Failed: Please try again');
            console.error('Login error:', error);
          });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    {/* <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" /> */}
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
                            type={passwordView? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2  border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='cursor-pointer mt-2' onClick={()=>setPasswordView(!passwordView)}>
                            {passwordView ? <FaEye/> :<FaEyeSlash/>}
                        </div>
                      
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

