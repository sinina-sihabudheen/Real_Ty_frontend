import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import { Link, useNavigate } from 'react-router-dom';


const PropertyType = () => {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <img src="/images/REAL-TY.png" alt="Realty Logo" className="w-24 h-24" />
      </div>
      <h1 className="text-2xl font-bold">WELCOME!</h1>
      <p className="mt-2 text-lg">Are you going to place an ad?</p>
      <p className="mt-1 text-lg font-medium">Select the primary category here..</p>
      <div className="flex mt-6 space-x-4">
        <a href="/property_form">
        <div className="flex flex-col items-center">
          <img src="//images/villalogo.jpeg" alt="Apartment" className="w-12 h-12" />
          <span className="mt-2">Villa/House</span>
        </div>
        </a>
        <div className="flex flex-col items-center">
          <img src="/images/apartmentlogo.webp" alt="Apartment" className="w-12 h-12" />
          <span className="mt-2">Apartment</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/images/landlogo.png" alt="Land" className="w-12 h-12" />
          <span className="mt-2">Land Property</span>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PropertyType;
