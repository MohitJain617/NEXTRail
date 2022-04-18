import React, { Component } from "react";
import { AppBar, Toolbar, Grid, Button } from "@material-ui/core";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar style={{ background: "#388087" }}>
        <Toolbar position="relative">
          <div style={{ marginLeft: "auto" }}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item>
                <Button
                  style={{
                    color: "#242038",
                    width: "88px",
                    height: "55px",
                    fontSize: "14px",
                  }}
                  variant="text"
                >
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    color: "#FFFFFF",
                    width: "110px",
                    height: "55px",
                    fontSize: "14px",
                  }}
                  variant="text"
                >
                  PNR Status
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    color: "#242038",
                    width: "88px",
                    height: "55px",
                    fontSize: "14px",
                  }}
                  variant="text"
                >
                  Trains
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    color: "#242038",
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
                  style={{
                    backgroundColor: "#DC532D",
                    color: "#FFFFFF",
                    width: "80px",
                    height: "45px",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                  variant="contained"
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
