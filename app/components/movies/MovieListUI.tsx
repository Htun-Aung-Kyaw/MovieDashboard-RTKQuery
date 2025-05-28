"use client";

import MovieUI from "@/app/components/movies/MovieUI";
import {Table} from "react-bootstrap";
import styles from "./movies.module.css";
import { useAppSelector} from "@/lib/hooks";
import { selectMovies} from "@/lib/features/movies/movieSlice";

export default function MovieListUI() {

    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //    dispatch(loadMovies());
    // },[]);

    const moviesItem = useAppSelector(selectMovies);
    return (
        <div className={styles.movieList}>
            <h5 className={`alert alert-info ${styles.stickyTitle}`}>Total Movies: {moviesItem.length}</h5>
            <Table hover className="align-middle position-relative">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Movie Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th className={"text-center"}>Rating</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moviesItem?.map((movie, index) => <MovieUI key={movie?._id} movie={movie} index={++index}/>)
                    }
                </tbody>
            </Table>
        </div>
    )
}