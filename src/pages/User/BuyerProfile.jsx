import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


const BuyerProfile = () => {
  return (
    <div>
      <Navbar />  
      <h2 className='text-xl font-bold'>Profile Settings</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
      <div className="bg-gray shadow-lg rounded-lg p-8 flex-1">
            <h3 className="text-x font-bold text-gray-800 mb-4">
              My Profile
            </h3>           
            <h3 className="text-2l font-bold text-gray-800 mb-4">
              Security
            </h3>
          </div>
          </div>
          </div>

      <Footer/>
    </div>
  )
}
export default BuyerProfile
