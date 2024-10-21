import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import { handleLogin, handleGoogleLogin } from "../../utils/auth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGAuth = async (credentialResponse) => {
    try {
      console.log('Credential response:', credentialResponse);
      const response = await handleGoogleLogin(credentialResponse, dispatch, navigate);
    } catch (error) {
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
            className="mx-auto h-20 mb-4"
          />
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>

        <div className="container text-center">
          <form onSubmit={handleSubmit}>
            <TextField
              className="w-full mt-3"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none", 
                  },
                },
              }}
            />

            <div className="flex items-center mt-5">
               <TextField
                className="w-full"
                label="Password"
                type={passwordView ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none", 
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordView(!passwordView)}
                        edge="end"
                      >
                        {passwordView ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  
                }}
              />
            </div>
            <div className="items-center mt-6">
              <Button
                type="submit"
                variant="contained"
                className="w-1/3 mt-6"
              >
                Login
              </Button>
            </div>
          </form>
          

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => handleGAuth(credentialResponse)}
            onError={() => console.log("Login Failed")}
            className="w-full items-center" 
          />
        </div>
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
