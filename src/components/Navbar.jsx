//   import React, { useEffect, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../redux/authSlice';
// import { handleFetchUserData } from '../utils/auth';
// import { fetchUnreadMessages, markMessagesAsRead } from '../utils/messageService';  
// import { FaBell,FaEnvelope } from "react-icons/fa";
// import { FiChevronDown } from "react-icons/fi";
// import { MdAccountCircle } from 'react-icons/md';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const dispatch = useDispatch();
//     const [user, setUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
//     const [unreadMessages, setUnreadMessages] = useState([]);
//     const [websocket, setWebsocket] = useState(null);
//     const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false); // New
//     const [unreadNotifications, setUnreadNotifications] = useState([]); // New
//     const notificationDropdownRef = useRef(null); // New

//     const dropdownRef = useRef(null);
//     const messageDropdownRef = useRef(null);

//     useEffect(() => {
//         if (isAuthenticated) {
//             handleFetchUserData(setUser, setIsLoading, setError);
//             fetchUnreadMessages(setUnreadMessages);
//         }
//     }, [isAuthenticated]);

//     useEffect(() => {
//         const token = localStorage.getItem('access'); 
//         const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//         if (isAuthenticated && user) {
//             const ws = new WebSocket(`${protocol}://realty-backend.soloshoes.online/ws/chat/${user.id}/?token=${token}`);
//             setWebsocket(ws);

//             ws.onmessage = (event) => {
//                 const data = JSON.parse(event.data);
                
//                 if (data.unread_count !== undefined) {
//                     setUnreadMessages((prevMessages) => {
//                         return prevMessages.map((msg) => {
//                             if (msg.sender === data.sender) {
//                                 return { ...msg, unread_count: data.unread_count };
//                             }
//                             return msg;
//                         });
//                     });
//                 }
//             };

//             ws.onclose = () => {
//                 console.log('WebSocket closed');
//             };

//             return () => {
//                 ws.close();
//             };
//         }
//     }, [isAuthenticated, user]);

//     useEffect(() => {
//         const token = localStorage.getItem('access');
//         const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//         if (isAuthenticated && user) {
//             const ws = new WebSocket(`${protocol}://realty-backend.soloshoes.online/ws/notification/?token=${token}`);

//             ws.onmessage = (event) => {
//                 const data = JSON.parse(event.data);

//                 if (data.message) {
//                     setUnreadNotifications((prevNotifications) => [...prevNotifications, data.message]);
//                 }
//             };

//             return () => {
//                 ws.close();
//             };
//         }
//     }, [isAuthenticated, user]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 if (!event.target.closest('.text-gray-500')) {
//                     setDropdownOpen(false);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [dropdownRef]);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/');
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen((prevState) => !prevState);
//     };

//     const toggleMessageDropdown = () => {
//         setMessageDropdownOpen((prevState) => !prevState);
//     };
//     // Toggle the notification dropdown (new)
//     const toggleNotificationDropdown = () => {
//         setNotificationDropdownOpen((prevState) => !prevState);
//     };

//     const handleOpenMessage = (senderId, propertyId, unreadCount) => {
//         navigate(`/chat/${senderId}/${propertyId}`);

//         markMessagesAsRead(senderId, propertyId)
//             .then(() => {
//                 setUnreadMessages((prevMessages) => 
//                     prevMessages.map((msg) =>
//                         msg.sender === senderId ? { ...msg, unread_count: 0 } : msg
//                     )
//                 );
//             })
//             .catch((error) => {
//                 console.error('Failed to mark messages as read:', error);
//             });
//     };

