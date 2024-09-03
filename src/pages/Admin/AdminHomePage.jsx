
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import StatsCard from '../../components/admindash/StatsCard';
import DashBoardChart from '../../components/admindash/DashBoardChart';
import { adminDashboard } from '../../utils/api';
import NewUsers from '../../components/admindash/NewUsers';
import PremiumProperties from '../../components/admindash/PremiumProperties';

const AdminHomePage = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        adminDashboard()
            .then(response => {
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 bg-gray-100">
                    <AdminHeader isDashboard={true} />
                    <div className="flex flex-wrap">
                        <div className="w-full flex flex-wrap space-x-2">
                            <StatsCard title="Total Listings" value={dashboardData.total_listings} />
                            <StatsCard title="Subscription Count" value={dashboardData.subscription_growth} />
                            <StatsCard title="Total Revenue" value={dashboardData.total_revenue} />
                        </div>
                        <div className="w-full flex">
                            <DashBoardChart
                                totalListings={dashboardData.total_listings}
                                total_land_properties={dashboardData.total_land_properties}
                                total_apartments={dashboardData.total_apartments}
                                total_villas={dashboardData.total_villas}
                                total_users={dashboardData.total_users}
                                subscription_growth={dashboardData.subscription_growth}
                                total_revenue={dashboardData.total_revenue}
                            />
                        </div>
                    </div>
                    <PremiumProperties />
                    <NewUsers />
                </main>
            </div>
        </div>
    );
}

export default AdminHomePage;
