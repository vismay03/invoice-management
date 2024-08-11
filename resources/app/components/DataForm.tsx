


import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { FormLoader } from "@/components/Loader";
import Error from "@/Error";


interface DataFormProps {
    title: string
    backHref: string
    state: any
    formLoading?: boolean
    inputNumber?: number
    children: React.ReactNode
}

const DataForm: React.FunctionComponent<DataFormProps> = ({ title, backHref, children, formLoading, inputNumber = 3, state }) => {

   

    return (
        <>
            {!state?.isError ? <Card>
                <CardHeader>
                    <CardTitle className="capitalize">{title}</CardTitle>
                    <Button asChild className="flex bg-green-600 hover:bg-green-700 items-center" size="sm">
                        <Link to={backHref}>
                            <ChevronLeft />Back
                        </Link>
                    </Button>
                </CardHeader>
                <Separator className="mb-10 mt-3" />
                {state.isLoading ?
                   <FormLoader inputNumber={inputNumber} />
                   :
                    <> {children}</>
                }
            </Card> : <Error error={state?.error} />}</>
    )
}


export default DataForm
