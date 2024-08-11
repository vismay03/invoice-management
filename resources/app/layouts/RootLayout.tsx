import { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Sidebar, Header } from "@/components";
// import "preline/preline";
 
import { Toaster } from "@/components/ui/toaster"
import GlobalApi from "@/service/api";
import { useAppDispatch } from "@/hooks";
export default function RootLayout(props: { children?: ReactNode }) {



    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUser = () => {


        dispatch(GlobalApi.getUser()).unwrap().then((response) => {
            if (response.status !== 401 && response.data) {
                setIsLoggedIn(true);
            }
            else {
                navigate('/login');
            }
        }).catch(() => {
            navigate('/login');
        });
    }
    // if (token) {
    //     setIsLoggedIn(true);
    // }

    useEffect(() => {
        checkUser();
    }, [isLoggedIn]);
    return (
        <>
            {isLoggedIn ? (
                <>
                    <Header />
                    <Sidebar />
                    <main className="p-4 pt-6 pl-[17.5rem]" >
                        {props.children}
                        <Outlet />
                    </main>
                    <Toaster />
                </>
            )
                :
                ""
            }

        </>
    );
}