//     return (
//         <nav className="bg-white drop-shadow-lg w-full">
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                 <div className="relative flex h-16 items-center justify-between">
//                     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                         <div className="flex flex-shrink-0 items-center">
//                             <img className="h-14 w-15" src="/images/REAL-TY.png" alt="Real-Ty" />
//                         </div>
//                         <div className="hidden sm:ml-6 sm:block ">
//                             <div className="flex space-x-4">
//                                 <Link to="/" className="text-black-700 hover:text-gray-400 px-3 py-10 text-sm font-medium ">
//                                     Home
//                                 </Link>
//                                 <Link to="/propertylist" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
//                                     Property
//                                 </Link>
//                                 <Link to="/about-us" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
//                                     About Us
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                         {isAuthenticated ? (
//                             <div className="relative flex items-center space-x-4">
//                                 {/* Message Icon with Unread Count */}
//                                 <div ref={messageDropdownRef} className="relative z-50">
//                                     <button onClick={toggleMessageDropdown} className="text-gray-500 hover:text-gray-300 font-medium">
//                                         <FaEnvelope style={{ fontSize: '20px', color: 'gray' }}/>
//                                         {unreadMessages.length > 0 && (
//                                             <span className="ml-1 text-red-500 font-bold">({unreadMessages.length})</span>
//                                         )}
//                                     </button>
//                                     {messageDropdownOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                                             <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                                                 {unreadMessages.length > 0 ? (
//                                                     unreadMessages.map((msg) => (
//                                                         <button
//                                                             key={msg.sender}
//                                                             onClick={() => handleOpenMessage(msg.sender, msg.property_id, msg.unread_count)}
//                                                             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                                             role="menuitem"
//                                                         >
//                                                             {msg.sender_name} ({msg.unread_count})
//                                                         </button>
//                                                     ))
//                                                 ) : (
//                                                     <div className="px-4 py-2 text-sm text-gray-700">No unread messages</div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                                 {/* Notification Icon with Unread Count */}
//                                 <div ref={notificationDropdownRef} className="relative z-50">
//                                     <button onClick={toggleNotificationDropdown} className="text-gray-500 hover:text-gray-300 font-medium">
//                                         <FaBell style={{ fontSize: '20px', color: 'gray' }}/>

//                                         {unreadNotifications.length > 0 && (
//                                             <span className="ml-1 text-red-500 font-bold">({unreadNotifications.length})</span>
//                                         )}
//                                     </button>
//                                     {notificationDropdownOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                                             <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                                                 {unreadNotifications.length > 0 ? (
//                                                     unreadNotifications.map((notif, index) => (
//                                                         <div
//                                                             key={index}
//                                                             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                                             role="menuitem"
//                                                         >
//                                                             {notif}
//                                                         </div>
//                                                     ))
//                                                 ) : (
//                                                     <div className="px-4 py-2 text-sm text-gray-700">No unread notifications</div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* User Profile Dropdown */}
//                                 <div ref={dropdownRef} className=" z-50"> 
//                                     <button
//                                         onClick={toggleDropdown}
//                                         className="text-gray-500 hover:text-gray-300 border-2 pr-4 pl-4 border-gray-50 rounded shadow-md flex items-center capitalize">
//                                         <MdAccountCircle style={{ fontSize: '20px', color: 'gray', marginRight: '0.5rem' }} /> 
//                                         {user ? user.username : 'Profile'}
//                                         <FiChevronDown style={{ marginLeft: '0.5rem' }} />
//                                     </button> 
//                                     {dropdownOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                                             <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                                                 <button
//                                                     onClick={() => navigate("/userprofile")}
//                                                     className=" felx w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                                     role="menuitem"
//                                                 >
//                                                     Profile 
//                                                 </button>
//                                                 <button
//                                                     onClick={handleLogout}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                                     role="menuitem"
//                                                 >
//                                                     Logout
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex space-x-4">
//                                 <Link to="/register" className="text-gray-500 hover:text-gray-300 font-medium">
//                                     Sign Up
//                                 </Link>
//                                 <Link to="/login" className="text-gray-500 hover:text-gray-300 font-medium">
//                                     Sign In
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };
// export default Navbar

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { handleFetchUserData } from '../utils/auth';
import { fetchUnreadMessages, markMessagesAsRead } from '../utils/messageService';
import { FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MdAccountCircle } from 'react-icons/md';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [websocket, setWebsocket] = useState(null);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dropdownRef = useRef(null);
    const messageDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            handleFetchUserData(setUser);
            fetchUnreadMessages(setUnreadMessages);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem('access');
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        if (isAuthenticated && user) {
            const ws = new WebSocket(`${protocol}://realty-backend.soloshoes.online/ws/chat/${user.id}/?token=${token}`);
            setWebsocket(ws);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.unread_count !== undefined) {
                    setUnreadMessages(prevMessages =>
                        prevMessages.map(msg => (msg.sender === data.sender ? { ...msg, unread_count: data.unread_count } : msg))
                    );
                }
            };

            return () => ws.close();
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        const token = localStorage.getItem('access');
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        if (isAuthenticated && user) {
            const ws = new WebSocket(`${protocol}://realty-backend.soloshoes.online/ws/notification/?token=${token}`);
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.message) {
                    setUnreadNotifications(prevNotifications => [...prevNotifications, data.message]);
                }
            };

            return () => ws.close();
        }
    }, [isAuthenticated, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleMessageDropdown = () => setMessageDropdownOpen(prevState => !prevState);
    const toggleNotificationDropdown = () => setNotificationDropdownOpen(prevState => !prevState);
    const toggleMobileMenu = () => setMobileMenuOpen(prevState => !prevState);

    const handleOpenMessage = (senderId, propertyId) => {
        navigate(`/chat/${senderId}/${propertyId}`);
        markMessagesAsRead(senderId, propertyId).then(() => {
            setUnreadMessages(prevMessages =>
                prevMessages.map(msg => (msg.sender === senderId ? { ...msg, unread_count: 0 } : msg))
            );
        });
    };

    return (
        <nav className="bg-white drop-shadow-lg w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-14 w-15" src="/images/REAL-TY.png" alt="Real-Ty" />
                    </div>
                    {/* Desktop Links */}
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link to="/" className="text-black-700 hover:text-gray-400 px-3 py-10 text-sm font-medium">Home</Link>
                        <Link to="/propertylist" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">Property</Link>
                        <Link to="/about-us" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">About Us</Link>
                    </div>
                    {/* Mobile Menu Icon */}
                    <button onClick={toggleMobileMenu} className="sm:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
                        <FaBars size={20} />
                    </button>
                    {/* Icons and User Dropdown */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <>
                                <div ref={messageDropdownRef} className="relative">
                                    <button onClick={toggleMessageDropdown} className="text-gray-500 hover:text-gray-300 font-medium">
                                        <FaEnvelope size={20} />
                                        {unreadMessages.length > 0 && (
                                            <span className="ml-1 text-red-500 font-bold">({unreadMessages.length})</span>
                                        )}
                                    </button>
                                    {messageDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            {unreadMessages.length > 0 ? (
                                                unreadMessages.map(msg => (
                                                    <button key={msg.sender} onClick={() => handleOpenMessage(msg.sender, msg.property_id)} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        {msg.sender_name} ({msg.unread_count})
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-700">No unread messages</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div ref={notificationDropdownRef} className="relative">
                                    <button onClick={toggleNotificationDropdown} className="text-gray-500 hover:text-gray-300 font-medium">
                                        <FaBell size={20} />
                                        {unreadNotifications.length > 0 && (
                                            <span className="ml-1 text-red-500 font-bold">({unreadNotifications.length})</span>
                                        )}
                                    </button>
                                    {notificationDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            {unreadNotifications.length > 0 ? (
                                                unreadNotifications.map((notif, index) => (
                                                    <div key={index} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        {notif}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-700">No unread notifications</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div ref={dropdownRef} className="relative">
                                    <button onClick={toggleDropdown} className="flex items-center text-gray-500 hover:text-gray-300 border-2 border-gray-50 rounded shadow-md px-4">
                                        <MdAccountCircle size={20} className="mr-2" /> {user ? user.username : 'Profile'}
                                        <FiChevronDown className="ml-2" />
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <button onClick={() => navigate("/userprofile")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        {!isAuthenticated && (
                            <div className="hidden sm:flex space-x-4">
                                <Link to="/register" className="text-gray-500 hover:text-gray-300 font-medium">Sign Up</Link>
                                <Link to="/login" className="text-gray-500 hover:text-gray-300 font-medium">Sign In</Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* Mobile Menu Links */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/propertylist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Property</Link>
                        <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>About Us</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/userprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Profile</Link>
                                <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Sign Up</Link>
                                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Sign In</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
