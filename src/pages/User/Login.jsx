import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { handleLogin, handleGoogleLogin } from "../../utils/auth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { googleLoginUser } from "../../utils/api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
//   const [credentialToken,setCredentialToken] = useState()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleGAuth = async (credentialResponse)=>{
    // const response = await googleLoginUser(token);
    try{
        console.log('Credential response:', credentialResponse);
        const response = await handleGoogleLogin(credentialResponse, dispatch, navigate);
    }catch (error) {
        console.error('Google login failed', error);
        toast.error('Google Login Failed: Please try again');
      }
    };
  
  

  const handleSubmit = (e) => {

    e.preventDefault();
    handleLogin(email, password, dispatch, navigate);

  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img
            src="public/images/loginlogo.png"
            alt="Login Illustration"
            className="mx-auto h-20  mb-4"
          />
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
              type={passwordView ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2  border-white rounded-md focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div
              className="cursor-pointer mt-2"
              onClick={() => setPasswordView(!passwordView)}
            >
              {passwordView ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>

        <div>
          
          <GoogleLogin
            onSuccess={(credentialResponse) => {
                handleGAuth(credentialResponse)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          
        </div>
        <div className="text-center mt-4">
          <Link
            to="/forgotpassword"
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
