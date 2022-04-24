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
import { Link, useNavigate } from "react-router-dom";

function LogInPage(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  // function loginUser(e) {
  //   e.preventDefault();
  //   
  // }

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
            <form onSubmit={(e) => {
              e.preventDefault();
              props.login(userName,password)
              }}>
              <div style={{ marginTop: "50px" }}>
                <Grid container spacing={2} align="center" direction="column">
                  <Grid item xs={16}>
                    <TextField
                      className="textbox"
                      label="Username"
                      variant="outlined"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={16}>
                    <TextField
                      className="textbox"
                      label="Password"
                      variant="outlined"
                      value={password}
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={16} style={{ marginTop: "30px" }}>
                    <Button
                      className="loginbutt"
                      style={{ backgroundColor: "#DC532D" }}
                      variant="contained"
                      type="submit"
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
                      <Link to="/signup/" className="navbutton">
                        Sign Up
                      </Link>
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

export default LogInPage;
