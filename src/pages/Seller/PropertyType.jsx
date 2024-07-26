
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PropertyType = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/property_form', { state: { category } });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="mb-4">
          <img src="/public/images/REAL-TY.png" alt="Realty Logo" className="w-24 h-24" />
        </div>
        <h1 className="text-2xl font-bold">WELCOME!</h1>
        <p className="mt-2 text-lg">Are you going to place an ad?</p>
        <p className="mt-1 text-lg font-medium">Select the primary category here..</p>
        <div className="flex mt-6 space-x-4">
          <div onClick={() => handleCategoryClick('Villa')} className="flex flex-col items-center cursor-pointer">
            <img src="/images/villalogo.jpeg" alt="Villa" className="w-12 h-12" />
            <span className="mt-2">Villa/House</span>
          </div>
          <div onClick={() => handleCategoryClick('Apartment')} className="flex flex-col items-center cursor-pointer">
            <img src="/images/apartmentlogo.webp" alt="Apartment" className="w-12 h-12" />
            <span className="mt-2">Apartment</span>
          </div>
          <div onClick={() => handleCategoryClick('Land')} className="flex flex-col items-center cursor-pointer">
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

