import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import * as React from 'react';

interface TableRowsLoaderProps {
    rowsNum: number
    colsNum: number
}

const TableRowsLoader: React.FunctionComponent<TableRowsLoaderProps> = ({ rowsNum, colsNum }) => {
    return <>
        {([...Array(rowsNum)].map((_row, index) =>
            <TableRow key={index} className="animate-pulse w-full">
                {([...Array(colsNum)].map((_col, index) =>
                    <TableCell className="px-2" key={index}>
                        <Skeleton className="h-8 w-full" />
                    </TableCell >
                ))}
            </TableRow>
        ))}
    </>;
};

export default TableRowsLoader;
