
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Props = {
    error: any
}

import { AlertCircle } from "lucide-react"


const Error = ({ error }: Props) => {
    console.log(error);

    return (
        <>
            {error ? (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error </AlertTitle>
                    <AlertDescription>
                        {error && error.statusText && <span className="block sm:inline">{error.statusText}</span>}
                        {error.data && <p>{error.data.message}</p>
                        }
                    </AlertDescription>
                </Alert>
            ) :


                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error </AlertTitle>
                    <AlertDescription>
                        <span className="block sm:inline">Something went wrong!</span>
                    </AlertDescription>
                </Alert>
            }
        </>
    )
}

export default Error
