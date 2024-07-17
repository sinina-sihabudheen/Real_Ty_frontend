import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { handleResetPassword, handleVerifyOtp, handleResendOtp, handleNewPasswordSet} from '../../utils/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpExpired, setOtpExpired] = useState(false);
    const [passwordView, setPasswordView] = useState(false);
    const [confirmPasswordView, setConfirmPasswordView] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (otpSent) {
            const otpExpiryTimer = setTimeout(() => {
                setOtpExpired(true);
                toast.error('OTP has expired.');
            }, 60000); //One minute

            return () => clearTimeout(otpExpiryTimer);
        }
    }, [otpSent]);

   
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        handleResetPassword({ email }, setOtpSent, setOtpExpired);
    };

    const handleEmailDemo = async ()=>{
        const em='sala@gmail.com'
        const response= await axios.post('http://localhost:8000/api/forgot_password/',em)
    };

   
    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            toast.error('Password must be at least 8 characters long and contain at least one digit and one letter.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        handleNewPasswordSet({ email, otp, password, confirm_password: confirmPassword });
        navigate('/login');  
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen max-h-full py-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold">Reset Password</h2>
                    <button onClick={handleEmailDemo} className="">submit</button>
                </div>


                {!otpSent ? ( 
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Submit
                        </button>
                    </form>
                ) : !otpVerified ? ( 
                    <div className='flex w-full justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-300 bg-opacity-50 px-6'>
                        <div className="relative bg-white px-6 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                            <div className='flex justify-end mb-2 text-3xl cursor-pointer' onClick={() => setOtpSent(false)}><IoMdClose /></div>
                            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                                <div className="flex flex-col items-start justify-start text-center space-y-2">
                                    <div className="font-semibold text-3xl">
                                        <p className='text-lg text-gray-500'>An OTP is sent to your email</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center text-xl text-gray-500'>
                                    <h1>Please enter the OTP</h1>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(email, otp, navigate); }}>
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row justify-center text-center px-2">
                                            <input
                                                type="text"
                                                placeholder="OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-sm shadow-sm">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {otpExpired && (
                                    <div className="text-center mt-4">
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
                ) : (
                
                <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type={passwordView ? "text" : "password"}
                            placeholder="New Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='cursor-pointer mt-2' onClick={() => setPasswordView(!passwordView)}>
                            {passwordView ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type={confirmPasswordView ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className='cursor-pointer mt-2' onClick={() => setConfirmPasswordView(!confirmPasswordView)}>
                            {confirmPasswordView ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-sm shadow-sm">
                        Set Password
                    </button>
                </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;


