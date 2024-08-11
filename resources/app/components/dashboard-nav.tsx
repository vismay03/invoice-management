import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
// import { useSidebar } from '@/hooks/useSidebar';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/hooks';


interface DashboardNavProps {
    items: NavItem[];
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isMobileNav?: boolean;
}

export function DashboardNav({
    items,
    setOpen,
    isMobileNav = false,
}: DashboardNavProps) {
        const isMinimized = useAppSelector((state) => state.sidebar.isMinimized);

    // const location = useLocation();
    const dispatch = useAppDispatch();

    const { id } = useParams();

    if (!items?.length) {
        return null;
    }

    // const pathParts = location.pathname.split('/');

    return (
        <nav className="grid items-start gap-2">
            <TooltipProvider>
                {items.map((item, index) => {
                    const Icon = Icons[item.icon || 'dashboard'];
                    return (
                        item.href && (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={item.disabled ? '/' : item.href}
                                        className={cn(
                                            'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                            // pathParts[3] === item.match ? 'bg-white' : 'transparent',
                                            item.disabled && 'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                    >
                                        <Icon className={`ml-3 size-5`} />
                                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                            <span className="mr-2 truncate">{item.title}</span>
                                        ) : (
                                            ''
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    align="center"
                                    side="right"
                                    sideOffset={8}
                                    className={!isMinimized ? 'hidden' : 'inline-block'}
                                >
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        )
                    );
                })}
            </TooltipProvider>
        </nav>
    );
}
