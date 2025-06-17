"use client";

import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {logout} from "@/lib/features/auth/authSlice";
import {movieApiSlice} from "@/lib/features/movies/movieApiSlice";
import {reviewApiSlice} from "@/lib/features/reviews/reviewApiSlice";
import isAuth from "@/app/components/auth/IsAuth";

function Page()
{
    const dispatch = useAppDispatch();
    const router = useRouter();
    const btnHandler = () => {
        Swal.fire({
            title: 'Logout!',
            text: 'Are you sure to logout?',
            icon: 'warning',
            confirmButtonText: 'Yes!',
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `No`,
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire(
                    {
                        title: "Logging out",
                        timer: 600,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    }
                ).then(result => {
                    dispatch(logout());
                    dispatch(movieApiSlice.util.resetApiState());
                    dispatch(reviewApiSlice.util.resetApiState());
                    router.push("/login");
                })
            }
        })
    };

    return (
            <div className="text-center">
                <h3>Logout of the App!</h3>
                <p>Thanks for using the movie dashboard app.</p>
                <p className={"mb-3"}>Click the button to logout.</p>
                <button className={"btn btn-primary mt-3"} onClick={btnHandler}>Logout</button>
            </div>
    );
}
export default isAuth(Page);

// export const metadata: Metadata = {
//     title: "Logout",
// };