import React from "react";
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, CssBaseline, makeStyles, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from '../assets/NEXTRAIL.svg'

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
        }
    }
}));

const Navbar = () => {
    const classes = useStyles();
    function getCol(curr) {
        const location = useLocation()
        if((location.pathname === curr)) {
            return '#FFF'
        }
    }

    return (
        <AppBar position="static" style={{background: "#388087"}}>
            <CssBaseline />
            <Toolbar>
                <Box>
                    <img src={Logo} alt="logo"/>
                </Box>

                <div className={classes.navlinks} style={{ marginLeft: "auto" }}>
                    <Link to="/" className={classes.link}  style={{color:getCol("/")}}>
                        Home
                    </Link>
                    
                    <Link to="/pnrstatus" className={classes.link} style={{color:getCol("/pnrstatus")}}>
                        PNR Status
                    </Link>

                    <Link to="/trains" className={classes.link} style={{color:getCol("/trains")}}>
                        Trains
                    </Link>

                    <Link to="/tickets" className={classes.link} style={{color:getCol("/tickets")}}>
                        Tickets
                    </Link>

                    <Button component={Link} to="/login" variant="contained" className={classes.linkbtn} style={{background:getCol("/login")}}>
                        Log In
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;