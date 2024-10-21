
import React, { useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { handleFetchRegions } from '../../utils/auth';

const Home = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    handleFetchRegions(setRegions);
  }, []);
  const navigation = regions.map((region) => ({
    name: region.name,
    href: `#${region.slug}`, 
  }));

  return (
    <>
      <Navbar />
      
      <div>
        <div>
          <img
            className="w-full h-[300px] object-cover"
            src="/images/building.jpg"
            alt="homepage cover image"
          />
        </div>
        
        <div className="relative bottom-12 left-0 right-0 sm:ml-6">
          <div className="flex justify-center space-x-14">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="border-gray-500 rounded bg-gray-600 hover:bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-20  p-8"
              >
                <a
                  href={item.href}
                  className="text-white hover:text-gray-600 text-lg  px-3 py-2 font-medium"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-center text-2xl text-gray-600 ">
            Make Your Dream Through REAL-TY
          </p>
        </div>
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              <div className="bg-white shadow-lg rounded-lg p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Discover Your Dream Home:
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore premier properties, expert advice, and seamless
                  transactions with REAL-TY.
                </p>
                <p className="text-gray-600">
                  Your perfect home awaits!{" "}
                  <span className="inline-block ml-2">&#127968;</span>
                </p>
              </div>
              <div className="flex-1 lg:ml-8">
                <a href="#">
                  <img
                    className="w-full h-auto rounded-lg"
                    src="public/images/adv.png"
                    alt="Banner Template"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
