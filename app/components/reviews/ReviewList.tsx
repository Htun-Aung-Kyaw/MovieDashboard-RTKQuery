"use client";

import ReviewUI from "@/app/components/reviews/ReviewUI";
import styles from "./reviews.module.css";
import {Table} from "react-bootstrap";
import {useAppSelector} from "@/lib/hooks";
import {selectReview} from "@/lib/features/reviews/reviewSlice";
import {selectMovies} from "@/lib/features/movies/movieSlice";
import {useGetMoviesQuery} from "@/lib/features/movies/movieApiSice";
import {Review, useAddReviewMutation, useGetReviewsQuery} from "@/lib/features/reviews/reviewApiSlice";
import {useEffect} from "react";

export default function ReviewList() {
    // const reviewsList = useAppSelector(selectReview);
    // const moviesList = useAppSelector(selectMovies);

    const {data:movies}  = useGetMoviesQuery(undefined);
    const {data:reviews}  = useGetReviewsQuery(undefined);

    // For adding data to server.
    // const [addReviewApi] = useAddReviewMutation();
    // const addToServer = (review: Review) => addReviewApi(review);
    // const dataList = useAppSelector(selectReview);
    // useEffect(()=>{
    //     dataList.map((data, index) => addToServer({...data, movie: movies[index]._id}));
    // },[]);

    return (
        <div className="uiList">
            <h5 className={`alert alert-success ${styles.sticky}`}>Total Reviews: {reviews?.length || '0'}</h5>
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
                    movies?.map((movie, index) => <ReviewUI key={movie?._id} movie={movie} index={++index}/>)
                }
                </tbody>
            </Table>
        </div>
    )
}