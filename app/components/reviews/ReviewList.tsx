"use client";

import ReviewUI from "@/app/components/reviews/ReviewUI";
import styles from "./reviews.module.css";
import {Table} from "react-bootstrap";
import {useAppSelector} from "@/lib/hooks";
import {selectReview} from "@/lib/features/reviews/reviewSlice";
import {selectMovies} from "@/lib/features/movies/movieSlice";

export default function ReviewList() {
    const reviewsList = useAppSelector(selectReview);
    const moviesList = useAppSelector(selectMovies);
    return (
        <div className="uiList">
            <h5 className={`alert alert-success ${styles.sticky}`}>Total Reviews: {reviewsList?.length}</h5>
            <Table hover className={`align-middle`}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Movie Title</th>
                    <th>Year</th>
                    <th>Review</th>
                    <th className={"text-center"}>Rating</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    moviesList?.map((movie, index) => <ReviewUI key={movie?._id} movie={movie} index={++index}/>)
                }
                </tbody>
            </Table>
        </div>
    )
}