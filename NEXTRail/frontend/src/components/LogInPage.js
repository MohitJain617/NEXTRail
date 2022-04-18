import React, { Component } from "react";
import {Typography, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";

export default class LogInPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container
          maxWidth="sm"
          style={{
            marginTop: "170px",
          }}
        >
          <Typography
            style={{ fontWeight: 650, color: "#242038" }}
            variant="h1"
            align="center"
            position="relative"
            gutterBottom
          >
            Log In
          </Typography>
          <div>
            <Grid container spacing={2} align="center" direction="column">
              <Grid item xs={16}>
                <TextField
                  style={{
                    width: "450px",
                    height: "55px",
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                  }}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={16}>
                <TextField
                  style={{
                    width: "450px",
                    height: "55px",
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                  }}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={16}>
                <Button
                  style={{
                    backgroundColor: "#DC532D",
                    color: "#FFFFFF",
                    width: "225px",
                    height: "45px",
                    fontSize: "14px",
                  }}
                  variant="contained"
                >
                  Log In
                </Button>
              </Grid>
              <Grid item style={{ marginTop: "-10px" }}>
                <Button
                  style={{
                    color: "#242038",
                    width: "112px",
                    height: "20px",
                    fontSize: "12px",
                  }}
                  variant="text"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}
