

import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    price: '',
    area: ''
  });

  // Handle category change
  const handleCategoryChange = (category) => {
    const newCategory = selectedFilters.category === category ? '' : category;
    setSelectedFilters(prevState => ({
      ...prevState,
      category: newCategory
    }));
    onFilterChange('category', newCategory);
  };

  // Handle price range change
  const handlePriceChange = (priceRange) => {
    const newPrice = selectedFilters.price === priceRange ? '' : priceRange;
    setSelectedFilters(prevState => ({
      ...prevState,
      price: newPrice
    }));
    onFilterChange('price', newPrice);
  };

  // Handle area range change
  const handleAreaChange = (areaRange) => {
    const newArea = selectedFilters.area === areaRange ? '' : areaRange;
    setSelectedFilters(prevState => ({
      ...prevState,
      area: newArea
    }));
    onFilterChange('area', newArea);
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">FILTER</h2>
      
      {/* Category Radio Buttons */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        <div>
          {['All', 'Apartment', 'Villa', 'Land'].map(category => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="radio"
                name="category"
                checked={selectedFilters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="ml-2">{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Radio Buttons */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price</h3>
        <div>
          {['Below 25 lakhs', '25 to 40 lakhs', '40 to 60 lakhs', '60 to 80 lakhs', '80 lakhs and Above'].map(price => (
            <div key={price} className="flex items-center mb-2">
              <input
                type="radio"
                name="price"
                checked={selectedFilters.price === price}
                onChange={() => handlePriceChange(price)}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="ml-2">{price}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Area Range Radio Buttons */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Area</h3>
        <div>
          {['Below 10 cents', '10 to 20 cents', '20 to 40 cents', '40 to 60 cents', '60 to 80 cents', '80 cents and Above'].map(area => (
            <div key={area} className="flex items-center mb-2">
              <input
                type="radio"
                name="area"
                checked={selectedFilters.area === area}
                onChange={() => handleAreaChange(area)}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="ml-2">{area}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
