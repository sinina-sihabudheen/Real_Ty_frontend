import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { getLandPropertyDetails, getResidentialPropertyDetails, updateLandProperty, updateResidentialProperty } from '../../utils/api';
import { handleFetchAmenity } from '../../utils/auth';

const EditProperty = () => {
  const { id, category } = useParams(); // Get id and category from URL params
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    area: '',
    amenities: [],
    location: '',
    images: null,
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
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
    formData.amenities.forEach(amenity => propertyData.append('amenities', amenity.value));
    propertyData.append('price', formData.price || '');
    propertyData.append('location', formData.location || '');
    propertyData.append('images', formData.images || '');
    propertyData.append('video', formData.video || '');
    propertyData.append('size', formData.size || '');
    propertyData.append('land_area', formData.landArea || '');
    propertyData.append('seller', user.id || '');

    try {
      if (category === 'Land') {
        await updateLandProperty(id, propertyData);
      } else if (category === 'Apartment' || category === 'Villa') {
        await updateResidentialProperty(id, propertyData);
      }
      alert('Property updated successfully!');
      navigate('/listedproperties');
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
            <input type="file" name="images" onChange={handleInputChange} accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload image" />
            <input type="file" name="video" onChange={handleInputChange} accept="video/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload video" />
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
            <input type="file" name="images" onChange={handleInputChange} accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload image" />
            <input type="file" name="video" onChange={handleInputChange} accept="video/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload video" />
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
            <input type="file" name="images" onChange={handleInputChange} accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload image" />
            <input type="file" name="video" onChange={handleInputChange} accept="video/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload video" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Property</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
