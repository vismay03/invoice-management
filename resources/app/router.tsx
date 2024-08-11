import React, { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoute from '@/components/PrivateRoute';
import RouteLoading from '@/components/RouteLoading';
import RootLayout from '@/layouts/RootLayout';



const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Invoice = React.lazy(() => import('@/pages/invoices'));
const InvoiceCreate = React.lazy(() => import('@/pages/invoices/create'));
const Login = React.lazy(() => import('@/pages/login'));
const router = createBrowserRouter(
    createRoutesFromElements(
        <>


            <Route
                path="/"
                element={<PrivateRoute />}
            >



                <Route index element={<Suspense fallback={<RouteLoading />}><Dashboard /></Suspense>} />
                <Route path="/invoices" element={<Suspense fallback={<RouteLoading />}><Invoice /></Suspense>} />
                <Route path="/invoices/create" element={<Suspense fallback={<RouteLoading />}><InvoiceCreate title="Create Invoice" /></Suspense>} />
                <Route path="/invoices/edit/:id" element={<Suspense fallback={<RouteLoading />}><InvoiceCreate title="Update Invoice" /></Suspense>} />


            </Route>

            <Route path="/login" element={<Suspense fallback={<RouteLoading />}><Login /></Suspense>} />









        </>
    )
);


export default router;
