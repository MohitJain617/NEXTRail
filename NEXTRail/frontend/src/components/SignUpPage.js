import React, { useState } from "react";
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
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ERROR } from "./AlertTypes";

function SignUpPage(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [add_1, setAdd_1] = useState("");
  const [add_2, setAdd_2] = useState("");
  const [pin, setPin] = useState("");
  const [number, setNumber] = useState("");
  
  const navigate = useNavigate();

  function registerUser(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "add_1": add_1,
        "add_2": add_2,
        "pin": pin,
        "number": number,
      }),
    };
    fetch("/accounts/register/", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          return Promise.reject(data.error);
        }
        else{
          localStorage.setItem('token', data.token)
          navigate("/");
        }
      })
      .catch((error) => {
        props.sendAlert(error,ERROR);
      });
  }
  function changeValue(e) {
    if (!isNaN(e.target.value)) {
      setNumber(e.target.value);
    }
  }
  function changePin(e) {
    if (!isNaN(e.target.value)) {
      setPin(e.target.value);
    }
  }

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
            <form onSubmit={registerUser}>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={0} align="center" direction="row">
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      label="Username"
                      variant="outlined"
                      required
                      value={userName}
                      onChange={(e) => (setUserName(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      label="Password"
                      variant="outlined"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => (setPassword(e.target.value))}
                    />
                  </Grid>
                </Grid>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={0} align="center" direction="row">
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      label="First Name"
                      variant="outlined"
                      value={firstName}
                      required
                      onChange={(e) => (setFirstName(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="textboxsmall"
                      label="Last Name"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => (setLastName(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <div style={{ marginTop: "20px" }}>
                  <Grid container spacing={2} align="center" direction="column">
                    <Grid item xs={16} marginTop="20px">
                      <TextField
                        className="textboxbig"
                        label="Email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={16} marginTop="20px">
                      <TextField
                        className="textboxbig"
                        label="Address Line 1"
                        variant="outlined"
                        value={add_1}
                        onChange={(e) => (setAdd_1(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={16} marginTop="20px">
                      <TextField
                        className="textboxbig"
                        label="Address Line 2"
                        variant="outlined"
                        value={add_2}
                        onChange={(e) => (setAdd_2(e.target.value))}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Grid container spacing={0} align="center" direction="row">
                    <Grid item xs={6}>
                      <TextField
                        className="textboxsmall"
                        label="Pincode"
                        variant="outlined"
                        value={pin || ''}
                        inputProps={{
                          maxLength: 6,
                        }}
                        onChange={changePin}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className="textboxsmall"
                        label="Number"
                        variant="outlined"
                        value={number || ''}
                        inputProps={{
                          maxLength: 10,
                        }}
                        onChange={changeValue}
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
                      type="submit"
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default SignUpPage;
