import React from 'react'
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import { useSelector } from 'react-redux';
import AdminChart from './AdminChart';

const AdminMain = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: stats,error,isLoading} = useGetAdminStatsQuery();
    if(isLoading)return <div>Loading...</div>
    if(error) return <div>Failed to load admin stats</div>
  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>Admin Dashboard</h1>
            <p className='text-gray-500'>Hi, {user?.username}! Welcome</p>
            <AdminStats stats={stats}/>
            <AdminChart stats={stats}/>
        </div>
      
    </div>
  )
}

export default AdminMain
