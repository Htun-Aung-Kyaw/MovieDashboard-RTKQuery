"use client";
import {Movie} from "@/lib/features/movies/movieApiSice";
import {useRouter} from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, Tooltip} from "@mui/material";
import {InfoOutlined,} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {deleteMovie} from "@/lib/features/movies/movieSlice";
import styles from "./movies.module.css";
import {deleteReview, selectReview} from "@/lib/features/reviews/reviewSlice";

export default function MovieUI({movie, index}: {movie: Movie, index?: number}) {
    const dispatch = useAppDispatch();
    const reviews = useAppSelector(selectReview);

    const review = reviews.find(review => review.movie === movie._id);

    const router = useRouter();
    function detailBtnHandler() {
        router.push(`/movies/${movie._id}`);
    }

    function deleteHandler() {
        dispatch(deleteMovie(movie));
        dispatch(deleteReview(review));
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