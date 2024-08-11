
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from "@tanstack/react-table"
import * as React from 'react';
import { ArrowUpDown, Edit, Trash2Icon } from "lucide-react";
import DataTable from '@/components/DataTable';
import API from './api';
import { Link } from 'react-router-dom';
import { feature } from './feature';
import Actions from '@/components/Actions';
import StatusBadge from '@/components/StatusBadge';
export type DataTableType = {
    id: string
    name: string
    status: '0' | '1'
}




const Invoices = () => {


    const dataTableRef = React.useRef<{ confirmDeleteRow: Function }>();

    const columns: ColumnDef<DataTableType>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox itemID=''
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    itemID={row.getValue('id')}

                    checked={row.getIsSelected()}
                    value={row.getValue('id')}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",


            enableHiding: true,

        },
        {
            accessorKey: "customer_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0 hover:bg-transparent'
                        // onClick={() => {
                        //     column.toggleSorting(column.getIsSorted() === "asc")
                        // }}
                    >
                        Customer Name
                        {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize">{row.getValue("customer_name")}</div>
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0 hover:bg-transparent'
                        // onClick={() => {
                        //     column.toggleSorting(column.getIsSorted() === "asc")
                        // }}
                    >
                        Date
                        {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <Actions row={row} feature={`${feature}`} dataTableRef={dataTableRef} />
                )
            },
        },
    ]

    return (
        <div className='mx-auto'>
            <DataTable API={API} ref={dataTableRef} reducer={`${feature}`} columns={columns} createHref={`/${feature}/create`} />
        </div>
    );
};

export default Invoices;

