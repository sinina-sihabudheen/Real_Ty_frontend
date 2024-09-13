import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createLandProperty, createResidentialProperty } from '../../utils/api';
import { handleFetchAmenity } from '../../utils/auth'; 
import LeafletMap from '../../components/Map/LeafletMap';

const PropertyForm = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const user = useSelector(state => state.auth.user); 
  const navigate = useNavigate();
const [selectedImages, setSelectedImages] = useState([]); // Manage selected images

  const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleFetchAmenity(setAmenitiesOptions);
  }, []);

  const handleLocationChange = ({ name, latitude, longitude }) => {
    setValue('location', name);
    setValue('latitude', latitude);
    setValue('longitude', longitude);
  };
  
  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]); // Add new files to state
  };

const onSubmit = async (data) => {
    let propertyData = new FormData();

    propertyData.append('category', category);
    propertyData.append('area', data.area || '');
    propertyData.append('property_type', category);
    propertyData.append('description', data.description);
    propertyData.append('price', data.price);
    propertyData.append('location', data.location);
    propertyData.append('latitude', data.latitude);
    propertyData.append('longitude', data.longitude);
    propertyData.append('seller', user.id);
    propertyData.append('size', data.size || '');  
    propertyData.append('land_area', data.land_area || '');  
    propertyData.append('num_bathrooms', data.bathrooms || '');  
    propertyData.append('num_rooms', data.bedrooms || '');  

    data.amenities.forEach((amenity) => {
        propertyData.append('amenities', amenity.value);  
    });

    // const images = watch('images');
    // images.forEach(image => propertyData.append('new_images', image));
    selectedImages.forEach(image => {
      propertyData.append('new_images', image); // Appending images
    });

    if (data.video && data.video.length > 0) {
        const videoFile = data.video[0];
        propertyData.append('video', videoFile);  
    }

    for (let pair of propertyData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }
    try {
      if (category === 'Land') {
        await createLandProperty(propertyData);
      } else if (category === 'Apartment' || category === 'Villa') {
        await createResidentialProperty(propertyData);
      }
      alert('Property created successfully!');
      navigate('/listedproperties');
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
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Price in Lakhs</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Expected Price in Lakhs"
                  />
                  {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </label>
              )}
              rules={{ required: 'Price is required' }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <textarea
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Description in short"
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </label>
              )}
              rules={{ required: 'Description is required' }}
            />
            <Controller
              name="area"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Land Area in cents</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Area in Cents"
                  />
                  {errors.area && <p className="text-red-500">{errors.area.message}</p>}
                </label>
              )}
              rules={{ required: 'Area is required' }}
            />
            <Controller
              name="amenities"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Select Amenities</span>
                  <Select
                    isMulti
                    value={value}
                    onChange={onChange}
                    options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
                    className="w-full mb-4"
                    placeholder="Select Amenities"
                  />
                  {errors.amenities && <p className="text-red-500">{errors.amenities.message}</p>}
                </label>
              )}
              // rules={{ required: 'At least one amenity must be selected' }}
            />
            <label className="block">
              <span className="text-gray-700">Property Location</span>
              <LeafletMap onSelectLocation={handleLocationChange} />
            </label>
           
            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <>
                  <label className="block">
                    <span className="text-gray-700">Add Images (can add multiple images)</span>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      placeholder="Upload image"
                      multiple
                    />
                    {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                  </label>

                  {/* Display Thumbnails */}
                  <div className="image-preview grid grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index}`}
                          className="h-20 w-20 object-cover border rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            />

            <Controller
              name="video"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Add Video (can add 1 video)</span>
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files[0])}
                    accept="video/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Upload video"
                  />
                  {errors.video && <p className="text-red-500">{errors.video.message}</p>}
                </label>
              )}
            />
          </>
        );
      case 'Apartment':
        return (
          <>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Price in Lakhs</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Expected Price in Lakhs"
                  />
                  {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </label>
              )}
              rules={{ required: 'Price is required' }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <textarea
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Description in short"
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </label>
              )}
              rules={{ required: 'Description is required' }}
            />
            <Controller
              name="bedrooms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Number of Bedrooms</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Number of Bedrooms"
                  />
                  {errors.bedrooms && <p className="text-red-500">{errors.bedrooms.message}</p>}
                </label>
              )}
              rules={{ required: 'Number of bedrooms is required' }}
            />
            <Controller
              name="bathrooms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Number of Bathrooms</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Number of Bathrooms"
                  />
                  {errors.bathrooms && <p className="text-red-500">{errors.bathrooms.message}</p>}
                </label>
              )}
              rules={{ required: 'Number of bathrooms is required' }}
            />
            <Controller
              name="size"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Size in Square Feet</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Size in Square Feet"
                  />
                  {errors.size && <p className="text-red-500">{errors.size.message}</p>}
                </label>
              )}
              rules={{ required: 'Size is required' }}
            />
            <Controller
              name="amenities"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Select Amenities</span>
                  <Select
                    isMulti
                    value={value}
                    onChange={onChange}
                    options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
                    className="w-full mb-4"
                    placeholder="Select Amenities"
                  />
                  {errors.amenities && <p className="text-red-500">{errors.amenities.message}</p>}
                </label>
              )}
              // rules={{ required: 'At least one amenity must be selected' }}
            />
            <label className="block">
              <span className="text-gray-700">Property Location</span>
              <LeafletMap onSelectLocation={handleLocationChange} />
            </label>
           
            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <>
                  <label className="block">
                    <span className="text-gray-700">Add Images (can add multiple images)</span>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      placeholder="Upload image"
                      multiple
                    />
                    {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                  </label>

                  {/* Display Thumbnails */}
                  <div className="image-preview grid grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index}`}
                          className="h-20 w-20 object-cover border rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            />

            <Controller
              name="video"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Add Video (can add 1 video)</span>
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files[0])}
                    accept="video/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Upload video"
                  />
                  {errors.video && <p className="text-red-500">{errors.video.message}</p>}
                </label>
              )}
            />
          </>
        );
      case 'Villa':
        return (
          <>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Price in Lakhs</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Expected Price in Lakhs"
                  />
                  {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </label>
              )}
              rules={{ required: 'Price is required' }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <textarea
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Description in short"
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </label>
              )}
              rules={{ required: 'Description is required' }}
            />
            <Controller
              name="bedrooms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Number of Bedrooms</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Number of Bedrooms"
                  />
                  {errors.bedrooms && <p className="text-red-500">{errors.bedrooms.message}</p>}
                </label>
              )}
              rules={{ required: 'Number of bedrooms is required' }}
            />
            <Controller
              name="bathrooms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Number of Bathrooms</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Number of Bathrooms"
                  />
                  {errors.bathrooms && <p className="text-red-500">{errors.bathrooms.message}</p>}
                </label>
              )}
              rules={{ required: 'Number of bathrooms is required' }}
            />
             <Controller
              name="size"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Size in Square Feet</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Size in Square Feet"
                  />
                  {errors.size && <p className="text-red-500">{errors.size.message}</p>}
                </label>
              )}
              rules={{ required: 'Size is required' }}
            />
            <Controller
              name="land_area"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <label className="block">
                  <span className="text-gray-700">Land area in Cents</span>
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Area in Square Feet"
                  />
                  {errors.land_area && <p className="text-red-500">{errors.land_area.message}</p>}
                </label>
              )}
              rules={{ required: 'Land area is required' }}
            />
            <Controller
              name="amenities"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Select Amenities</span>
                  <Select
                    isMulti
                    value={value}
                    onChange={onChange}
                    options={amenitiesOptions.map(amenity => ({ value: amenity.id, label: amenity.name }))}
                    className="w-full mb-4"
                    placeholder="Select Amenities"
                  />
                  {errors.amenities && <p className="text-red-500">{errors.amenities.message}</p>}
                </label>
              )}
              rules={{ required: 'At least one amenity must be selected' }}
            />
            <label className="block">
              <span className="text-gray-700">Property Location</span>
              <LeafletMap onSelectLocation={handleLocationChange} />
            </label>
            
            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <>
                  <label className="block">
                    <span className="text-gray-700">Add Images (can add multiple images)</span>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      placeholder="Upload image"
                      multiple
                    />
                    {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                  </label>

                  {/* Display Thumbnails */}
                  <div className="image-preview grid grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index}`}
                          className="h-20 w-20 object-cover border rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            />

            <Controller
              name="video"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <label className="block">
                  <span className="text-gray-700">Add Video (can add 1 video)</span>
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files[0])}
                    accept="video/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Upload video"
                  />
                  {errors.video && <p className="text-red-500">{errors.video.message}</p>}
                </label>
              )}
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
    <h1 className="text-xl font-bold mb-4">Enter the {category} details here</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4" encType="multipart/form-data">
      {renderFormFields()}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <button
        type="button"
        onClick={() => navigate('/agentprofile')}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
    </div>
  );
};

export default PropertyForm;
