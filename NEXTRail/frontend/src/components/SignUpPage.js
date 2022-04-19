import React from "react";
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/Lock";
import "../static/css/SignUpPage.css";

function SignUpPage() {
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginTop: "80px",
        }}
      >
        <Card style={{ display: "block", height: "680px", width: "550px" }}>
          <CardContent>
            <div align="center">
              <Avatar
                sx={{ m: 1 }}
                style={{ backgroundColor: "#388087", marginTop: "20px" }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                style={{ fontWeight: 500, color: "#242038", marginTop: "1px" }}
                variant="h4"
                align="center"
                position="relative"
                gutterBottom
              >
                Sign Up
              </Typography>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Grid container spacing={0} align="center" direction="row">
                <Grid item xs={6}>
                  <TextField
                    className="textboxsmall"
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="textboxsmall"
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={2} align="center" direction="column">
                  <Grid item xs={16} marginTop="20px">
                    <TextField
                      className="textboxbig"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={16} marginTop="20px">
                    <TextField
                      className="textboxbig"
                      id="outlined-basic"
                      label="Address Line 1"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={16} marginTop="20px">
                    <TextField
                      className="textboxbig"
                      id="outlined-basic"
                      label="Address Line 2"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={0} align="center" direction="row">
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      id="outlined-basic"
                      label="Pincode"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      id="outlined-basic"
                      label="Number"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={0} align="center" direction="row">
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={2} align="center" direction="column">
                <Grid item xs={16} style={{ marginTop: "30px" }}>
                  <Button
                    className="loginbut"
                    style={{ backgroundColor: "#DC532D" }}
                    variant="contained"
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default SignUpPage;
