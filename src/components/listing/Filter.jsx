
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    price: '',
    region: ''
  });

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [type]: value
    }));
    onFilterChange(type, value);
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">FILTER</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        <div>
          {['All', 'Apartment', 'Villa', 'Land'].map(category => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.category === category}
                onChange={() => handleFilterChange('category', category)}
                className="form-checkbox rounded h-4 w-4"
              />
              <label className="ml-2">{category}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Price</h3>
        <div>
          {['Below 25 lakhs', '25 to 40 lakhs', '40 to 60 lakhs', '60 to 80 lakhs', '80 lakhs and Above'].map(price => (
            <div key={price} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.price === price}
                onChange={() => handleFilterChange('price', price)}
                className="form-checkbox rounded h-4 w-4"
              />
              <label className="ml-2">{price}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Region</h3>
        <div>
          {['Malappuram', 'Kannur', 'Kozhikode'].map(region => (
            <div key={region} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.region === region}
                onChange={() => handleFilterChange('region', region)}
                className="form-checkbox rounded h-4 w-4"
              />
              <label className="ml-2">{region}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
