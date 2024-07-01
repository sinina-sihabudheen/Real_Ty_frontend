import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../../redux/authSlice';


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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/regions/');
                setRegions(response.data);
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };

        fetchRegions();
    }, []);

   
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword || !address || !contactNumber) {
            alert('All fields are required.');
            toast.error('All fields are required..');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format.');
            toast.error('Invalid email format.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            toast.error('Passwords not match..');
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

        try {
            const response = await axios.post('http://localhost:8000/api/register/', postData);
            setOtpSent(true);
            toast.success('Otp sent to the mail..');
        } catch (error) {
            if (error.response) {
                console.error('Server Response:', error.response.data);
                const {  email } = error.response.data;
                if (email) alert(`Email error: ${email[0]}`);
                if (email) toast.error(`Email error: ${email[0]}`);
            } else if (error.request) {
                console.error('Request Error:', error.request);
                toast.error('Error registering: No response from server.');
            } else {
                console.error('Error:', error.message);
                toast.error('Error registering: Please try again..');
            }
        }
    };


    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/api/verify-otp/', {
                email,
                token: otp,
            });
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            dispatch(registerSuccess(response.data.user));
            toast.success('Registered Successfully..');
            navigate('/')
            
        } catch (error) {
            console.error(error);
            toast.error('Invalid OTP: Please try again..');

        }
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

    const handleSocialLogin = () => {
        window.location.href = `http://localhost:8000/api/auth/social/login/google/?next=http://localhost:5173/social-callback`;
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
                <form onSubmit={handleRegister}>
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

                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                       
                    </div>
                    <div className="mb-4 flex items-center border rounded-md px-4 py-2">

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                       
                    </div>

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
                     <div className="mb-4 flex items-center">
                        <label className="mr-4">
                            Register as Seller:
                            <input
                                type="checkbox"
                                checked={isSeller}
                                onChange={(e) => setIsSeller(e.target.checked)}
                            />
                        </label>
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
                            <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                                <select
                                    multiple
                                    value={selectedRegions.map(region => region.id)}
                                    onChange={handleRegionChange}
                                >
                                    {regions.map(region => (
                                        <option key={region.id} value={region.id}>{region.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>                   
                        
                    )}
                    <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Register
                    </button>
                </form>
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
                                <form onSubmit={handleVerifyOtp}>
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
                                                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-400 border-none text-white text-sm shadow-sm">
                                                    Verify Account
                                                </button>
                                            </div>
                                        </div> 
                                    </div>                           
                                </form>
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
