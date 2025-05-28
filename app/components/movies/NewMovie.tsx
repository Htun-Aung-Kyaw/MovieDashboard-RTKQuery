"use client";

import {useState} from "react";
import MovieForm from "@/app/components/movies/MovieForm";
import styles from './movies.module.css';
import {IconButton, Tooltip} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {blue} from "@mui/material/colors";

export default function NewMovie() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={`${styles.end} ${styles.sticky} ${styles.pr} d-flex align-items-center justify-content-center`}>
            <p className="fw-bold p-2">Add new movies</p>
            <Tooltip title="Add" arrow placement="right">
                <IconButton color="primary" onClick={handleShow}>
                    <AddCircle sx={{ color: blue[500] }}></AddCircle>
                </IconButton>
            </Tooltip>

            <MovieForm show={show} handleClose={handleClose} />
        </div>
    )
}