import React, { Component } from "react";
import {
  Typography,
  AppBar,
  Card,
  CardAction,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Box,
  TextField,
} from "@material-ui/core";

function PnrPageDetails() {
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginTop: "180px",
        }}
      >
        <Typography
          style={{ fontWeight: 550 }}
          variant="h1"
          align="center"
          position="relative"
          gutterBottom
        >
          PNR Status
        </Typography>
        <div>
          <Grid container spacing={0} justifyContent="center">
            <Grid item>
              <TextField
                style={{
                  width: "302px",
                  height: "55px",
                  fontSize: "18px",
                  backgroundColor: "#FFFFFF",
                }}
                inputProps={{
                  maxLength: 10,
                }}
                id="outlined-basic"
                label="Enter PNR Number"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                style={{
                  backgroundColor: "#DC532D",
                  color: "#FFFFFF",
                  width: "88px",
                  height: "55px",
                  fontSize: "14px",
                }}
                variant="contained"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default PnrPageDetails;
