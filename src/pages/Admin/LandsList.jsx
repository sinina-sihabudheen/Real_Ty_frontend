import React, { useEffect, useState } from 'react';
import { handleFetchLandsList } from '../../utils/adminAuth';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';

const LandsList = () => {
    const [lands, setLands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLands = async () => {
            try {
                await handleFetchLandsList(setLands, setIsLoading, setError);
            } catch (error) {
                console.error('Error fetching lands:', error);
                setError('Error fetching lands');
                setIsLoading(false);
            }
        };

        fetchLands();
    }, []);

    const renderLands = () => (
        <div className="p-4">
            <table className="w-full table-auto border-collapse border border-gray-100">
                <thead>
                    <tr>
                        {/* <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">SL No.</th> */}
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">ID</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Seller</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Price</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Area</th>
                        <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Location</th>
                        {/* <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">View</th> */}
                    </tr>
                </thead>
                <tbody>
                    {lands.map((land, index) => (
                        <tr key={index}>
                            {/* <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{index + 1}</td> */}
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{land.id}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{land.seller.username}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(land.price)}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{Math.round(land.area)}</td>
                            <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{land.location}</td>
                            {/* <td className="px-4 border-gray-400 bg-gray-200 shadow-md py-2 border">
                                <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded">
                                    View
                                </button>
                            </td> */}
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
                    <h2 className='text-gray-600 font-semibold text-xl'>Lands List</h2>
                    {renderLands()}
                </div>
            </div>
        </div>
    );
};

export default LandsList;
