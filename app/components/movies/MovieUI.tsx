"use client";
import {Movie, useDeleteMovieMutation} from "@/lib/features/movies/movieApiSice";
import {useRouter} from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, Tooltip} from "@mui/material";
import {InfoOutlined,} from "@mui/icons-material";
import styles from "./movies.module.css";
import Swal from 'sweetalert2';
import {useDeleteReviewMutation, useGetReviewsQuery} from "@/lib/features/reviews/reviewApiSlice";

export default function MovieUI({movie, index}: {movie: Movie, index?: number}) {

    const [deleteMovieApi] = useDeleteMovieMutation();
    const [deleteReviewApi] = useDeleteReviewMutation();

    const {review} = useGetReviewsQuery(undefined,{
        selectFromResult: ({data:reviews}) => ({
            review: reviews?.find(review => review.movie === movie._id)
        })
    });


    const router = useRouter();
    function detailBtnHandler() {
        router.push(`/movies/${movie._id}`);
    }

    function deleteHandler() {
        Swal.fire({
            title: 'Delete Movie!',
            text: 'Are you sure to delete?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `No`,
        }).then(result => {
            if (result.isConfirmed) {
                deleteMovieApi(movie?._id);
                deleteReviewApi(review?._id);
            }else if (result.isDenied) {
                Swal.fire("Okay not deleted!", "", "info");
            }
        })
    }

    return (
        // <div className={"card mb-2 p-3"}>
        //     <p><b>Title:</b> {movie?.title}</p>
        //     <button type={"button"} className={"btn btn-primary"}
        //         onClick={detailBtnHandler}>Detail</button>
        // </div>
        <tr>
            <td>{index}</td>
            <td>{movie?.title}</td>
            <td>{movie?.director.name}</td>
            <td>{movie?.year}</td>
            <td className={`text-center ${styles.rating}`}>{review ? review?.rating : "N/A"}</td>
            <td className="text-center">
                <Tooltip title={"Detail"}>
                    <IconButton color="success" onClick={detailBtnHandler}>
                        <InfoOutlined />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <IconButton color="error" onClick={deleteHandler}>
                        <DeleteIcon />
                        {/*<DeleteOutlined />*/}
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}