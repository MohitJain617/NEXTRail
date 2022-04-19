import React, { Component } from "react";
import { AppBar, Toolbar, Grid, Button, Box } from "@material-ui/core";
import Logo from "../static/img/NEXTRAIL.png";
import { Link } from "react-router-dom";
import NavBarButton from "./NavBarButton";

const navbutton = {
  textDecoration: "none",
  color: "#242038",
}

const appbarlogin = {
  marginTop: "5px",
  backgroundColor: '#DC532D',
  color: '#FFFDF8',
  width: "80px",
  height: "45px",
  fontSize: "14px"
}

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar style={{ background: "#388087" }}>
        <Toolbar position="relative">
        <img src={Logo} alt={"logo"}/>
          <div style={{ marginLeft: "auto" }}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item>
                <NavBarButton className="NavButtons" path="/" name="Home" active="true" /> 
              </Grid>
              <Grid item>
                <NavBarButton className="NavButtons" path="pnr/" name="PNR Status" buttwidth="110px" active="false"/>
              </Grid>
              <Grid item>
                <NavBarButton className="NavButtons" path="train/" name="Trains" active="false"/> 
                </Grid>
              <Grid item>
                <Button
                  style={{
                    width: "88px",
                    height: "55px",
                    fontSize: "14px",
                  }}
                  variant="text"
                >
                  Tickets
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={appbarlogin}
                  variant="contained"
                >
                  <Link to="login/" style={navbutton}>Log In</Link>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
