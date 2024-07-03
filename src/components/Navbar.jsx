import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice.jsx'




const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); 
    };

    return (
        <nav className="bg-white drop-shadow-lg w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-14 w-15" src="/images/REAL-TY.png" alt="Real-Ty" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-black-700 hover:text-gray-400 px-3 py-10 text-sm font-medium">
                                    Home
                                </Link>
                                <Link to="/property" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                                    Property
                                </Link>
                                <Link to="/about-us" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                                    About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {isAuthenticated ? (
                            <div className="relative flex items-center space-x-4">
                                <button onClick={() => navigate("/agentprofile")} className="text-gray-500 hover:text-gray-300 font-medium">
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/register" className="text-gray-500 hover:text-gray-300 font-medium">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="text-gray-500 hover:text-gray-300 font-medium">
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
