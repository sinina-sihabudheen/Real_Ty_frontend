import React from 'react';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { Link } from 'react-router-dom';


const PropertyCategory = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className='w-full py-8'>
          <AdminHeader isPropertyType={true}/>
         
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-6">Property Categories</h2>
            <div className="flex flex-col space-y-8">
              <div>
              <Link to="/admin/residentialslist/${Villa}/Villa" className="text-gray-700 hover:text-blue-500">
                 
                
                  <img src="/images/villalogo.jpeg" alt="Villa" className="w-12 h-12" />
                  <span className="mt-2">Villas</span>
                
              </Link>
              </div>
              <div>
              <Link to="/admin/residentialslist/${Apartment}/Apartment" className="text-gray-700 hover:text-blue-500">
                  
                  <img src="/images/apartmentlogo.webp" alt="Apartment" className="w-12 h-12" />
                  <span className="mt-2">Apartment</span>
              </Link>
              </div>
              <div>
              <Link to="/admin/landslist/${Land}" className="text-gray-700 hover:text-blue-500">
                  
                  <img src="/images/landlogo.png" alt="Land" className="w-12 h-12" />
                  <span className="mt-2">Land Property</span>
              </Link>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default PropertyCategory;



