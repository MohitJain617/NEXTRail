import React from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/Lock";
import "../static/css/LogInPage.css";
import { Link } from "react-router-dom";

function LogInPage() {
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginTop: "130px",
        }}
      >
        <Card style={{ display: "block", height: "465px" }}>
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
                variant="h3"
                align="center"
                position="relative"
                gutterBottom
              >
                Log In
              </Typography>
            </div>
            <div style={{ marginTop: "50px" }}>
              <Grid container spacing={2} align="center" direction="column">
                <Grid item xs={16}>
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={16}>
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={16} style={{ marginTop: "30px" }}>
                  <Button
                    className="loginbutt"
                    style={{ backgroundColor: "#DC532D" }}
                    variant="contained"
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: "-10px" }}>
                  <Button
                    className="signup"
                    style={{ color: "#242038" }}
                    variant="text"
                  >
                    <Link to='/signup/' className="navbutton">
                      Sign Up
                    </Link>
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

export default LogInPage;
