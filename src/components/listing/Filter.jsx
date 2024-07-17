import React from 'react';
import { handleFetchRegions } from '../../utils/auth';
import { useState, useEffect } from 'react';


const Filter = () => {
    const [regions, setRegions] = useState([]);

  useEffect(() => {
    handleFetchRegions(setRegions);
  }, []);

  return (
    // <aside className="w-1/4 p-4 border-r border-gray-200">
    
    <div className="w-1/4 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold">Filter</h2>
      <div className="mt-4">
        <h3 className="font-semibold">Category</h3>
        <div>
          <input type="checkbox" id="all" />
          <label htmlFor="all" className="ml-2">All</label>
        </div>
        <div>
          <input type="checkbox" id="apartments" />
          <label htmlFor="apartments" className="ml-2">Apartments</label>
        </div>
        <div>
          <input type="checkbox" id="villas" />
          <label htmlFor="villas" className="ml-2">Houses/Villas</label>
        </div>
        <div>
          <input type="checkbox" id="lands" />
          <label htmlFor="lands" className="ml-2">Lands</label>
        </div>      
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Price</h3>
        <div>
          <input type="checkbox" id="below-20-lakhs" />
          <label htmlFor="below-20-lakhs" className="ml-2">Below 20 lakhs</label>
        </div>
        <div>
          <input type="checkbox" id="20-50-lakhs" />
          <label htmlFor="20-50-lakhs" className="ml-2">20 to 50 lakhs</label>
        </div>
        <div>
          <input type="checkbox" id="50-75-lakhs" />
          <label htmlFor="50-75-lakhs" className="ml-2">50 to 75 lakhs</label>
        </div>
        <div>
          <input type="checkbox" id="above-75-lakhs" />
          <label htmlFor="above-75-lakhs" className="ml-2">Above 75 lakhs</label>
        </div>
     
      </div>

      
        <div className="mt-4">
        <h3 className="font-semibold">Region</h3>
        {regions.map((region) => (
          <div key={region.slug}>
            <input type="checkbox" id={region.slug} />
            <label htmlFor={region.slug} className="ml-2">{region.name}</label>
          </div>
        ))}
      </div>

     
      </div>
  );
};

export default Filter;
