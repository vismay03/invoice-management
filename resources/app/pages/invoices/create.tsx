
import DataForm from '@/components/DataForm';
import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from '@/components/ui/use-toast';
import { FieldItem, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { sendToastMessage } from '@/lib/sendToastMessage';
import { useAppDispatch, useAppSelector } from '@/hooks';
import API from './api';
import { feature } from './feature';

import GlobalApi from '@/service/api';
import { SelectSearch } from '@/components/SelectSearch';
import { ThunkDispatch, UnknownAction, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import FormFooter from '@/components/FormFooter';

// import FileUploader from '@/components/FileUploader';
// import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2Icon } from 'lucide-react';
import InvoiceDetails from '@/pages/invoices/invoice-details';


const formSchema = z.object({
    id: z.string(),
    customer_name: z.coerce.string().min(1, { message: "Customer Name is required" }),
    date: z.coerce.string().min(1, { message: "Date is required" }),
    total_amount: z.coerce.string().min(1, { message: "Total Amount is required" }),
    invoice_details: z.array(z.object({
        category_id: z.coerce.string()
            .min(1, 'Amount is required')

        ,
        product_id: z.coerce.string()
            .min(1, 'Product is required')
            .default('')
        ,
        amount: z
            .coerce.string()
            .min(1, 'Amount is required')

        ,
        quantity: z.coerce.string()
            .min(1, 'Quantity is required')
        ,
    })).default([])

}).partial()

interface ICreateProps {
    title: string
}



const Create: React.FunctionComponent<ICreateProps> = ({ title }) => {

    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [formLoading, setFormLoading] = React.useState<boolean>(false);



    const states = useAppSelector((state: any) => state[feature]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: id || "",
            customer_name: "",
            date: "",
            total_amount: "",
            invoice_details: [
                {
                    product_id: "",
                    category_id: "",
                    quantity: "",
                    amount: "",



                }
            ],

            // status: "1",
        },
    })











    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "invoice_details",
    });








    React.useEffect(() => {
        if (id) {
            dispatch(API.edit(id)).unwrap().then((response) => {


                form.reset({
                    ...response?.data,
                    id: response?.data?.id.toString()
                })
            })
        }
    }, [])











    function onSubmit(values: z.infer<typeof formSchema>) {


        if (id) {

            dispatch(API.update(values)).unwrap().then((response) => {

                sendToastMessage(response.type, response.message, toast);
            })
        }
        else {
            dispatch(API.create(values)).unwrap().then((response) => {
                sendToastMessage(response.type, response.message, toast);

                form.reset()
            })
        }
    }
    return (
        <div className='mx-auto'>
            <DataForm state={states} formLoading={formLoading} title={title} backHref={`/${feature}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <CardContent className="gap-x-10 sm:grid grid-cols-12">
                            <div className="col-span-6 space-y-5">
                                <FormField control={form.control} name="customer_name" render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>Customer Name</FormLabel>
                                        <FieldItem>
                                            <FormControl>
                                                <Input placeholder="" {...field} />

                                            </FormControl>
                                            <FormMessage />
                                        </FieldItem>

                                    </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="date" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Date
                                        </FormLabel>
                                        <FieldItem>
                                            <FormControl>
                                                <Input type="date" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FieldItem>
                                    </FormItem>
                                )}
                                />















                                {/* <Status form={form} /> */}
                            </div>

                            <div className="col-span-12 mt-10">
                                <div className="mb-5 scroll-m-20 flex justify-between items-center border-b pb-2">
                                    <p className=" text-lg font-semibold tracking-tight transition-colors first:mt-0">Add Products</p>

                                </div>
                            </div>


                            {
                                fields.map((field, index) => (
                                    <>

                                        <InvoiceDetails form={form} remove={remove} field={field} index={index} dispatch={dispatch} id={id} />



                                    </>
                                ))
                            }


                            <div className="col-span-12 justify-center mt-6 flex">
                                <Button type="button" onClick={() => append({
                                    category_id: "",
                                    product_id: "",
                                    quantity: "",
                                    amount: "",

                                })} className="inline-flex bg-green-600 mb-8 items-center gap-x-2" size="sm">
                                    <svg className="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                                    </svg>
                                    Add New Product
                                </Button>
                            </div>
                        </CardContent>
                        <div className="mb-10">
                            <FormField control={form.control} name="total_amount" render={({ field }) => (
                                <FormItem>

                                    <FormLabel>Total Amount</FormLabel>
                                    <FieldItem>
                                        <FormControl>
                                            <Input placeholder="" readOnly  {...field} />

                                        </FormControl>
                                        <FormMessage />
                                    </FieldItem>

                                </FormItem>
                            )}
                            />
                        </div>
                        <FormFooter isSaving={states.isSaving} feature={feature} />

                    </form>
                </Form>
            </DataForm>
        </div>
    );
};


export default Create;
