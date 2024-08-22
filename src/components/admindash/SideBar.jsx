import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { handleFetchUserData } from '../../utils/adminAuth';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            handleFetchUserData(setUser, setIsLoading, setError);
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

  return (
    <div className="w-60 h-screen bg-white border border-gray-200 shadow-md p-4">
        <div className="mb-6">
            <img src="/images/REAL-TY.png" alt="Logo" className="h-4/12 w-4/12 mx-auto" />
        </div>
        <nav className="space-y-4">
            <a href="/admin/adminhomepage" className="block p-2 bg-green-200 rounded">Dashboard</a>
            <p className="text-gray-500">
                <Link to="/admin/propertycategory" className="text-gray-500 hover:text-blue-500">Properties</Link>
            </p>        
            <p className="text-gray-500">
                <Link to="/admin/users" className="text-gray-500 hover:text-blue-500">All Users</Link>
            </p>
           
            {/* <p className="text-gray-500">
                <Link to="/admin/regions" className="text-gray-500 hover:text-blue-700">Regions</Link>
            </p> */}
            <p className="text-gray-500">
                <Link to="/admin/category" className="text-gray-500 hover:text-blue-700">Category</Link>
            </p>
            <p className="text-gray-500">
                <Link to="/admin/amenity" className="text-gray-500 hover:text-blue-700">Amenity</Link>
            </p>
            <p className="text-gray-500">
                <Link to="/admin/subscriptionList" className="text-gray-500 hover:text-blue-700">Subscriptions</Link>
            </p>
            <p className="text-gray-500">
                <button onClick={handleLogout} className="text-gray-500 hover:text-blue-700">Logout</button>
            </p>
           
            {/* <p className="text-gray-500">
                <Link to="" className="text-gray-500 hover:text-blue-500">Ads</Link>
            </p>       */}
        </nav>
    </div>
  );
};

export default Sidebar;
