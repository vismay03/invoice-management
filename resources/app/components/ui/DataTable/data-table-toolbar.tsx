
import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Link } from "react-router-dom"

import { DataTableFacetedFilter } from "@/components/ui/DataTable/data-table-faceted-filter"
// import { statuses } from "@/components/ui/data/data"
import GlobalApi from "@/service/api"
import { useAppDispatch } from "@/hooks"
import React from "react"
import { filterDefault, setDefaultFilter } from '@/components/ui/DataTable/filter-default';
import FileUploader from "@/components/FileUploader"
import ImportFile from "@/components/ui/import-file"


interface DataTableToolbarProps<TData> {
    table: Table<TData>
    handleMultiDelete: Function
    setSearch: Function,
    search: string
    filterValue: any
    setFilterValue: Function
    createHref: string
}





export function DataTableToolbar<TData>({
    table, handleMultiDelete, createHref, setSearch, search, setFilterValue, filterValue
}: DataTableToolbarProps<TData>) {


    const dispatch = useAppDispatch()


    const [size, setSize] = React.useState<any[]>([]);
    const [finish, setFinish] = React.useState<any[]>([]);
    const [category, setCategory] = React.useState<any[]>([]);
    const [reset, setReset] = React.useState<boolean>(false);

    const [columns, setColumns] = React.useState<any[]>([]);


    React.useEffect(() => {
        var isReset = false;
        Object.keys(filterValue).forEach((key: any) => {
            console.log(typeof filterValue['search']);

            if (filterValue[key] != Object) return;
            if (filterValue[key].size > 0) {
                isReset = true;
                return;
            }
        })
        setReset(isReset);
    }, [filterValue])

    React.useEffect(() => {
        setColumns(table.getAllColumns())
    }, [])


    React.useEffect(() => {

        if (isColumnExist("size")) {
            dispatch(GlobalApi.fetchSize()).unwrap().then((response) => {
                setSize(response)
            })
        }
        if (isColumnExist("finish")) {
            dispatch(GlobalApi.fetchFinish()).unwrap().then((response) => {
                setFinish(response)
            })
        }
        if (isColumnExist("category")) {
            dispatch(GlobalApi.fetchCategory()).unwrap().then((response) => {
                setCategory(response)
            })
        }


    }, [columns])

    const isColumnExist = (column: any) => {
        return columns.some((col: any) => col.id === column)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    className="h-9 w-[150px] lg:w-[250px]"
                />


                {isColumnExist('status') && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        setFilterValue={setFilterValue}
                        filterValue={filterValue}
                        title="status"
                        options={[]}
                    />
                )}




                {isColumnExist('size') && (
                    <DataTableFacetedFilter
                        column={table.getColumn("size")}
                        setFilterValue={setFilterValue}
                        filterValue={filterValue}
                        title="size"
                        options={size}
                    />
                )}

                {isColumnExist('finish') && (
                    <DataTableFacetedFilter
                        column={table.getColumn("finish")}
                        setFilterValue={setFilterValue}
                        filterValue={filterValue}
                        title="finish"
                        options={finish}
                    />
                )}

                {isColumnExist('category') && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        setFilterValue={setFilterValue}
                        filterValue={filterValue}
                        title="category"
                        options={category}
                    />
                )}


                {(search || reset) && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSearch("")
                            setDefaultFilter()
                            setFilterValue({ ...filterDefault, sorting: table.getState().sorting, search: "" })
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="inline-flex gap-x-2 items-center">
                {/* <DataTableViewOptions table={table} /> */}

                <ImportFile />


                {table.getSelectedRowModel().rows?.length > 0 &&
                    <Button onClick={() => handleMultiDelete(table.getSelectedRowModel().rows)} size={"sm"} variant={"outline"} className="inline-flex  items-center gap-x-2 text-red-500">
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1={10} x2={10} y1={11} y2={17} /><line x1={14} x2={14} y1={11} y2={17} /></svg>
                        Delete ({table.getSelectedRowModel().rows?.length})
                    </Button>
                }
                <Button
                    asChild
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <Link to={createHref} className="inline-flex items-center gap-x-2">
                        <svg className="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                            <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                        Create
                    </Link>
                </Button>
            </div>
        </div>
    )
}
