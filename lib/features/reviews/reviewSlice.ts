import {Review} from "@/lib/features/reviews/reviewApiSlice";
import {mockReview} from "@/lib/mockReview";
import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface ReviewState{
    items: Review[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ReviewState = {
    items: mockReview,
    status: 'idle',
}

export const reviewSlice = createAppSlice({
    name: "reviews",
    initialState,
    reducers: (create) => ({
        addReview: create.reducer((state, action: PayloadAction<Review>)=>{
           state.items.push(action.payload);
        }),
        deleteReview: create.reducer((state, action: PayloadAction<Review | undefined>) => {
            state.items = state.items.filter(item => item._id !== action.payload?._id);
        }),
        updateReview: create.reducer((state, action: PayloadAction<Review>) => {
            state.items = state.items.map(item => item._id === action.payload._id? action.payload : item);
        })
    }),
    selectors:{
        selectReview: (state) => state.items,
        selectStatus: (state) => state.status,
    }
})

export const {addReview, deleteReview, updateReview } = reviewSlice.actions;
export const {selectReview, selectStatus} = reviewSlice.selectors;