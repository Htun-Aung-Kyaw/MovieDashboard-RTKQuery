"use client";

import styles from "./movies.module.css";
import {useGetMoviesQuery} from "@/lib/features/movies/movieApiSlice";
import {useMemo, useState} from "react";
import SearchBar from "@/app/components/movies/SearchBar";
import MoviesTable from "@/app/components/movies/MoviesTable";
import IsAuth from "@/app/components/auth/IsAuth";
// import {mockMovies} from "@/lib/mockMovies";
// import {useEffect} from "react";
// import {IconButton, Tooltip} from "@mui/material";
// import {AddCircle} from "@mui/icons-material";
// import {blue} from "@mui/material/colors";

function MovieListUI() {

    const {data, error, isError, isLoading, isSuccess}  = useGetMoviesQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('Original');

    const filteredMovies = useMemo(() => {
        const moviesToManipulate = data || []; // this is important to solve ts error undefined

        const filter = moviesToManipulate.filter((movie) => {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (sort !== 'Original') {
            return [...filter].sort((a, b) => {
                const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return sort === 'Ascending' ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sort === 'Ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        else {
            return filter;
        }
    },[data, searchTerm, sort]);


    // For adding data to server.
    // const [addMovieApi] = useAddMovieMutation();
    // const addToServer = (movie: Movie) => addMovieApi(movie);
    // const moviesList = useAppSelector(selectMovies);
    // useEffect(()=>{
    //     moviesList.map((movie) => addToServer(movie));
    // },[]);

    if (isError){
        if('status' in error){
            const errMsg:any = error.data;
            return (
                <div className={styles.movieList+" "+styles.center}>
                    {
                        error.status == "FETCH_ERROR" ? <h5>Check your server connection</h5> :
                            errMsg? <h5>{errMsg}</h5> : <h5>Error | Something went wrong.</h5>
                    }
                </div>
            )
        }
    }

    if (isLoading){
        return (
            <h4 className={styles.movieList + " " + styles.center}>Loading...</h4>
        )
    }

    if (isSuccess) {
        return (
            <div className={styles.movieList}>
                <h5 className={`alert alert-info ${styles.stickyTitle}`}>Total Movies: {filteredMovies?.length}</h5>
                <SearchBar className={`${styles.stickySearch}`}
                           searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                           sort={sort} setSort={setSort}/>
                <MoviesTable movies={filteredMovies}/>
            </div>
        )
    }
}

export default IsAuth(MovieListUI);