import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const AgentProfile = () => {
  const [properties, setProperties] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const fetchProperties = async () => {
      const data = [
        {
          price: '40 Lakhs',
          beds: '5 beds',
          baths: '5 baths',
          area: '2500sqft',
          location: 'Kondotty',
          image: 'public/images/home1.jpg'
        },
        {
          price: '40 Lakhs',
          beds: '5 beds',
          baths: '5 baths',
          area: '2500sqft',
          location: 'Kondotty',
          image: 'public/images/home3.jpg'
        }
      ];
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <>
     
     {isAuthenticated ? (
        <Navbar authenticated={true} />
      ) : (
        <Navbar authenticated={false} />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col items-center">
              <img
                className="h-40 w-40 rounded-full mb-4"
                src="/images/user.png"
                alt="Agent"
              />
              <h2 className="text-xl font-semibold">ALEX</h2>
              <p>Polly Real Estate LLC</p>
              <p>Kozhikode</p>
            </div>
            <div className="mt-4 grid justify-items-center">
              <button className="w-6/12  bg-green-400 text-white py-2 rounded-md mb-2">CALL</button>
              <button className="w-6/12 bg-red-400 text-white py-2 rounded-md mb-2">EMAIL</button>
              <button className="w-6/12 bg-blue-400 text-white py-2 rounded-md">SHARE</button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">SERVICE AREAS</h3>
              <p>Kozhikode, Malappuram</p>
              <h3 className="text-lg font-medium mt-4">SPECIALIZED IN</h3>
              <p>Residential Sales</p>
              <p>Land Sales</p>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-gray-500 mr-2">VERIFIED</span>
              <input type="checkbox" checked disabled className="h-5 w-5" />
            </div>
          </div>

          <div className=" w-50lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">LISTED PROPERTIES</h2>
            <div className="grid grid-cols-1 gap-6">
              {properties.map((property, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex">
                  <img className="h-32 w-32 rounded-lg mr-4" src={property.image} alt="Property" />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{property.price}</h3>
                      <p>{property.beds}</p>
                      <p>{property.baths}</p>
                      <p>{property.area}</p>
                      <p>{property.location}</p>                      
                    </div> 
                    <button className="bg-gray-500  text-white py-1 px-4 h-10 rounded-md">Details</button>                 

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentProfile;
