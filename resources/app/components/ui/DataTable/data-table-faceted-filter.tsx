import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title: string
    setFilterValue: Function
    filterValue: any
    options: {
        name: string
        id: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
    setFilterValue,
    filterValue
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()


    return (

        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                    {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
                    {title}
                    {filterValue[title]?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {filterValue[title].size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {filterValue[title].size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {filterValue[title].size} selected
                                    </Badge>
                                ) : (
                                    options.length > 0 &&
                                    options
                                        .filter((option) => filterValue[title].has(option.id))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.id}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.name}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.length > 0 && options?.map((option) => {
                                const isSelected = filterValue[title].has(option.id)

                                return (
                                    <CommandItem
                                        key={option.id}
                                        onSelect={() => {

                                            if (isSelected) {

                                                filterValue[title].delete(option.id)

                                                setFilterValue({
                                                    ...filterValue,
                                                    [title]: filterValue[title]
                                                })

                                            } else {

                                                filterValue[title].add(option.id)
                                                setFilterValue({
                                                    ...filterValue,
                                                    [title]: filterValue[title]
                                                })

                                            }
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className={cn("h-4 w-4")} />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{option.name}</span>
                                        {facets?.get(option.id) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.id)}
                                            </span>
                                        )}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {filterValue[title] && filterValue[title].size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={
                                            () => {
                                                setFilterValue({
                                                    ...filterValue,
                                                    [title]: new Set()
                                                })
                                            }
                                        }
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
