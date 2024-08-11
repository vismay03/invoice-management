'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggle } from '@/hooks/useSidebar';
import { Link } from 'react-router-dom';


type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const isMinimized = useAppSelector((state) => state.sidebar.isMinimized);
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState(false);


    const navItems: any = [
        {
            title: 'Dashboard',
            href: '/',
            match: 'dashboard',
            icon: 'dashboard',
            label: 'Dashboard'
        },
        {
            title: 'Invoices',
            href: '/invoices',
            match: 'invoices',
            icon: 'dashboard',
            label: 'Invoices'
        },


    ];


    const handleToggle = () => {
        setStatus(true);
        dispatch(toggle())
        setTimeout(() => setStatus(false), 500);
    };
    return (
        <>

            <nav
                className={cn(
                    `relative hidden h-screen bg-zinc-100 flex-none border-r z-10 md:block`,
                    status && 'duration-500',
                    !isMinimized ? 'w-72' : 'w-[72px]',
                    className
                )}
            >

                  <div className="hidden lg:block">
          <Link to="/" className="flex items-center justify-center py-2 gap-1">
            {/* <img src={logo.src} alt="" width={40} height={40} /> */}
            <span className="font-bold text-2xl text-center">Vismay</span>
          </Link>
        </div>
                <ChevronLeft
                    className={cn(
                        'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                        isMinimized && 'rotate-180'
                    )}
                    onClick={handleToggle}
                />
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="mt-3 space-y-1">
                            <DashboardNav items={navItems} />
                        </div>
                    </div>
                </div>
            </nav>



        </>
    );
}
