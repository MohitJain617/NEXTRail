import React, { useEffect } from "react";
import {
  Typography,
  AppBar,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import TicketClassButton from "./TicketClassButton.js";

import TrainCardAvailability from "./TrainAvailabilityCard";
import "../static/css/TripCard.css";
import { ERROR } from "./AlertTypes";
import { useNavigate } from "react-router-dom";
import { getFormLabelUtilityClasses } from "@mui/material";

const TrainResults = (props) => {
  const data = props.data;
  const navigate = useNavigate();
  const [classType, setClassType] = React.useState("");
  const [classDetails, setClassDetails] = React.useState(data.class_types);

  function getfare(code){
    const item = classDetails.find(({class_type}) => class_type === code);
    return item.fare;
  }

  function bookTicket() {
    if (classType === "") {
      props.sendAlert("Please Select a Class!", ERROR);
    } else if (localStorage.getItem("isAuth") === "false") {
      navigate("/login");
    } else {
      navigate("/payment", { state: { 
		  classType: classType,
		  train_no: data.train_no,
      train_name: data.train_name,
		  src: data.src.st_code,
		  dod: data.src.date.substr(0,10),
		  dest: data.dest.st_code,
      doa: data.dest.date.substr(0,10),
		  user: localStorage.getItem("user"),
		  pcount: data.pcount,
		  pantry: data.pantry_avl,
      fare: getfare(classType)
	 } });
    }
  }
  function getSeatAvailability() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        src: data.src.st_code,
        dest: data.dest.st_code,
        doj: data.src.date.substr(0, 10),
        pcount: data.pcount,
        dist: data.dist,
        train_no: data.train_no,
      }),
    };
    fetch("/data/classdetails/", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          return Promise.reject(data.error);
        } else {
          setClassDetails(data);
        }
      })
      .catch((error) => {
        props.sendAlert("No Trains Found!", ERROR);
      });
  }
  useEffect(() => {
    getSeatAvailability();
  }, [data]);
  return (
    <div className="zoom">
      <Card sx={{ maxWidth: 200 }}>
        <CardContent>
          {/* Contains the Train Details */}
          <TrainCardAvailability data={data} />

          {/* Class Wise Buttons */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {classDetails.map((val, index) => (
              <TicketClassButton
                trainClass={val}
                classes={props.classes}
                selected={classType}
                setSelected={setClassType}
              />
            ))}
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ paddingTop: "10px" }}
          >
            <Grid item>
              <Button
                onClick={bookTicket}
                style={{
                  display: "block",
                  textAlign: "left",
                  backgroundColor: "#DC532D",
                  borderRadius: 5,
                }}
              >
                <Typography
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "bold",
                    float: "right",
                    clear: "both",
                    textTransform: "none",
                  }}
                >
                  Book Now
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainResults;
