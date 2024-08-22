import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';

const PropertyLists = () => {
    const [villas, setVillas] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [lands, setLands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Lands');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleFetchLandsList(setLands, setIsLoading, setError);
                await handleFetchResidentsList((residents) => {
                    setVillas(residents.filter(r => r.property_type === 'Villa'));
                    setApartments(residents.filter(r => r.property_type === 'Apartment'));
                });
            } catch (error) {
                console.error('Error fetching property data:', error);
                setError('Error fetching property data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderProperties = (properties) => (
        <div className="p-4">
            <table className="w-full table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">SL No.</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">ID</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Seller</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Price</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Area</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Location</th>
                        <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">View</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property, index) => (
                        <tr key={index}>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{index + 1}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{property.id}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{property.seller.username}</td>

                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(property.price)}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(property.area)}</td>
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
            <div className="w-full py-8">
                <AdminHeader />
                <div className="w-3/4 bg-white">
                    <h2>Property Lists</h2>
                    <div className="p-4">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mb-4 px-4 py-2 border rounded"
                        >
                            <option value="Lands">Lands</option>
                            <option value="Villas">Villas</option>
                            <option value="Apartments">Apartments</option>
                        </select>
                        {selectedCategory === 'Lands' && renderProperties(lands)}
                        {selectedCategory === 'Villas' && renderProperties(villas)}
                        {selectedCategory === 'Apartments' && renderProperties(apartments)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyLists;

