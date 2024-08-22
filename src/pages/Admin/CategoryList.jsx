// import React from 'react'
// import { useEffect, useState } from 'react'
// import { toast } from 'sonner';
// import Sidebar from '../../components/admindash/SideBar';
// import AdminHeader from '../../components/admindash/AdminHeader';
// import { handleFetchCategory,
//         handleCategoryAdd,
//         handleCategoryDelete
//     } from '../../utils/adminAuth';

// const CategoryList = () => {
//     const [category, setCategory] = useState([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [newCategoryName, setNewCategoryName] = useState('');
//     const [deleteCategoryId, setDeleteCategoryId] = useState(null);

//     useEffect(() => {
//         handleFetchCategory(setCategory);
//       }, []);

//     const toggleAddForm = () => {
//         setShowAddForm(!showAddForm);
//       };
    
//     const handleAddCategory = async (e) => {
//         e.preventDefault();
//         try {
          
//           const response = await handleCategoryAdd({name : newCategoryName});
//           setCategory([...category, response.data]);
//           toast.success('Category added successfully');
//           setShowAddForm(false);
//           setNewCategoryName('');
//         } catch (error) {
//           toast.error('Failed to add category');
//         }
//       };
    
//     const confirmDeleteCategory = async () => {
//         try {
//           await handleCategoryDelete(deleteCategoryId);
//           setCategory(category.filter(category => category.id !== deleteCategoryId));
//           toast.success('Category deleted successfully');
//           setDeleteCategoryId(null);
//         } catch (error) {
//           toast.error('Failed to delete category');
//         }
//       };

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className='w-full py-8'>
//                 <AdminHeader />
            
//                 <div className="w-3/4 bg-white">
//                     <div className='flex justify-between items-center px-10 py-4'>
//                         <h2 className='text-gray-600 font-semibold text-xl'>
//                         All Categories
//                         </h2>
//                         <button
//                         onClick={toggleAddForm}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                         Add New
//                         </button>
//                     </div>   

//                 {showAddForm && (
//                 <div className="p-4 mt-4 bg-gray-200 rounded shadow-md">
//                     <form onSubmit={handleAddCategory}>
//                         <label className="block text-gray-700 font-bold mb-2">
//                         Category Name:
//                         </label>
//                         <input
//                         type="text"
//                         value={newCategoryName}
//                         onChange={(e) => setNewCategoryName(e.target.value)}
//                         className="w-full px-3 py-2 border rounded shadow-sm"
//                         required
//                         />
//                         <button
//                         type="submit"
//                         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                         Add Category
//                         </button>
//                         <button
//                         type="button"
//                         onClick={toggleAddForm}
//                         className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                         Cancel
//                         </button>
//                     </form>
//                     </div>
//                 )}
//                     <div className="p-4">
//                     <table className="w-full  table-auto border-collapse border border-gray-400">
//                         <thead>        
//                             <tr>
//                                 {/* <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">SL No.</th> */}
//                                 <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">ID</th>
//                                 <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Category Name</th>
//                                 <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         {category.map((category, index) => ( 
//                         <tr key={index}>                       
//                             {/* <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{index+1}</td> */}
//                             <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{category.id}</td>
//                             <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{category.name}</td>
                        

//                             <td className="border  flex space-x-4 bg-gray-200 border-gray-300 shadow-md px-4 py-2">             
//                             <button
//                                 onClick={() => setDeleteCategoryId(category.id)}
//                                 className="bg-red-400 w-2/6 hover:bg-red-600 text-white font-bold py-2 px-4 ml-36 rounded"
//                             >
//                                 Delete
//                             </button>
//                                 {/* <button className="bg-blue-400 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" >
//                                     Block
//                                 </button>             */}
//                             </td>
//                         </tr>
                        
//                         ))}
//                         </tbody>
//                     </table>
//                     </div>   
//                     {/* Delete Confirmation Popup */}
//                         {deleteCategoryId && (
//                             <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                             <div className="bg-white p-6 rounded shadow-md">
//                                 <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//                                 <p>Are you sure you want to delete this category?</p>
//                                 <div className="flex justify-end space-x-4 mt-4">
//                                 <button
//                                     onClick={confirmDeleteCategory}
//                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Confirm
//                                 </button>
//                                 <button
//                                     onClick={() => setDeleteCategoryId(null)}
//                                     className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                                 </div>
//                             </div>
//                             </div>
//                         )}        
//                 </div>
//             </div>
//         </div>
//   )
// }
// export default CategoryList

import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchCategory, handleCategoryAdd, handleCategoryDelete } from '../../utils/adminAuth';

const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    useEffect(() => {
        handleFetchCategory(setCategory);
    }, []);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await handleCategoryAdd({ name: newCategoryName });
            setCategory([...category, response.data]);
            toast.success('Category added successfully');
            setShowAddForm(false);
            setNewCategoryName('');
        } catch (error) {
            toast.error('Failed to add category');
        }
    };

    const confirmDeleteCategory = async () => {
        try {
            await handleCategoryDelete(deleteCategoryId);
            setCategory(category.filter((cat) => cat.id !== deleteCategoryId));
            toast.success('Category deleted successfully');
            setDeleteCategoryId(null);
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full py-8">
                <AdminHeader />

                {/* Main content wrapper */}
                <div className="relative">
                    <div className={`transition-all duration-300 ${showAddForm ? 'blur-sm' : ''}`}>
                        <div className="w-3/4 bg-white">
                            <div className='flex justify-between items-center px-10 py-4'>
                                <h2 className='text-gray-600 font-semibold text-xl'>
                                    All Categories
                                </h2>
                                <button
                                    onClick={toggleAddForm}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add New
                                </button>
                            </div>

                            <div className="p-4">
                                <table className="w-full table-auto border-collapse border border-gray-400">
                                    <thead>
                                        <tr>
                                            <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">ID</th>
                                            <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Category Name</th>
                                            <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.map((cat, index) => (
                                            <tr key={index}>
                                                <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{cat.id}</td>
                                                <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{cat.name}</td>
                                                <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">
                                                    <button
                                                        onClick={() => setDeleteCategoryId(cat.id)}
                                                        className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {deleteCategoryId && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                                        <p>Are you sure you want to delete this category?</p>
                                        <div className="flex justify-end space-x-4 mt-4">
                                            <button
                                                onClick={confirmDeleteCategory}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteCategoryId(null)}
                                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {showAddForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
                            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full z-50">
                                <h2 className="text-lg font-bold mb-4">Add New Category</h2>
                                <form onSubmit={handleAddCategory}>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Category Name:
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded shadow-sm"
                                        required
                                    />
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Add Category
                                        </button>
                                        <button
                                            type="button"
                                            onClick={toggleAddForm}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
