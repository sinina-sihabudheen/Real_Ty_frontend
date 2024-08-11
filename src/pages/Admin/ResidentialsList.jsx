
import React, { useEffect, useState } from 'react';
import { handleFetchResidentsList } from '../../utils/adminAuth';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { useParams } from 'react-router-dom';

const ResidentialsList = () => {
    const { propertyType } = useParams();
    const [villas, setVillas] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("propertyType:", propertyType);  

        const fetchResidents = async () => {
            try {
                await handleFetchResidentsList((residents) => {
                    setVillas(residents.filter(r => r.property_type === 'Villa'));
                    setApartments(residents.filter(r => r.property_type === 'Apartment'));
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching residential properties:', error);
                setError('Error fetching residential properties');
                setIsLoading(false);
            }
        };

        fetchResidents();
    }, [propertyType]);
    console.log("VILLAS:",villas);
    console.log("APARTMENTS",apartments);
    const renderProperties = (properties) => (
        <div className="p-4">
            <table className="w-full table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">SL No.</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">ID</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Seller</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Price</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Size (sqft)</th> 
                        {propertyType === 'Villa' && <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Land Area</th>} {/* Conditional header */}
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Location</th>
                        <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">View</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property, index) => (
                        <tr key={index}>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{index + 1}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{property.id}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{property.seller.user.username}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(property.price)}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(property.size)}</td> 
                            {propertyType === 'Villa' && <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(property.land_area)}</td>} {/* Conditional field */}
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{property.location}</td>
                            <td className="px-4 border-gray-400 bg-gray-200 shadow-md py-2 border">
                                <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="grid">
                <AdminHeader />
                <div className="w-3/4 bg-white">                 
                    <h2 className='text-gray-600 font-semibold text-xl'>{propertyType}s List</h2>
                    {propertyType === 'Villa' ? renderProperties(villas) : renderProperties(apartments)}
                </div>
            </div>
        </div>
    );
};

export default ResidentialsList;
