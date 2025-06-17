import MovieListUI from "@/app/components/movies/MovieListUI";
import NewMovie from "@/app/components/movies/NewMovie";
import {Metadata} from "next";
import styles from "@/app/components/movies/movies.module.css";
import {mockMovies} from "@/lib/mockMovies";
import {useAddMovieMutation} from "@/lib/features/movies/movieApiSlice";

export default function Page()
{

    return (
        <div className={styles.moviesContainer}>
            <NewMovie/>
            <MovieListUI/>
        </div>
    );
}

export const metadata: Metadata = {
    title: "Movies",
};