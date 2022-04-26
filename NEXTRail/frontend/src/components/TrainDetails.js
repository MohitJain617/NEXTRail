import React, { Component } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  Box,
} from "@material-ui/core";
import { ERROR, WARNING } from "./AlertTypes";
import { useNavigate } from "react-router-dom";
import "../static/css/Test.css";
import TrainDetailsResults from "./TrainDetailsResult";

function TrainDetails(props) {
  const [trainId, setTrainId] = React.useState("");
  const [result, setResult] = React.useState(false);
  const [fadeIn, setFadeIn] = React.useState(0);
  const [data, setData] = React.useState("");
  const [moveUp, setMoveUp] = React.useState(0);

  function changeValue(e) {
    if (!isNaN(e.target.value)) {
      setTrainId(e.target.value);
    }
  }

  function handleSearchPressed() {
    if (trainId.length < 5) {
      props.sendAlert("Incomplete Train No.", WARNING);
    } 
    else if(data == "" || data.id != trainId)  {
      setFadeIn(0)
      fetch("/data/train/" + "?id=" + trainId)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          } else {
            setResult(true);
            setData(data);
            setFadeIn(1);
            setMoveUp(1);
            // navigate("/trains/",{state:{data:data}});
          }
        })
        .catch((error) => {
          setResult(false)
          setData("")
          props.sendAlert("Cannot Find Train", ERROR);
        });
    }
    // todo catch 404 in case of 200 do more fetches for sched and timetable
  }
  return (
    <>
      <div>
        <Box className="box" moveDown={moveUp} maxWidth="sm"></Box>
      </div>
      <div className="search_field" moveUp={moveUp}>
        <Container
          maxWidth="sm"
          style={{
            marginTop: "180px",
          }}
        >
          <Typography
            style={{ fontWeight: 550 }}
            variant="h2"
            align="center"
            position="relative"
            gutterBottom
          >
            Search Trains
          </Typography>
          <div>
            <Grid container spacing={0} justifyContent="center">
              <Grid item>
                <TextField
                  style={{
                    width: "302px",
                    height: "55px",
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter" && parseInt(trainId) >= 10000) {
                      handleSearchPressed();
                    }
                  }}
                  value={trainId}
                  onChange={changeValue}
                  inputProps={{
                    maxLength: 5,
                  }}
                  id="outlined-basic"
                  label="Enter Train No."
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
                  onClick={handleSearchPressed}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <div
          style={{ marginTop: "50px" }}
          className="search_result"
          fadeIn={fadeIn}
        >
          {result && <TrainDetailsResults data={data} />}
        </div>
      </div>
    </>
  );
}
export default TrainDetails;
