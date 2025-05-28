"use client";

import {IconButton, Tooltip} from "@mui/material";
import {DeleteOutlined, } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {Movie} from "@/lib/features/movies/movieApiSice";
import {useState} from "react";
import ReviewForm from "@/app/components/reviews/ReviewForm";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {deleteReview, selectReview} from "@/lib/features/reviews/reviewSlice";
import styles from './reviews.module.css';


export default function ReviewUI({movie, index}: {movie: Movie, index?: number}) {

    const dispatch = useAppDispatch();
    const reviewsList = useAppSelector(selectReview);

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const review = reviewsList.find((review) =>  review?.movie === movie._id);

    function editHandler() {
        if(review)
            setEdit(true);
        else
            setEdit(false);
        handleShow();
    }

    function deleteHandler() {
        dispatch(deleteReview(review));
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