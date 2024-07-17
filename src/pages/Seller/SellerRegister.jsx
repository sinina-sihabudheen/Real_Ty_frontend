import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { handleFetchRegions, handleUpdateRole } from '../../utils/auth';

const SellerRegister = ({ isBuyer }) => {
    const [agencyName, setAgencyName] = useState('');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [regions, setRegions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        handleFetchRegions(setRegions);
    }, []);

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const postData = {
            is_seller: true,
            agency_name: agencyName,
            regions: selectedRegions.map(region => region.id),
        };

        handleUpdateRole(postData)
            .then(() => {
                toast.success('Registration successful!');
                navigate('/listedproperties'); 
            })
            .catch((error) => {
                toast.error('Registration failed. Please try again.');
                console.error('Registration error:', error);
            });
    };

    const handleRegionChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        const selectedRegions = regions.filter(region => selectedIds.includes(region.id));
        setSelectedRegions(selectedRegions);
    };

    if (!isBuyer) return null; // Only show the form if the user is a buyer

    return (
        <div className="flex justify-center items-center min-h-screen max-h-full py-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <img src="public/images/loginlogo.png" alt="Login Illustration" className="mx-auto h-20  mb-4" />
                    <h2 className="text-2xl font-semibold">Register Here</h2>
                </div>
                <form onSubmit={handleRegisterSubmit}>
                    <div>
                        <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Agency Name"
                                className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                                value={agencyName}
                                onChange={(e) => setAgencyName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 flex items-center border rounded-md px-4 py-2">
                            <select
                                multiple
                                value={selectedRegions.map(region => region.id)}
                                onChange={handleRegionChange}
                                className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            >
                                {regions.map(region => (
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerRegister;
