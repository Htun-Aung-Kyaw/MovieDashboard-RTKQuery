import React from 'react';
import {ReactPropTypes, useEffect} from 'react';
import {useRouter} from "next/navigation";
// import { usePathname } from 'next/navigation';
import {useSelector} from "react-redux";
import {selectAuth} from "@/lib/features/auth/authSlice";
function IsAuth<T>(Component: React.ComponentType<T>) {
    return (props: T) => {
        const router = useRouter();
        const auth = useSelector(selectAuth);
        // const pathname = usePathname();

        // console.log('Pathname ',pathname);
        useEffect(()=>{
            if (!auth) {
               router.push('/login');
            }
        },[]);

        return (
            <>
                <Component {...props!} />
            </>
        );
    };
}

export default IsAuth;