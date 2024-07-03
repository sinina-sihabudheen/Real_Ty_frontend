import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();       

        try {
           
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                email,
                password,
            });
            
            const { access, refresh, role} = response.data;

            const decodedToken = jwtDecode(access);
            const user = {
                id: decodedToken.user_id,
                email: decodedToken.email,
            };

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            localStorage.setItem('role', role);
            localStorage.setItem('user', JSON.stringify(user)); 

            console.log("EMAIL:", email, password, access);
            dispatch(loginSuccess({ access, refresh, role, user }));
            
            navigate('/');
            toast.success('Login Successful..');


        } catch (error) {
            console.error(error);
            toast.error('Login Failed: Please try again..');
        }
    };
   

const handleGoogleLogin = async (credentialResponse) => {
    try {
        const res = await axios.post('http://localhost:8000/api/dj-rest-auth/google/', {
            code: credentialResponse.code,
        });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        dispatch(loginSuccess(res.data.user));
        navigate('/');
        toast.success('Google Login Successful..');
    } catch (error) {
        console.error(error);
        toast.error('Google Login Failed: Please try again..');
    }
};
   
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <h2 className="text-2xl font-semibold">Login</h2>
                </div>
                <form onSubmit={handleLogin}>
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
                <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <span className="text-gray-500">OR</span>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>
                <div className="flex flex-col space-y-2">
                <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse)
    handleGoogleLogin(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                    
                </div>
                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-gray-500 hover:text-gray-700 text-sm">Forgot Password?</Link>
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
