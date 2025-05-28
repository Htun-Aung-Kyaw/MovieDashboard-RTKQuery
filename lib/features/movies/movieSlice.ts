import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import { Movie} from "./movieApiSice";
import {mockMovies} from "@/lib/mockMovies";

export interface MovieState{
    items: Movie[];
    status: "idle" | "loading" | "failed";
}

const initialState: MovieState = {
    items: mockMovies,
    status: "idle",
}

export const moviesSlice = createAppSlice({
    name: "movies",
    initialState,
    reducers: (create) => ({
        addMovie: create.reducer((state, action: PayloadAction<Movie>)=>{
            state.items.push(action.payload);
        }),
        deleteMovie: create.reducer((state, action: PayloadAction<Movie>)=>{
            state.items = state.items.filter(item => item._id !== action.payload._id);
        }),
        updateMovie: create.reducer((state, action: PayloadAction<Movie>)=>{
           state.items = state.items.map(item => item._id === action.payload._id? action.payload : item);
        }),
        loadMovies: create.asyncThunk(
            async () => {
                const response = await fetch('http://localhost:3000/api/movies'); // api call
                return await response.json();
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.items = action.payload; // state change
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    selectors: {
        selectMovies: (state) => state.items,
        selectStatus: (state) => state.status,
    }
})

export const {addMovie, deleteMovie, updateMovie, loadMovies } = moviesSlice.actions;
export const {selectMovies, selectStatus} = moviesSlice.selectors;