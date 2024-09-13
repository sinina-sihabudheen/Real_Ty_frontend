

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { handleFetchUserData } from '../utils/auth';
import { fetchUnreadMessages } from '../utils/messageService';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const dropdownRef = useRef(null);
    const messageDropdownRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            handleFetchUserData(setUser, setIsLoading, setError);
            fetchUnreadMessages(setUnreadMessages);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (!event.target.closest('.text-gray-500')) {
                    setDropdownOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const toggleMessageDropdown = () => {
        setMessageDropdownOpen((prevState) => !prevState);
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
                                <Link to="/propertylist" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
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
                                {/* Message Icon with Unread Count */}
                                <div ref={messageDropdownRef} className="relative z-50">
                                    <button onClick={toggleMessageDropdown} className="text-gray-500 hover:text-gray-300 font-medium">
                                        <i className="fa-regular fa-message"></i>
                                        {unreadMessages.length > 0 && (
                                            <span className="ml-1 text-red-500 font-bold">({unreadMessages.length})</span>
                                        )}
                                    </button>
                                    {messageDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {unreadMessages.length > 0 ? (
                                                    unreadMessages.map((msg) => (
                                                        <button
                                                            key={msg.sender}
                                                            onClick={() => navigate(`/chat/${msg.sender}/${msg.property_id}`)}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            {msg.sender_name} ({msg.unread_count})
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2 text-sm text-gray-700">No messages</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User Profile Dropdown */}
                                <div ref={dropdownRef} className=" z-50">
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-gray-500 hover:text-gray-300 font-medium flex items-center capitalize"
                                    >
                                        {user ? user.username : 'Profile'}
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <button
                                                    onClick={() => navigate("/userprofile")}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Profile
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
