import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { handleLogin, handleGoogleLogin } from '../../utils/auth';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { signInWithGooglePopup } from "../../firebase"






const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [passwordView,setPasswordView] = useState(false)


    const navigate = useNavigate();
    const dispatch = useDispatch();



    const logGoogleUser = async () => {
            const response = await signInWithGooglePopup();
            console.log("RESPONSE",response);
            navigate('/agentprofile')
        }
        
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password, dispatch, navigate);
      };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <h2 className="text-2xl font-semibold">Login</h2>
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
                <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <span className="text-gray-500">OR</span>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>
                {/* <div className="flex flex-col space-y-2">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                        
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                    
                </div> */}
                <div>
                     <button onClick={logGoogleUser}>Sign In With Google</button>
                </div>
                <div className="text-center mt-4">
                    <Link to="/forgotpassword" className="text-gray-500 hover:text-gray-700 text-sm">Forgot Password?</Link>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-500">
                        Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Click Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
