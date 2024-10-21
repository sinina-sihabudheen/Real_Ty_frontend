import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLandPropertyDetails, getResidentialPropertyDetails, updateLandProperty, updateResidentialProperty } from '../../utils/api';
import { handleFetchAmenity } from '../../utils/auth';

const EditProperty = () => {
  const { id, category } = useParams(); 
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    area: '',
    location: '',
    images: [],
    video: null,
    numRooms: '',
    numBathrooms: '',
    size: '',
    landArea: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({}); 

  useEffect(() => {
    // handleFetchAmenity(setAmenitiesOptions);

    const fetchPropertyDetails = async () => {
      try {
        if (category === 'Land') {
          const { data } = await getLandPropertyDetails(id);
          setFormData(data);
        } else if (category === 'Apartment' || category === 'Villa') {
          const { data } = await getResidentialPropertyDetails(id);
          setFormData(data);
        }
      } catch (err) {
        console.error('Failed to fetch property details:', err);
        setError('Failed to fetch property details');
      }
    };

    fetchPropertyDetails();
  }, [id, category]);

 

//   const handleInputChange = (e) => {
//     const { name, files } = e.target;
//     if (name === 'images') {
//         const filesArray = Array.from(files);
//         setFormData({
//             ...formData,
//             images: filesArray
//         });
//     } else {
//         setFormData({
//             ...formData,
//             [name]: files ? files[0] : e.target.value,
//         });
//     }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFormErrors({}); 
  
    const propertyData = new FormData();

    if (category) propertyData.append('category', category || '');
    if (formData.price) propertyData.append('price', formData.price || '');
    if (formData.description) propertyData.append('description', formData.description || '');
    propertyData.append('property_type', category || '');  

    if (formData.area) propertyData.append('area', formData.area || '');
    
    if (formData.location) propertyData.append('location', formData.location || '');

    propertyData.append('location', formData.location || '');

    formData.images.forEach(image => propertyData.append('new_images', image));
    

    if (formData.video) {
      propertyData.append('video', formData.video);
    }
    if (category !== 'Land') {
      if (formData.numRooms) propertyData.append('num_rooms', parseInt(formData.numRooms) || '');
      if (formData.numBathrooms) propertyData.append('num_bathrooms', parseInt(formData.numBathrooms) || '');
      if (formData.size) propertyData.append('size', formData.size || '');
      if (formData.landArea) propertyData.append('land_area', formData.landArea || '');
    }
    propertyData.append('seller', user.id || '');

    for (let pair of propertyData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
 
    try {
      let updateResponse;
      if (category === 'Land') {
         updateResponse = await updateLandProperty(id, propertyData);
      } else if (category === 'Apartment' || category === 'Villa') {
         updateResponse = await updateResidentialProperty(id, propertyData);
      }

      if (updateResponse) {
          navigate('/listedproperties');
      }
  } catch (error) {
      console.error('Failed to update property:', error);
      setError('Failed to update property');
   
  } finally {
      setLoading(false);
  }
};


  const renderFormFields = () => {
    switch (category) {
      case 'Land':
        return (
          <>
          <label htmlFor="price" className="block text-gray-700">Price
          <input 
            type="number" 
            id="price"
            name="price" 
            value={Math.round(formData.price)} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Expected Price in Lakhs" />
          </label>
          <label htmlFor="description" className="block text-gray-700">Description
          <textarea 
            id="description"
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Description in short"></textarea>
          </label>
          <label htmlFor="area" className="block text-gray-700">Area
          <input 
            type="text" 
            id="area"
            name="area" 
            value={Math.round(formData.area)} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Area in Cents" />
          </label>
          
          {/* <label htmlFor="location" className="block text-gray-700">Location
          <input 
            type="text" 
            id="location"
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Location" />
          </label> */}
          <label htmlFor="video" className="block text-gray-700">Images
              <input 
                type="file" 
                name="images" 
                onChange={handleInputChange} 
                accept="image/*" 
                className="w-full px-4 py-2 border border-gray-300 rounded" 
                placeholder="Upload image" 
                multiple
              />
            </label>
          <label htmlFor="video" className="block text-gray-700">Video
          <input 
            type="file" 
            id="video"
            name="video" 
            onChange={handleInputChange} 
            accept="video/*" 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Upload video" />
          </label>
        </>
      );
    case 'Apartment':
      return (
        <>
          <label htmlFor="price" className="block text-gray-700">Price
          <input 
            type="number" 
            id="price"
            name="price" 
            value={Math.round(formData.price)} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Price" />
          </label>
          <label htmlFor="location" className="block text-gray-700">Location
          <input 
            type="text" 
            id="location"
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Location" />
          </label>
          <label htmlFor="numRooms" className="block text-gray-700">Number of Rooms
          <input 
            type="number" 
            id="numRooms"
            name="numRooms" 
            value={formData.numRooms} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Number of Rooms" />
          </label>
          <label htmlFor="numBathrooms" className="block text-gray-700">Number of Bathrooms
          <input 
            type="number" 
            id="numBathrooms"
            name="numBathrooms" 
            value={formData.numBathrooms} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Number of Bathrooms" />
          </label>
          <label htmlFor="size" className="block text-gray-700">Size
          <input 
            type="text" 
            id="size"
            name="size" 
            value={formData.size} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Size (in sq ft)" />
          </label>
          
          <label htmlFor="video" className="block text-gray-700">Images
              <input 
                type="file" 
                name="images" 
                onChange={handleInputChange} 
                accept="image/*" 
                className="w-full px-4 py-2 border border-gray-300 rounded" 
                placeholder="Upload image" 
                multiple
              />
            </label>
          <label htmlFor="video" className="block text-gray-700">Video
          <input 
            type="file" 
            id="video"
            name="video" 
            onChange={handleInputChange} 
            accept="video/*" 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Upload video" />
          </label>
        </>
      );
    case 'Villa':
      return (
        <>
          <label htmlFor="price" className="block text-gray-700">Price
          <input 
            type="number" 
            id="price"
            name="price" 
            value={Math.round(formData.price)} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Price" />
          </label>
          <label htmlFor="location" className="block text-gray-700">Location
          <input 
            type="text" 
            id="location"
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Location" />
          </label>
          <label htmlFor="numRooms" className="block text-gray-700">Number of Rooms
          <input 
            type="number" 
            id="numRooms"
            name="numRooms" 
            value={formData.numRooms} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Number of Rooms" />
          </label>
          <label htmlFor="numBathrooms" className="block text-gray-700">Number of Bathrooms
          <input 
            type="number" 
            id="numBathrooms"
            name="numBathrooms" 
            value={formData.numBathrooms} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Number of Bathrooms" />
          </label>
          <label htmlFor="size" className="block text-gray-700">Size
          <input 
            type="text" 
            id="size"
            name="size" 
            value={formData.size} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Size (in sq ft)" />
          </label>
          
          <label htmlFor="video" className="block text-gray-700">Images
              <input 
                type="file" 
                name="images" 
                onChange={handleInputChange} 
                accept="image/*" 
                className="w-full px-4 py-2 border border-gray-300 rounded" 
                placeholder="Upload image" 
                multiple
              />
            </label>
          <label htmlFor="video" className="block text-gray-700">Video
          <input 
            type="file" 
            id="video"
            name="video" 
            onChange={handleInputChange} 
            accept="video/*" 
            className="w-full px-4 py-2 border border-gray-300 rounded" 
            placeholder="Upload video" />
          </label>
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
      <h1 className="text-xl font-bold mb-4">Edit your {category} Property details</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4'>
        {renderFormFields()}
        {formErrors && Object.keys(formErrors).length > 0 && (
          <div className="error-messages">
            {Object.entries(formErrors).map(([field, message]) => (
              <p key={field}>{message}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Property'}
        </button>
      
      </form>
    </div>
  );
};
 
export default EditProperty;
