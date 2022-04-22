import React from "react";
import { useLocation } from "react-router-dom";
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
    width: "80px",
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

const Navbar = () => {
<<<<<<< HEAD
    const classes = useStyles();
    // const [scrolled, setScrolled] = React.useState(false);
    // const handleScroll = () => {
    //     const offset = window.scrollY;
    //     if (offset > 200) {
    //         setScrolled(true);
    //     }
    //     else {
    //         setScrolled(false);
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    // })
    // let navbarClasses = ['navbar'];
    // if (scrolled) {
    //     navbarClasses.push('scrolled');
    // }

    function getCol(curr) {
        const location = useLocation()
        if ((location.pathname === curr)) {
            return '#FFF'
        }
=======
  const classes = useStyles();
  function getCol(curr) {
    const location = useLocation();
    if (location.pathname === curr) {
      return "#FFF";
>>>>>>> 176196104c025e62d281f6bbb8f1adeaa53112d8
    }
  }

<<<<<<< HEAD
    return (
        <AppBar position="relative" style={{ background: "#388087" }}>
            <CssBaseline />
            <Toolbar>
                <Box>
                    <img src={Logo} alt="logo" />
                </Box>

                <div className={classes.navlinks} style={{ marginLeft: "auto" }}>
                    <Link to="/" className={classes.link} style={{ color: getCol("/") }}>
                        Home
                    </Link>

                    <Link to="/pnr" className={classes.link} style={{ color: getCol("/pnr") }}>
                        PNR Status
                    </Link>

                    <Link to="/train" className={classes.link} style={{ color: getCol("/train") }}>
                        Trains
                    </Link>

                    <Link to="/tickets" className={classes.link} style={{ color: getCol("/tickets") }}>
                        Tickets
                    </Link>

                    <Button component={Link} to="/login" variant="contained" className={classes.linkbtn} style={{ background: getCol("/login") }}>
                        Log In
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
=======
  return (
    <AppBar position="relative" style={{ background: "#388087" }}>
      <CssBaseline />
      <Toolbar>
        <Box>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </Box>
        <Box style={{
            marginLeft: "20px", 
            marginTop: "10px",
            color: "#242038"}}>
          <h4>Hello, cxsUJsnv.</h4>
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

          <Link
            to="/bookings"
            className={classes.link}
            style={{ color: getCol("/bookings") }}
          >
            Your Bookings
          </Link>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            className={classes.linkbtn}
            style={{ background: getCol("/login") }}
          >
            Log In
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
>>>>>>> 176196104c025e62d281f6bbb8f1adeaa53112d8
};

export default Navbar;
