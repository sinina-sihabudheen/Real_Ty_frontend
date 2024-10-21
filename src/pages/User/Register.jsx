import React, { useState,useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { GoogleLogin } from '@react-oauth/google';
import { handleRegister, handleVerifyOtp, handleResendOtp,handleGoogleLogin, handleFetchRegions } from '../../utils/auth';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const Register = () => {   
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);   
    const [otpExpired, setOtpExpired] = useState(false);
    const [passwordView,setPasswordView] = useState(false)
    const [confirmPasswordView,setConfirmPasswordView] = useState(false)
    const [timer, setTimer] = useState(60);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    useEffect(() => {
        if (otpSent) {
            const otpExpiration = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
              }, 1000);

            const otpExpiryTimer = setTimeout(() => {
                setOtpExpired(true);
                toast.error('OTP has expired.');
                clearInterval(otpExpiryTimer);

            }, 60000); //300000 for 5minutes

            return () => {
                clearInterval(otpExpiration);
                clearTimeout(otpExpiryTimer);

            }
        }
    }, [otpSent]);

    const handleGAuth = async (credentialResponse)=>{
        try{
            console.log('Credential response:', credentialResponse);
            const response = await handleGoogleLogin(credentialResponse, dispatch, navigate);
        }catch (error) {
            console.error('Google login failed', error);
            toast.error('Google Login Failed: Please try again');
          }
        };
      
    const onSubmit = async (data) => {
            const { username, email, password, confirmPassword, address, contactNumber, agencyName } = data;
            setEmail(email);
    
            const postData = { username, email, password, confirm_password: confirmPassword, address, contact_number: contactNumber, agency_name: agencyName };
    
            handleRegister(postData, setOtpSent, setOtpExpired);
            setTimer(60);
            setOtpExpired(true);
        };

    return (
        <div className="flex justify-center items-center min-h-screen max-h-full py-4 bg-gray-100">
            <Box className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <Typography variant="h4" align="center" gutterBottom>
                        Register Here
                    </Typography>                
                </div>  
            {!otpSent ? (
                <div className="container text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        {...register("username", { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register("email", { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Password"
                        type={passwordView ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        {...register("password", { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setPasswordView(!passwordView)}>
                                        {passwordView ? <FaEye /> : <FaEyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirm Password"
                        type={confirmPasswordView ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        {...register("confirmPassword", {
                            required: 'Please confirm your password',
                            validate: value => value === watch('password') || 'Passwords do not match',
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setConfirmPasswordView(!confirmPasswordView)}>
                                        {confirmPasswordView ? <FaEye /> : <FaEyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        {...register("address", { required: 'Address is required' })}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                    />

                    <TextField
                        label="Contact Number"
                        fullWidth
                        margin="normal"
                        {...register("contactNumber", { required: 'Contact Number is required', pattern: { value: /^[6789]\d{9}$/, message: 'Contact number must start with 6, 7, 8, or 9 and be 10 digits long' } })}
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber?.message}
                    />
                    <TextField
                        label="Agency Name"
                        fullWidth
                        margin="normal"
                        {...register("agencyName")}
                    />

                    <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"  
                            className="w-1/3 mt-6"
                        >
                            Register
                    </Button>
                </form>
                <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <span className="text-gray-500">OR</span>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>
                <div className="flex justify-center mt-6">
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
                    <Typography variant="body2">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </Typography>
                </div>
               
                </div>
             
            
            ) : (
                <div className='flex w-full justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-300 bg-opacity-50 px-6'>
                    <div className="relative bg-white px-6 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className='flex justify-end mb-2 text-3xl cursor-pointer' onClick={() => setOtpSent(false)}><IoMdClose/></div>
                            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                                <div className="flex flex-col items-start justify-start text-center space-y-2">
                                    <div className="font-semibold text-3xl">
                                        <p className='text-lg text-gray-500 '>An OTP is sent to your mail</p>
                                    </div>                                
                                </div>
                                <div className='flex justify-center items-center text-xl text-gray-500'>
                                    <h1> Please enter OTP</h1>
                                    </div>
                                <div>
                                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(email, otp, navigate); }}>

                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row justify-center text-center px-2">
                                            <input
                                                type="text"
                                                placeholder="OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div> 
                                        <div className="flex flex-col space-y-5">
                                            <div>

                                                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-sm shadow-sm">
                                                    Verify Account
                                                </button>
                                            </div>
                                        </div> 
                                    </div>                           
                                </form>
                                {otpExpired && (
                                <div className="text-center mt-4">
                                    <p className="text-red-500">OTP expires in {timer} seconds</p>

                                    <button 
                                    onClick={() => handleResendOtp(email, setOtpExpired, setOtp)}

                                    className="bg-red-400 text-white px-4 py-2 rounded-md">
                                        Resend OTP
                                    </button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </Box>
        </div>
    );
};

export default Register;
