"use client";

import Link from "next/link";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import styles from "../styles/layout.module.css";
import {IconButton, Tooltip} from "@mui/material";
import {MovieCreation, TheatersOutlined} from "@mui/icons-material";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import {blue, cyan, red} from '@mui/material/colors';


export const Nav = () => {
  const fontSize = 35;
  const logoColor = "#4152AF";
  const homeColor = red[500];
  const movieColor = blue[500];
  const reviewColor = cyan[500];

  return (
      <nav className={"d-flex flex-column justify-content-between h-100"}>
          <ul className={`nav flex-column align-items-center mt-2`}>
              <li className={"nav-item"}>
                  <IconButton aria-label="logo">
                      <MovieCreation sx={{fontSize: fontSize, color: logoColor}}/>
                  </IconButton>
              </li>
          </ul>
          <ul className={`nav flex-column align-items-center`}>
              <li className={"nav-item"}>
                  <Link
                      className={`nav-link`}
                      href="/"
                  >
                      <Tooltip title={"home"} arrow placement="right">
                          <IconButton aria-label="menu">
                              <HomeOutlinedIcon sx={{fontSize: fontSize, color: homeColor}}/>
                          </IconButton>
                      </Tooltip>
                  </Link>
              </li>
              <li className={"nav-item"}>
                  <Link className={`nav-link`}
                        href="/movies"
                  >
                      <Tooltip title={"Movies"} arrow placement="right">
                          <IconButton aria-label="menu">
                              <TheatersOutlined sx={{fontSize: fontSize, color: movieColor}}/>
                          </IconButton>
                      </Tooltip>
                  </Link>
              </li>
              <li className={`nav-item`}>
                  <Link
                      className={`nav-link`}
                      href="/reviews"
                  >
                      <Tooltip title={"Reviews"} arrow placement="right">
                          <IconButton aria-label="menu">
                              <RateReviewOutlinedIcon sx={{fontSize: fontSize, color: reviewColor}}/>
                          </IconButton>
                      </Tooltip>
                  </Link>
              </li>
          </ul>
          <ul className={`nav flex-column align-items-center mb-3`}>
              <li className={`nav-item`}>
                  <Link className={`${styles.logo}`} href={"/"}>
                      H
                  </Link>
              </li>
          </ul>
      </nav>
  );
};
