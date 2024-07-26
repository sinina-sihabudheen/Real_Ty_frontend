import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchRegions } from '../../utils/adminAuth';


const RegionsList = () => {
    const [regions, setRegions] = useState([]);


    useEffect(() => {
        handleFetchRegions(setRegions);
      }, []);
    return (

        <div className="flex">
            <Sidebar />
        <div className='grid'>
        <AdminHeader />
       
        <div className="w-3/4 bg-white">
            <h2>All Regions</h2>
            <div className="p-4">
            <table className="w-full bg-gray-100 table-auto border-collapse border border-gray-400">
                <thead>        
                    <tr>
                        <th className="border px-4 py-2">SL No.</th>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Region Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {regions.map((region, index) => ( 
                <tr key={index}>                       
                    <td className="border px-4 py-2">{index+1}</td>
                    <td className="border px-4 py-2">{region.id}</td>
                    <td className="border px-4 py-2">{region.name}</td>
                 

                    <td className="border px-4 py-2">             
                        <button className="bg-red-400 w-full hover:bg-red-300 text-white font-bold py-2 px-4 rounded" >
                            Delete
                        </button>    
                        <button className="bg-blue-400 w-full hover:bg-red-300 text-white font-bold py-2 px-4 rounded" >
                            Block
                        </button>               
                        
                    </td>
                </tr>
                
                ))}
                </tbody>
            </table>
            </div>           
            </div>
        </div>
        </div>
  )
}
export default RegionsList






