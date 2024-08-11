
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandItem
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import React from "react";

export const SelectSearch = ({ field, form, feature, title, name }: { field: any; form: any; feature: any; title: string; name: string; }) => {

   React.useEffect(()=>{
        feature.map((item)=>{
            console.log(item.name)
        })
   },[feature])

    return (
        <div className="col-span-8">
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between capitalize",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value
                                ? feature.find(
                                    (item: any) => item.id.toString() === field.value.toString()
                                )?.name
                                : `${title}`}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                    <Command>

                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>Not found.</CommandEmpty>
  <CommandList>
                        <CommandGroup className="w-full">
                          

                            {(Array.isArray(feature) && feature?.length > 0) && (feature || [])?.map((item: any) => (
                               
                                <CommandItem
                                
                                    value={item?.name}
                                    key={item?.id?.toString()}
                                    onSelect={() => {
                                        form.setValue(name, item?.id);
                                    }}


                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item?.id?.toString() === field?.value?.toString()
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )} 
                                        />
                                    {item?.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
</CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
