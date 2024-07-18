import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="w-1/4 bg-white p-4">
        <div className="mb-6">
            <img src="/images/REAL-TY.png" alt="Logo" className="h-12 mx-auto" />
        </div>
        <nav className="space-y-4">
            <a href="" className="block p-2 bg-green-200 rounded">Dashboard</a>
            <p className="text-gray-500">
                <Link to="" className="text-gray-500 hover:text-blue-500">Properties</Link>
            </p>        <p className="text-gray-500">
                <Link to="/admin/users" className="text-gray-500 hover:text-blue-500">All Users</Link>
            </p>
            <p className="text-gray-500">
                <Link to="/admin/sellers" className="text-gray-500 hover:text-blue-700">Sellers</Link>
            </p>
            <p className="text-gray-500">
                <Link to="/admin/buyers" className="text-gray-500 hover:text-blue-700">Buyers</Link>
            </p>
            <p className="text-gray-500">
                <Link to="/admin/regions" className="text-gray-500 hover:text-blue-700">Regions</Link>
            </p>
            <p className="text-gray-500">
                <Link to="" className="text-gray-500 hover:text-blue-500">Ads</Link>
            </p>      
        </nav>
    </div>
  );
};

export default Sidebar;
