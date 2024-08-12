import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from "@/hooks"
import { login } from "@/service/auth/slice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FieldItem, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import React from "react"
import Spinner from "@/components/Loader/Spinner"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),

})

export default function Login() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setMessage("")
        dispatch(login(values)).unwrap().then((response) => {
            console.log(response)
    //   if (action.meta.requestStatus === 'fulfilled') {
          navigate('/');
    //   }
    }).
    catch((err) => setMessage('Email or Password is incorrect'))
    .finally(()=> setIsLoading(false)); 
    }

    return (
        <div className="min-h-screen flex w-full justify-center items-center">


        <Card className="w-full max-w-sm h-full">
            <CardHeader className="mb-5 justify-center">
                <CardTitle className="text-2xl text-center">Login</CardTitle>
               
            </CardHeader>
            <Form {...form} >

                <h3 className="text-red-500 mb-3 text-sm text-bold text-center">{message}</h3>

                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem className=" sm:flex flex-col gap-3">

                                    <FormLabel>Email</FormLabel>
                                    <FieldItem >
                                        <FormControl>
                                            <Input id="email" type="email" placeholder=""  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FieldItem>

                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem className=" sm:flex flex-col gap-3">
                                    
                                    <FormLabel>Password</FormLabel>
                                    <FieldItem>
                                        <FormControl>
                                            <Input id="password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FieldItem>

                                </FormItem>
                            )}
                            />
                        </div>
                    </CardContent>
            <CardFooter>
                <Button disabled={isLoading} className="w-full"> { isLoading && <Spinner/> } Sign in</Button>
            </CardFooter>
                </form>
            </Form>
        </Card>
                            </div>
    )
}
