import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FieldItem,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks"
import GlobalApi from "@/service/api"
import { sendToastMessage } from "@/lib/sendToastMessage"
import { useToast } from '@/components/ui/use-toast';
import { useState } from "react"
import { LoadingSpinner } from "@/components/Loader"

const formSchema = z.object({
    file: z.instanceof(File),
})
const ImportFile = () => {

    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false)

    const [open, setOpen] = useState(false)


    const dispatch = useAppDispatch()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: new File([], ""),
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        dispatch(GlobalApi.importProducts(values)).unwrap().then((response) => {
            sendToastMessage(response.type, response.message, toast);
        }).catch((error) => {
            sendToastMessage(error.type, error.message, toast);
        })
        .finally(() => {
            setOpen(false) 
            setIsLoading(false)
        })
    }
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Import Product</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Import Products</DialogTitle>

                        </DialogHeader>
                        <div className="">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FieldItem className="col-span-12">

                            <FormControl>
                                    <Input type="file" className="w-full"   onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                            </FormControl>
                            </FieldItem>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button disabled={isLoading} type="submit">
                        {isLoading && <LoadingSpinner /> }
                        Import</Button>
                </DialogFooter>
            </form>
        </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default ImportFile
