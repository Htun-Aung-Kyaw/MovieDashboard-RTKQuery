"use client";
import {useRouter} from "next/navigation";
import {Review} from "@/lib/features/reviews/reviewApiSlice";
import { useAppSelector} from "@/lib/hooks";
import {selectMovies} from "@/lib/features/movies/movieSlice";
import {Movie} from "@/lib/features/movies/movieApiSice";;
import {IconButton, Tooltip} from "@mui/material";
import {InfoOutlined, KeyboardBackspace} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import styles from "./movies.module.css";
import {useState} from "react";
import MovieForm from "@/app/components/movies/MovieForm";
import {selectReview} from "@/lib/features/reviews/reviewSlice";


export default function MovieDetailUI({id}: {id: string})
{
    const [show, setShow] = useState(false);
    const [edit] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const router = useRouter();
    function backBtnHandler() {
        router.push("/movies");
    }

    const moviesList = useAppSelector(selectMovies);


    const movie = moviesList.find((movie: Movie) => movie._id === id);
    const review = useAppSelector(selectReview).find((review: Review) => review.movie === id);

    function editHandler() {
        handleShow();
    }

    return (
        <div className={"card w-50"}>
            <div className={"card-header text-center"}>
                <h5 className={"m-0"}>
                    <IconButton color="success">
                        <InfoOutlined sx={{fontSize: "2rem"}}/>
                    </IconButton>
                </h5>
            </div>
            <div className="card-body">
                <p><b>Title:</b> {movie?.title}</p>
                <p><b>Director:</b> {movie?.director.name}</p>
                <p><b>Year:</b> {movie?.year}</p>
                {!review ? <p className={"alert alert-danger p-2 m-1"}>No review yet!</p> :
                    <><p><b>Rating: </b>{review.rating}</p><p><b>Review: </b>{review.review}</p></>
                }
            </div>
            <div className={"card-footer text-center"}>
                {/*<button type={"button"} className={"btn btn-primary"} onClick={backBtnHandler}>Back</button>*/}
                <Tooltip title={"Back"} className={styles.mr}>
                    <IconButton color="default" onClick={backBtnHandler}>
                        <KeyboardBackspace sx={{fontSize: "2rem"}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Edit"}>
                    <IconButton color="info" onClick={editHandler}>
                        <EditIcon sx={{fontSize: "2rem"}}/>
                    </IconButton>
                </Tooltip>
            </div>
            <MovieForm movie={movie} show={show} handleClose={handleClose} edit={edit}/>
        </div>
    )
}