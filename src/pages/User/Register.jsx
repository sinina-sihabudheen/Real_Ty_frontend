import React, { useState,useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { GoogleLogin } from '@react-oauth/google';
import { handleRegister, handleVerifyOtp, handleResendOtp,handleGoogleLogin, handleFetchRegions } from '../../utils/auth';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Register = () => {
   
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [agencyName, setAgencyName] = useState('');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [regions, setRegions] = useState([]);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);   
    const [otpExpired, setOtpExpired] = useState(false);
    const [passwordView,setPasswordView] = useState(false)
    const [confirmPasswordView,setConfirmPasswordView] = useState(false)
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(60);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(() => {
        handleFetchRegions(setRegions);
      }, []);

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
        // const response = await googleLoginUser(token);
        try{
            console.log('Credential response:', credentialResponse);
            const response = await handleGoogleLogin(credentialResponse, dispatch, navigate);
        }catch (error) {
            console.error('Google login failed', error);
            toast.error('Google Login Failed: Please try again');
          }
        };
      
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
    
        if (!username || !email || !password || !confirmPassword || !address || !contactNumber) {
          toast.error('All fields are required.');
          return;
        }
    
        if (!validateEmail(email)) {
          toast.error('Invalid email format.');
          return;
        }
    
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
          toast.error('Password must be at least 8 characters long and contain at least one digit and one letter.');
          return;
        }
    
        if (password !== confirmPassword) {
          toast.error('Passwords do not match.');
          return;
        }
    
        const contactNumberRegex = /^[6789]\d{9}$/;
        if (!contactNumberRegex.test(contactNumber)) {
          let errorMessage = '';
    
          if (contactNumber.length !== 10) {
            errorMessage += 'Contact number should be 10 digits long.';
          }
    
          if (!/^[6789]/.test(contactNumber)) {
            if (errorMessage !== '') {
              errorMessage += ' ';
            }
            errorMessage += 'Contact number should start with 6, 7, 8, or 9.';
          }
    
          toast.error(errorMessage);
          return;
        }
    
        const postData = {
          username,
          email,
          password,
          confirm_password: confirmPassword,
          address,
          contact_number: contactNumber,
          is_seller: isSeller,
        };
    
        if (isSeller) {
          postData.agency_name = agencyName;
          postData.regions = selectedRegions.map(region => region.id);
        }
        handleRegister(postData, setOtpSent, setOtpExpired, setErrors);
        setTimer(60); 
        // if (errors){
        //     toast.error(errors)
        // }

      };


    const handleRegionChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        const selectedRegions = regions.filter(region => selectedIds.includes(region.id));
        setSelectedRegions(selectedRegions);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="flex justify-center items-center min-h-screen max-h-full py-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <h2 className="text-2xl font-semibold">Register Here</h2>
                </div>  
            {!otpSent ? (
                <div>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {/* {errors.username && <p className="text-red-500 text-sm">{errors.username.join(' ')}</p>} */}
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
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.join(' ')}</p>}

                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">

                        <input
                            type={passwordView? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='cursor-pointer mt-2' onClick={()=>setPasswordView(!passwordView)}>
                            {passwordView ? <FaEye/> :<FaEyeSlash/>}
                        </div>
                       
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.join(' ')}</p>}

                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">

                        <input
                            type={confirmPasswordView? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className='cursor-pointer mt-2' onClick={()=>setConfirmPasswordView(!confirmPasswordView)}>
                            {confirmPasswordView ? <FaEye/> :<FaEyeSlash/>}
                        </div>
                       
                    </div>
                    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.join(' ')}</p>}    

                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.join(' ')}</p>}

                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Contact Number"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                    {errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number.join(' ')}</p>}

                     <div className="mb-4 flex items-center">
                        <div>
                        <label className="mr-4 text-gray-500">
                            Register as Seller
                        </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                className='border-gray-600 rounded'
                                checked={isSeller}
                                onChange={(e) => setIsSeller(e.target.checked)}
                            />

                       
                        </div>
                    </div>
                    {isSeller && (
                        <div>
                            <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Agency Name"
                                    className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                                    value={agencyName}
                                    onChange={(e) => setAgencyName(e.target.value)}
                                />
                            </div>
                            {errors.agency_name && <p className="text-red-500 text-sm">{errors.agency_name.join(' ')}</p>}

                            <div className="mb-4 grid items-center border rounded-md px-4 py-2">
                                <label className="mr-4 text-gray-500">
                                    Select Regions to add your list
                                </label>
                                <select
                                    multiple
                                    className='border-gray-300 text-gray-500 rounded'
                                    value={selectedRegions.map(region => region.id)}
                                    onChange={handleRegionChange}
                                >
                                    {regions.map(region => (
                                        <option key={region.id} value={region.id}>{region.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.regions && <p className="text-red-500 text-sm">{errors.regions.join(' ')}</p>}

                        </div>                   
                        
                    )}
                    <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Register
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
                    <p className="text-gray-500">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </p>
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
            </div>
        </div>
    );
};

export default Register;


