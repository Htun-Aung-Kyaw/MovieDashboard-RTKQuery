import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface User{
    _id?: string;
    username: string;
    email: string;
    password: string;
    __v?: number;
}

// export interface UserState {
//     items: User[],
//     status: "idle" | "loading" | "failed",
// }

export interface AuthResponse{
    token: string;
}

const initialState: AuthResponse = {
    token: "",
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: (create) => ({
        login: create.reducer((state, action: PayloadAction<AuthResponse>) => {
                state.token = action.payload.token;
        }),
        logout: create.reducer((state)=>{
                state.token = "" ;
        })
    }),
    selectors: {
        selectAuth: (state) => state.token,
    }
});

export const {login, logout} = authSlice.actions;
export const {selectAuth} = authSlice.selectors;