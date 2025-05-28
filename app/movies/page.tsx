import MovieListUI from "@/app/components/movies/MovieListUI";
import NewMovie from "@/app/components/movies/NewMovie";
import {Metadata} from "next";
import styles from "@/app/components/movies/movies.module.css";

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