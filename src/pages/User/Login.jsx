import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("EEEEEE")

        try {
           
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                email,
                password,
            });
            
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            console.log("EMAIL:",email,password,response.data.access)
            dispatch(loginSuccess(response.data.user));
            navigate('/');
            toast.success('Login Successful..');


        } catch (error) {
            console.error(error);
            toast.error('Login Failed: Please try again..');

        }
    };
   

const handleGoogleLogin = async (credentialResponse) => {
    try {
        const res = await axios.post('http://localhost:8000/api/auth/social/google/', {
            code: credentialResponse.code,
        });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        dispatch(loginSuccess(res.data.user));
        navigate('/agentprofile');
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
                        clientId="30022518210-qqkvm7mipcjg5v4onr4nmeksluep5qvb.apps.googleusercontent.com"
                        onSuccess={handleGoogleLogin}
                        onError={() => console.log('Google Login Failed')}
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
