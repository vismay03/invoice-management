import { SelectSearch } from "@/components/SelectSearch";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FieldItem, FormControl, FormMessage } from "@/components/ui/form";
import GlobalApi from "@/service/api";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const InvoiceDetails = ({ field, index, form, remove, dispatch, id }: { field: any, index: number, form: any, remove: any, dispatch: any, id: string | undefined }) => {


    const [products, setProducts] = React.useState<any[]>([]);
    const [category, setCategory] = React.useState<any[]>([]);

    const category_id = form?.watch(`invoice_details.${index}.category_id`);
    const product_id = form?.watch(`invoice_details.${index}.product_id`);
    const quantity = form?.watch(`invoice_details.${index}.quantity`);
    const amount = form?.watch(`invoice_details.${index}.amount`);
    const invoice_details = form?.watch(`invoice_details`);

    React.useEffect(() => {

        if (category_id) {
            dispatch(GlobalApi.fetchProductByCategory(category_id)).unwrap().then((response: any) => {

                setProducts(response)
            })
        }

    }, [category_id])

    function fetchAll() {
        return (dispatch: any) => Promise.all([
            dispatch(GlobalApi.fetchCategory())
        ])
    }

    React.useEffect(() => {


        const product = products.find((item) => item.id === product_id);
        if (quantity && product) {

            console.log(product)
            const bulk_quantity = product.quantity;
            const price = quantity >= bulk_quantity ? product.price.bulk_price : product.price.single_price;
            const amount = (quantity * price).toFixed(2);
            console.log(amount)
            form.setValue(`invoice_details.${index}.amount`, amount)
        }
        else {
            form.setValue(`invoice_details.${index}.amount`, "")
        }


    }, [quantity, product_id])

    React.useEffect(() => {
        // setFormLoading(true)
        dispatch(fetchAll()).then((response: { payload: React.SetStateAction<any[]>; }[]) => {

            setCategory(response[0].payload)
            // setFormLoading(false)
        })

    }, [])

      React.useEffect(()=>{

          if (amount){
        var total_amount = invoice_details.reduce((total, item)=>{
            console.log(total, item)
                return total + parseFloat(item.amount);
            }, 0)
            form.setValue('total_amount', total_amount.toFixed(2))


        }




   
      }, [amount, invoice_details])


    return (
        <div key={field?.id} className="sm:grid mb-4 grid-cols-[1fr_1fr_1fr_1fr_100px] col-span-12  w-full gap-x-10">



            <FormField control={form.control} name={`invoice_details.${index}.category_id`} render={({ field }) => (
                <FormItem className="sm:flex flex-col gap-1">
                    <FormLabel>Category Name</FormLabel>
                    <FieldItem>
                        <FormControl className="col-span-8">
                            <SelectSearch title="Select Category" name={`invoice_details.${index}.category_id`} field={field} form={form} feature={category} />
                        </FormControl>
                        <FormMessage />
                    </FieldItem>
                </FormItem>
            )}
            />




            <FormField control={form.control} name={`invoice_details.${index}.product_id`} render={({ field }) => (
                <FormItem className="sm:flex flex-col gap-1">
                    <FormLabel>Products Name</FormLabel>
                    <FieldItem>
                        <FormControl className="col-span-8">
                            <SelectSearch title="Select Product" name={`invoice_details.${index}.product_id`} field={field} form={form} feature={products} />
                        </FormControl>
                        <FormMessage />
                    </FieldItem>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={`invoice_details.${index}.quantity`} render={({ field }) => (
                <FormItem className="sm:flex flex-col gap-1">
                    <FormLabel>Quantity</FormLabel>
                    <FieldItem>
                        <FormControl className="col-span-8">
                            <Input type="number" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FieldItem>
                </FormItem>
            )}
            />
            <FormField control={form.control} name={`invoice_details.${index}.amount`} render={({ field }) => (
                <FormItem className="sm:flex flex-col gap-1">
                    <FormLabel>Amount</FormLabel>
                    <FieldItem>
                        <FormControl className="col-span-8">
                            <Input type="number" readOnly placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FieldItem>
                </FormItem>
            )}
            />

            {index > 0 &&
                <div className="col-span-1 ml-3 text-right">
                    <Button type="button" variant="destructive" onClick={() => remove(index)} size="icon">
                        <Trash2Icon className=" text-white" />
                    </Button>
                </div>
            }






        </div>
    )
}


export default InvoiceDetails