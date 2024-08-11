

import { CheckIcon, X } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

export function sendToastMessage(type: string, message: string, toast: any) {


    switch (type) {
        case 'success':
            toast({
                className: "sm:top-5 sm:right-5 w-[350px]",
                title: "Success",
                icon: <CheckIcon className='w-7 rounded-full h-7 bg-green-600 text-white' />,
                duration: 3000,
                description: message,
            })
            break;

        case 'delete':
            toast({
                className: "sm:top-5 sm:right-5 w-[350px]",
                title: "Danger",
                icon: <X className='w-7 p-1 rounded-full h-7 bg-red-600 text-white' />,
                duration: 3000,
                description: message,
            })
            break;
        case 'error':
            toast({
                className: "sm:top-5 sm:right-5 w-[350px]",
                title: "Error",
                icon: <AlertTriangle className='w-7 p-1 rounded-full h-7 bg-red-600 text-white' />,
                duration: 3000,
                description: message,
            })
            break;

        default:
            break;
    }

}
