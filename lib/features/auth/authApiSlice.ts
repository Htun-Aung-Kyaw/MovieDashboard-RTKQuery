import {movieApiSlice} from "@/lib/features/movies/movieApiSlice";
import {AuthResponse, User} from "@/lib/features/auth/authSlice";

const authApiSlice = movieApiSlice.injectEndpoints({
   endpoints: (build) => ({
       login: build.mutation<AuthResponse, User>({
           query: (user: User) => ({
               url: `/users/login`,
               method: 'POST',
               body: user,
           }),
       }),
       register: build.mutation<User, User>({
           query: (user: User) => ({
               url: `/users`,
               method: 'POST',
               body: user,
           }),
       })
   }),
    overrideExisting: true,
});

export const {useLoginMutation, useRegisterMutation} = authApiSlice;