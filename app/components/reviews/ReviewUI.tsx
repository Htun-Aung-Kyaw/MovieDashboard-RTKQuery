"use client";

import {IconButton, Tooltip} from "@mui/material";
import {DeleteOutlined, } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {Movie} from "@/lib/features/movies/movieApiSlice";
import {useState} from "react";
import ReviewForm from "@/app/components/reviews/ReviewForm";
import styles from './reviews.module.css';
import Swal from "sweetalert2";
import {useDeleteReviewMutation, useGetReviewsQuery} from "@/lib/features/reviews/reviewApiSlice";

export default function ReviewUI({movie, index}: {movie: Movie, index?: number}) {

    // const {data}=useGetReviewsQuery(undefined);
    // console.log("Data:",data);

    const {review} = useGetReviewsQuery(undefined,{
        selectFromResult: ({data:reviews}) => ({
            review: reviews?.find(review=>review.movie === movie._id)
        }),
    });

    const [deleteReviewApi, deleteReviewApiResult] = useDeleteReviewMutation();

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log("Review",review);

    function editHandler() {
        if(review)
            setEdit(true);
        else
            setEdit(false);
        handleShow();
    }

    function deleteHandler() {
        Swal.fire({
            title: 'Delete Review!',
            text: 'Are you sure to delete?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `No`,
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire("Okay deleted!", "", "info");
                // dispatch(deleteReview(review));
                deleteReviewApi(review?._id);
            }else if (result.isDenied) {
                Swal.fire("Okay not deleted!", "", "info");
            }
        })
    }

    const reviewClass = (!review || review.rating == "N/A")? styles.noReviews : '';

    return (
        <>
            <tr className={reviewClass}>
                <td>{index}</td>
                <td className={styles.colWidth20}>{movie?.title}</td>
                <td>{movie?.year}</td>
                <td className={styles.colWidth40}>{review ? review?.review : "N/A"}</td>
                <td className={`text-center rating`}>{review ? review?.rating : "N/A"}</td>
                <td className="text-center">
                    <Tooltip title={"Edit Review"} onClick={editHandler}>
                        <IconButton color="info">
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete Review"}>
                        <IconButton color="error" onClick={deleteHandler}>
                            {/*<DeleteIcon/>*/}
                            <DeleteOutlined/>
                        </IconButton>
                    </Tooltip>
                </td>
            </tr>
            <ReviewForm movie={movie} review={review} show={show} handleClose={handleClose} edit={edit}></ReviewForm>
        </>
    )
}