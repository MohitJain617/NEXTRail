import React from "react";
import {
  Typography,
  AppBar,
  MenuItem,
  Card,
  CardActions,
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
import TripCard from "./TripCard.js";
import { ERROR, INFO } from "./AlertTypes.js";

export default function BookingPage(props) {
  const [data, setData] = React.useState("");
  const [result, setResult] = React.useState(false);

  function loadTickets() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("user"),
        past: props.past,
      }),
    };
    fetch("/data/tickets/", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          return Promise.reject(data.error);
        } else {
          setResult(true);
          setData(data);
        }
      })
      .catch((error) => {
        setResult(false);
        setData("");
        props.sendAlert("Cannot Find Tickets", INFO);
      });
  }
  React.useEffect(() => {
    loadTickets();
  }, [props.past]);


  return (
    <div>
      <Box
        maxWidth="sm"
        style={{
          marginTop: "0px",
          background: "#C4C4C4",
          overflowY: "hidden",
          width: "100%",
          height: "100px",
        }}
      >
        <Typography
          style={{ fontWeight: 550, marginTop: "20px" }}
          variant="h3"
          align="center"
          position="relative"
          gutterBottom
        >
          {props.past === "true" ? "Past Journeys" : "Upcoming Journeys"}
        </Typography>
      </Box>
      <div style={{ marginTop: "50px" }}>
        {/* add cards here */}
        {result ? data.map((val) => <TripCard data={val} cancel={props.past !== "true"} sendAlert={props.sendAlert}  />) : ""}
      </div>
    </div>
  );
}
