import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { createLandProperty, createResidentialProperty } from '../../utils/api';
import { handleFetchAmenity } from '../../utils/auth'; 

const PropertyForm = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const user = useSelector(state => state.auth.user); 
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    area: '',
    amenities: [],
    location: '',
    images: [],
    video: null,
    numRooms: '',
    numBathrooms: '',
    size: '',
    landArea: '',
  });

  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleFetchAmenity(setAmenitiesOptions);
  }, []);

  

  // const handleInputChange = (e) => {
  //   const { name, files } = e.target;
  
  //   if (name === 'images') {
  //     setFormData({
  //       ...formData,
  //       [name]: files,  
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: files ? files[0] : e.target.value,  
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setFormData({
        ...formData,
        images: [...formData.images, ...files]
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : e.target.value,
      });
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleDeleteVideo = () => {
    setFormData({ ...formData, video: null });
  };

  const handleCancel = () => {
  navigate('/agentprofile') 
  };
  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      amenities: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const propertyData = new FormData();
   
    propertyData.append('category', category);  
    propertyData.append('area', formData.area || '');  
    propertyData.append('property_type', category || '');  
    propertyData.append('description', formData.description || '');  
    propertyData.append('num_rooms', formData.numRooms || '');  
    propertyData.append('num_bathrooms', formData.numBathrooms || '');  
    propertyData.append('price', formData.price || '');
    propertyData.append('location', formData.location || '');
    propertyData.append('size', formData.size || '');
    propertyData.append('land_area', formData.landArea || '');
    propertyData.append('seller', user.id || '');   

    formData.amenities.forEach(amenity => propertyData.append('amenities[]', amenity.value)); 
    formData.images.forEach(image => propertyData.append('new_images', image));
    
    // if (formData.images.length > 0) {
    //   Array.from(formData.images).forEach(image => propertyData.append('new_images', image));
    // }

    if (formData.video) {
      propertyData.append('video', formData.video);
    }
    
    try {
      if (category === 'Land') {
        console.log("DATA ",propertyData);

        await createLandProperty(propertyData);
      } else if (category === 'Apartment' || category === 'Villa') {
        console.log("DATA ",propertyData);
        await createResidentialProperty(propertyData)
      }
      alert('Property created successfully!');
      navigate('/listedproperties')
    } catch (error) {
      console.error('Failed to create property:', error);
      setError('Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (category) {
      case 'Land':
        return (
          <>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Expected Price in Lakhs" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Description in short"></textarea>
            <input type="text" name="area" value={formData.area} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Area in Cents" />
            <Select
              name="amenities"
              value={formData.amenities}
              onChange={handleSelectChange}
              options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
              isMulti
              className="w-full mb-4"
              placeholder="Select Amenities"
            />
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Location" />
            <input 
              type="file" 
              name="images" 
              onChange={handleInputChange} 
              accept="image/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload image" 
              multiple
              required 
            />            
            <input 
              type="file" 
              name="video" 
              onChange={handleInputChange} 
              accept="video/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload video" 
            />
            {formData.images && formData.images.map((image, index) => (
              <div key={index} className="relative inline-block mr-2">
                <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="w-16 h-16 object-cover" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                  onClick={() => handleDeleteImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            {formData.video && (
              <div className="relative inline-block mt-4">
                <video
                  width="320"
                  height="240"
                  controls
                >
                  <source src={URL.createObjectURL(formData.video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                  onClick={handleDeleteVideo}
                >
                  &times;
                </button>
              </div>
            )}
          </>
        );
      case 'Apartment':
        return (
          <>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Price" />
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Location" />
            <input type="number" name="numRooms" value={formData.numRooms} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Number of Rooms" />
            <input type="number" name="numBathrooms" value={formData.numBathrooms} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Number of Bathrooms" />
            <input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Size in Square Feet" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Description in short"></textarea>

            <Select
              name="amenities"
              value={formData.amenities}
              onChange={handleSelectChange}
              options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
              isMulti
              className="w-full mb-4"
              placeholder="Select Amenities"
            />
            <input 
              type="file" 
              name="images" 
              onChange={handleInputChange} 
              accept="image/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload image" 
              multiple
              required
            />
            <input 
              type="file" 
              name="video" 
              onChange={handleInputChange} 
              accept="video/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload video" 
            />
           
          </>
        );
      case 'Villa':
        return (
          <>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Price" />
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Location" />
            <input type="number" name="numRooms" value={formData.numRooms} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Number of Rooms" />
            <input type="number" name="numBathrooms" value={formData.numBathrooms} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Number of Bathrooms" />
            <input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Size in Square Feet" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Description in short"></textarea>

            <Select
              name="amenities"
              value={formData.amenities}
              onChange={handleSelectChange}
              options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
              isMulti
              className="w-full mb-4"
              placeholder="Select Amenities"
            />
            <input type="text" name="landArea" value={formData.landArea} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Land Area" required/>
            <input 
              type="file" 
              name="images" 
              onChange={handleInputChange} 
              accept="image/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload image" 
              multiple
              required
            />
            
            <input 
              type="file" 
              name="video" 
              onChange={handleInputChange} 
              accept="video/*" 
              className="w-full px-4 py-2 border border-gray-300 rounded" 
              placeholder="Upload video" 
            />
           
          </>
        );
     
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4">
        <img src="/images/REAL-TY.png" alt="Realty Logo" className="w-24 h-24" />
      </div>
      <h1 className="text-xl font-bold mb-4">Enter the {category} details here..</h1>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        {renderFormFields()}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between">
          {/* <button type="button" className="px-4 py-2 bg-red-500 text-white rounded">CANCEL</button> */}
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>

        </div>
      </form>
    </div>
  );
};

export default PropertyForm;