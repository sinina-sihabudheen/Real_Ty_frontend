import React from 'react';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { Link } from 'react-router-dom';


const PropertyCategory = () => {
  return (
    <>
     <div className="flex">
          <Sidebar />
      <div className='grid'>
      <AdminHeader />
    
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-6">Property Categories</h2>
      <div className="flex flex-col  space-y-4">
        {/* <Link to="/admin/propertycategory" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow-md">
            Villas
            </button>
        </Link>
        <Link to="/admin/propertycategory" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow-md">
            Apartments
            </button>
        </Link> */}
        <Link to="/admin/propertylist/${Land}" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold  text-3xl rounded shadow-md">
            Lands
            </button>
        </Link>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default PropertyCategory;