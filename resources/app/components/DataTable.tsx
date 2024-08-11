
import * as React from "react"

import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { sendToastMessage } from '@/lib/sendToastMessage';
import SweetAlert2 from 'react-sweetalert2';
import { useToast } from '@/components/ui/use-toast';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTableToolbar } from "@/components/ui/DataTable/data-table-toolbar"
import TableRowsLoader from "@/components/Loader/TableRowsLoader"
import { Card } from "@/components/ui/card";
import { filterDefault, setDefaultFilter } from '@/components/ui/DataTable/filter-default';
// import Error from "@/Error";
import { useParams } from "react-router-dom";
// import companyTypes from "@/pages/account/companyType";



const DataTable: React.FunctionComponent<any> = React.forwardRef(({ columns, createHref, API, reducer }, ref) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const { toast } = useToast();
    const [deleteId, setDeleteId] = React.useState<number | number[]>(0);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const dispatch = useAppDispatch();
    const [dataFilter, setDataFilter] = React.useState<Filter>({})

    const [search, setSearch] = React.useState<string>("")
    const { data = [], isLoading, lastPage, links, currentPage, error, isError } = useAppSelector((state: any) => state[reducer]);

    const {type} = useParams()

    const [companyType, setCompanyType] = React.useState("")

    type Filter = {
        [key: string]: any[] | string
    }

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility:{
                id: false
            },
            rowSelection,
            
        },
        

    })

    const [filterValue, setFilterValue] = React.useState<any>({ ...filterDefault, sorting: table.getState().sorting});



    function getData(page: number, data: any) {
       

        dispatch(API.fetch({ page, ...data }))
    }

    function deleteMultiple(idsArray: number[]) {
        dispatch(API.multiDestroy(idsArray)).unwrap().then((response: { type: string; message: string; }) => {
            sendToastMessage(response.type, response.message, toast);
            getData(1, { ...dataFilter, search, sorting: table.getState().sorting });

        }).finally(() => {
            table.resetRowSelection()
        });

    }

    const deleteRow = (id: number) => {

        dispatch(API.destroy(id)).unwrap().then((response: { type: string; message: string; }) => {
            sendToastMessage(response.type, response.message, toast);
            getData(1, { ...dataFilter, search, sorting: table.getState().sorting });
        })
    }







    React.useEffect(() => {

        Object.keys(filterValue).forEach((key: string) => {
            if (key == "search"  || key == "sorting") return;
            dataFilter[key] = Array.from(filterValue[key])
        })
        
        setDataFilter({
            ...dataFilter
        })
        getData(1, { ...dataFilter, search, sorting: table.getState().sorting });
    }, [filterValue])




    React.useEffect(() => {

        setFilterValue((prev: any) => {
            return {
                ...prev,
                search
            }
        })



    }, [search])

    


    // React.useEffect(() => {
    //     setFilterValue((prev: any) => {
    //         return {
    //             ...prev,
    //             companyType
    //         }
    //     })

    // }, [companyType])

    React.useEffect(() => {
        console.log("sorting", table.getState().sorting);

        setFilterValue((prev: any) => {
            return {
                ...prev,
                sorting: table.getState().sorting
            }
        })
    }, [table.getState().sorting])






    const handlePageChange = (page: number, search: string = "") => {
        getData(page, { search, ...dataFilter, sorting: table.getState().sorting });
    }


    React.useImperativeHandle(ref, () => ({
        confirmDeleteRow(id: number) {
            setDeleteId(id);
            setSwalProps({
                show: true,
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            });
        }
    }))


    const [swalProps, setSwalProps] = React.useState({});
    const [swalProps2, setSwalProps2] = React.useState({});

    const handleMultiDelete = async (ids: any) => {

        const idsArray: number[] = [];
        ids.map((id: any) => {
            idsArray.push(id.original.id);
        })

        setDeleteId(idsArray);

        if (idsArray.length > 0) {
            setSwalProps2({
                show: true,
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            });
        }
        else {
            setSwalProps2({
                show: true,
                showCancelButton: true,
                cancelButtonText: "Ok",
                showConfirmButton: false,
                title: "Please select at least one row",
            });
        }

    }
    // React.useEffect(() => {

    //     setDefaultFilter()
    //     const defaultState = {
    //         ...filterDefault,
    //         sorting: table.getState().sorting,
    //         search: ""
    //     }
    //     setFilterValue(defaultState)

    //     console.log(filterValue);

    // }, [])




    return (
        <>
            {isError ?
                <Error error={error} />
                :
                <> <SweetAlert2 {...swalProps}

                    didClose={() => {
                        setSwalProps({
                            ...swalProps,
                            show: false
                        })
                    }}

                    onConfirm={(result: { isConfirmed: boolean; }) => {
                        if (result.isConfirmed) {
                            deleteRow(deleteId as number)
                        }
                    }}

                />

                    <SweetAlert2 {...swalProps2}

                        didClose={() => {
                            setSwalProps2({
                                ...swalProps,
                                show: false
                            })
                        }}

                        onConfirm={(result: { isConfirmed: boolean; }) => {
                            if (result.isConfirmed) {
                                deleteMultiple(deleteId as number[])
                            }
                        }}

                    />
                    <div className="w-full">
                        <Card>
                            <DataTableToolbar filterValue={filterValue} setFilterValue={setFilterValue} search={search} setSearch={setSearch} createHref={createHref} handleMultiDelete={handleMultiDelete} table={table} />
                        </Card>


                        <Card className="p-0 mt-5">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>

                                <TableBody>
                                    {isLoading ? <TableRowsLoader rowsNum={10} colsNum={table?.getHeaderGroups()[0]?.headers.length} />
                                        :
                                        table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}

                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {cell.column.id == "id"}
                                                            {flexRender(
                                                                cell.column.id == "id" ? (currentPage - 1) * 10 + row.index + 1 : cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    className="h-24 text-center"
                                                >
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>



                            </Table>
                        </Card>


                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div>
                                <Pagination>
                                    <PaginationContent>

                                        {links && links[0]?.url && <PaginationItem >
                                            <PaginationPrevious onClick={() => handlePageChange(links[0].url.split('?page=')[1], search)} href="#" />
                                        </PaginationItem>}
                                        {lastPage > 1 && links.slice(1, -1).map(({ url, label, active }: { url: string, label: string, active: boolean }, index: number) => {
                                            return (<PaginationItem key={index}>
                                                <PaginationLink href="#" onClick={() => handlePageChange(+url.split('?page=')[1], search)} isActive={active} >{label}</PaginationLink>
                                            </PaginationItem>)
                                        })}

                                        {links && links[links.length - 1]?.url && <PaginationItem>
                                            <PaginationNext href="#" onClick={() => handlePageChange(links[links.length - 1].url.split('?page=')[1], search)} />
                                        </PaginationItem>}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div></>
            }

        </>
    )
})


export default DataTable
