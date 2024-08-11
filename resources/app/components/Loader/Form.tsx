import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface IFormLoaderProps {
    inputNumber: number
}

const FormLoader: React.FunctionComponent<IFormLoaderProps> = ({inputNumber}) => {
    return (
        <div className="space-y-6">
        {([...Array(inputNumber)].map((_row, index) =>
        <div key={index} className="space-y-2">
            <label><Skeleton className="h-5 w-64" /></label>
            <div>
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
        ))}
     </div>
    );
};

export default FormLoader;

