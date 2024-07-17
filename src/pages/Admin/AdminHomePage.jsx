import React from 'react'
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import StatsCard from '../../components/admindash/StatsCard';
import DashBoardChart from '../../components/admindash/DashBoardChart';

const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin</h1>
      <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100">
        <AdminHeader />
        <div className="flex flex-wrap space-y-4">
          <div className="w-full flex flex-wrap space-x-4">
            <StatsCard title="Total Listings" value="750" />
            <StatsCard title="Total Properties" value="500" />
            <StatsCard title="Total Cars" value="250" />
          </div>
          <div className="w-full flex">
            <DashBoardChart />
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default AdminHomePage;


