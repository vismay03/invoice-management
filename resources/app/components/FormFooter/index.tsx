import { LoadingSpinner } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { memo } from "react";
import { Link } from "react-router-dom";

const FormFooter = memo(({ isSaving, feature }: { isSaving: boolean, feature: string }) => {    
    return (
        <>
            <Separator className="my-0" />

            <CardFooter>
                <div className='space-x-1'><Button disabled={isSaving} type="submit">{isSaving ? <LoadingSpinner /> : ''} Save </Button>    <Button variant="outline" asChild><Link to={`/${feature}`}>Cancel</Link></Button></div>
            </CardFooter>
        </>
    );
});

export default FormFooter