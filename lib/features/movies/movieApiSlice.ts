import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {RootState} from "@/lib/store";

export interface Director{
    name: string,
    phoneNo?: string,
    _id?: string,
}
export interface Movie{
    _id?: string,
    title: string,
    director: Director,
    year: number,
    __v?: number,
}


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const movieApiSlice = createApi({
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
    reducerPath: "movieApi",
    tagTypes: ["Movies"],
    endpoints: (build) => ({
        getMovies: build.query<Movie[], void>({
            query: () => `/movies`,
            providesTags: () => ['Movies'],
        }),
        getMovieById: build.query<Movie, string | undefined>({
            query: (id) => `/movies/${id}`,
        }),
        addMovie: build.mutation<Movie, Partial<Movie>>({
            query: (movie:Partial<Movie>) => ({
                url: `/movies`,
                method: 'POST',
                body: movie,
            }),
            invalidatesTags: ['Movies'],
            // async onQueryStarted(movie:Partial<Movie>,{dispatch, queryFulfilled}){
            //     console.log("On query started", movie);
            //     try{
            //         const {data:savedMovie} = await queryFulfilled;
            //         const patchResult = dispatch(
            //             movieApiSlice.util.updateQueryData('getMovies', undefined, (draft)=>{
            //                 // if(!Array.isArray(draft)) return [savedMovie];
            //                 draft.push(savedMovie);
            //                 return draft;
            //             })
            //         )
            //     }
            //     catch(err){
            //         console.log(err);
            //     }
            // },

        }),
        updateMovie: build.mutation<Movie, Movie>({
            query: (movie:Movie) => ({
                url: `/movies/${movie._id}`,
                method: 'PUT',
                body: movie,
            }),
            async onQueryStarted(movie:Movie,{dispatch, queryFulfilled}){
                const patchResult = dispatch(
                    movieApiSlice.util.updateQueryData('getMovies', undefined, (draft)=>{
                        draft = draft.map(item=> item._id === movie._id? movie : item)
                        return draft;
                    })
                )
                try{
                    const {data:updateMovie} = await queryFulfilled;
                    console.log("Updated", updateMovie);
                }
                catch{
                    patchResult.undo()
                }
            },
        }),
        deleteMovie: build.mutation<Movie, string | undefined>({
            query: (id) => ({
                url: `/movies/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id,{dispatch, queryFulfilled}){

                try{
                    const {data:deleteMovie} = await queryFulfilled;
                    console.log("Deleted", deleteMovie);
                    const patchResult = dispatch(
                        movieApiSlice.util.updateQueryData('getMovies', undefined, (draft)=>{
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
})

export const {useGetMoviesQuery, useGetMovieByIdQuery, useAddMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation} = movieApiSlice;