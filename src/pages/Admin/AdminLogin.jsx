import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAdminLogin} from '../../utils/adminAuth';
import { toast } from 'sonner';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';

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
            navigate('/admin/login');
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
                </div>       
            </div>
        </div>
    );
};

export default Login;

