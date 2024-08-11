import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import { useAppSelector } from '@/hooks';

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

    

    return isAuthenticated ? <div className="flex"><Sidebar />  <main className="p-4 w-full relative" > <Header /><div className="pt-14"> <Outlet /></div></main><Toaster/></div> : <Navigate to="/login" />;
};

export default PrivateRoute;
