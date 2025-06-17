"use client";

import Link from "next/link";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import styles from "../styles/layout.module.css";
import {IconButton, Tooltip} from "@mui/material";
import {Logout, MovieCreation, TheatersOutlined} from "@mui/icons-material";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import {blue, cyan, red} from '@mui/material/colors';
import LoginIcon from '@mui/icons-material/Login';
import {useSelector} from "react-redux";
import {selectAuth} from "@/lib/features/auth/authSlice";


export const Nav = () => {
  const fontSize = 30;
  const loginColor = "#4152AF";
  const homeColor = red[500];
  const movieColor = blue[500];
  const reviewColor = cyan[500];

  const auth = useSelector(selectAuth);
  // console.log("Nav auth: ",auth);

  return (
      <nav className={"d-flex flex-column justify-content-between h-100"}>
          <ul className={`nav flex-column align-items-center mt-2`}>
              <li className={"nav-item"}>
                  <Link
                      className={`nav-link`}
                      href="/login"
                  >
                      <Tooltip title={"Login"} arrow placement="right">
                          <IconButton aria-label="login">
                              <LoginIcon sx={{fontSize: 25, color: loginColor}}/>
                          </IconButton>
                      </Tooltip>
                  </Link>
              </li>
              <Link
                  className={`nav-link`}
                  href={auth? "/logout?auth=true" : "/logout"}
              >
                  <li className={"nav-item"}>
                      <Tooltip title={"Logout"} arrow placement="right">
                          <IconButton aria-label="logout">
                              <Logout sx={{fontSize: 25, color: homeColor}}/>
                          </IconButton>
                      </Tooltip>
                  </li>
              </Link>
          </ul>
          <ul className={`nav flex-column align-items-center`}>
              <li className={"nav-item"}>
                  <Link
                      className={`nav-link`}
                      href={auth? "/?auth=true" : "/"}
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
                        href={auth? "/movies?auth=true" : "/movies"}
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
                      href={auth? "/reviews?auth=true" : "/reviews"}
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
                  <Link className={`${styles.logo}`} href={auth? "/?auth=true" : "/"}>
                      H
                  </Link>
              </li>
          </ul>
      </nav>
  );
};
