import React, { useState,useEffect } from 'react';
import { handleFetchRegions } from '../utils/auth';

const company_navigation = [
  { name: 'About Us', href: '#' },
  { name: 'Terms of Use', href: '#' },
  { name: 'Advertise', href: '#' },
  { name: 'Privacy Policy', href: '#' }
];

const social_navigation = [
  { name: 'Facebook', href: '#'},
  { name: 'Instagram', href: '#'}
];

const support_navigation = [
  { name: 'Help (Text Chat)', href: '#' }
];

const Footer = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    handleFetchRegions(setRegions);
  }, []);

  return (
    <div className='bg-gray-300 p-6 w-full'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="flex flex-col items-start">
          <img
            className="h-20 w-20 md:h-40 md:w-40 mb-4"
            src="/images/REAL-TY.png"
            alt="Real-Ty"
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-600 mb-4">Company</h4>
          {company_navigation.map((item) => (
            <a key={item.name} href={item.href} className="block text-gray-500 hover:text-gray-700 mb-2">
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-600 mb-4">Regions</h4>
          {regions.map((item) => (
            <a key={item.name} href={item.href} className="block text-gray-500 hover:text-gray-700 mb-2">
              {item.name}
            </a>
            
          ))}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-600 mb-4">Get Social</h4>
          {social_navigation.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center text-gray-500 hover:text-gray-700 mb-2">
              <span className="mr-2"></span> {item.name}
            </a>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-600 mb-4">Support</h4>
          {support_navigation.map((item) => (
            <a key={item.name} href={item.href} className="block text-gray-500 hover:text-gray-700 mb-2">
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
