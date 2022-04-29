import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../static/img/NEXTRAIL.svg";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "../static/css/NavBar.css";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginTop: "10px",
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#242038",
    fontSize: "16px",
    fontWeight: "550",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "#FFFFFF",
      borderBottom: "1px solid white",
    },
  },

  linkbtn: {
    backgroundColor: "#DC532D",
    color: "#000",
    width: "100px",
    height: "45px",
    fontSize: "14px",
    marginTop: "-12px",
    textDecoration: "none",
    marginLeft: theme.spacing(5),
    "&:hover": {
      backgroundColor: "#FFF",
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  function getCol(curr) {
    const location = useLocation();
    if (location.pathname === curr) {
      return "#FFF";
    }
  }
  return (
    <AppBar position="relative" style={{ background: "#388087" }}>
      <CssBaseline />
      <Toolbar>
        <Box>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </Box>
        <Box
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            color: "#242038",
          }}
        >
          <h4>Hello, {localStorage.getItem("user")}!</h4>
        </Box>
        <div className={classes.navlinks} style={{ marginLeft: "auto" }}>
          <Link to="/" className={classes.link} style={{ color: getCol("/") }}>
            Book Ticket
          </Link>

          <Link
            to="/pnr"
            className={classes.link}
            style={{ color: getCol("/pnr") }}
          >
            PNR Status
          </Link>

          <Link
            to="/train"
            className={classes.link}
            style={{ color: getCol("/train") }}
          >
            Search Trains
          </Link>
          <div className="dropdown">
            <Link
              to="#"
              className={classes.link}
              style={{ color: getCol("/bookings") }}
            >
              Your Journeys
            </Link>
            <div className="dropdown-content">
              <a href="/past">Past Journeys</a>
              <a href="/upcoming">Upcoming Journeys</a>
            </div>
          </div>
          {localStorage.getItem("isAuth")==="true" ? (
            <LogoutButton logout={props.logout} className={classes.linkbtn} />
          ) : (
            <LoginButton className={classes.linkbtn} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
