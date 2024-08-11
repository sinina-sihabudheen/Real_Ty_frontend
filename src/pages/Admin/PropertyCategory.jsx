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
        <Link to="/admin/residentialslist/${Villa}/Villa" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold h-10 w-full text-xl rounded shadow-md">
            Villas
            </button>
        </Link>
        <Link to="/admin/residentialslist/${Apartment}/Apartment" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 text-xl rounded shadow-md">
            Apartments
            </button>
        </Link>
        <Link to="/admin/landslist/${Land}" className="text-gray-500 hover:text-blue-500">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold h-10 w-full text-xl rounded shadow-md">
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