import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Movie} from "@/lib/features/movies/movieApiSlice";
import {RootState} from "@/lib/store";

export interface Review {
    _id?: string;
    movie?: string;
    rating: string;
    review: string;
    __v?: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const reviewApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: (headers, {getState}) => {
            const state = getState() as RootState;
            // console.log('prepareHeaders State ', state);
            if(state.auth.token)
            {
                headers.set('Authorization', 'Bearer '+state.auth.token);
            }
            return headers;
        }
    }),
    reducerPath: "reviewApi",
    tagTypes: ["Reviews"],
    endpoints: (build) => ({
        getReviews: build.query<Review[], number | undefined>({
            query: () => `/reviews`,
            providesTags: () => ['Reviews'],
        }),
        getReviewById: build.query<Review[], string >({
            query: (id) => `/reviews/movies/${id}`,
        }),
        addReview: build.mutation<Review, Partial<Review>>({
            query: (review:Partial<Review>) => ({
                url: `/reviews`,
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['Reviews'],
            // async onQueryStarted(review:Partial<Review>,{dispatch, queryFulfilled}){
            //     console.log("On query started:", review);
            //     try{
            //         const {data:savedReview} = await queryFulfilled;
            //         console.log("savedReview",savedReview);
            //         const patchResult = dispatch(
            //             reviewApiSlice.util.updateQueryData('getReviews', undefined, (draft)=>{
            //                 draft.push(savedReview);
            //                 return draft;
            //             })
            //         )
            //     }
            //     catch{
            //
            //     }
            // },
        }),
        updateReview: build.mutation<Review, Review>({
            query: (review:Review) => ({
                url: `/reviews/${review._id}`,
                method: 'PUT',
                body: review,
            }),
            async onQueryStarted(review:Review,{dispatch, queryFulfilled}){
                const patchResult = dispatch(
                    reviewApiSlice.util.updateQueryData('getReviews', undefined, (draft)=>{
                        draft = draft.map(item=> item._id === review._id? review : item)
                        return draft;
                    })
                )
                try{
                    const {data:updateReview} = await queryFulfilled;
                    console.log("Updated", updateReview);
                }
                catch{
                    patchResult.undo()
                }
            },
        }),
        deleteReview: build.mutation<Review, string | undefined>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id,{dispatch, queryFulfilled}){

                try{
                    const {data:deleteReview} = await queryFulfilled;
                    console.log("Deleted", deleteReview);
                    const patchResult = dispatch(
                        reviewApiSlice.util.updateQueryData('getReviews', undefined, (draft)=>{
                            draft = draft.filter(item=> item._id !== id)
                            return draft;
                        })
                    )
                }
                catch{

                }
            },
        }),
    })
});

export const {useGetReviewsQuery, useGetReviewByIdQuery, useAddReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation} = reviewApiSlice;
