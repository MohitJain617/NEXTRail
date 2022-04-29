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
import "../static/css/Transitions.css";
import TripCard from "./TripCard";

function TrainDetails(props) {
  const [pnrId, setPnrId] = React.useState("");
  const [result, setResult] = React.useState(false);
  const [fadeIn, setFadeIn] = React.useState(0);
  const [data, setData] = React.useState("");
  const [moveUp, setMoveUp] = React.useState(0);

  function changeValue(e) {
    if (!isNaN(e.target.value)) {
      setPnrId(e.target.value);
    }
  }

  function handleSearchPressed() {
    if (pnrId.length < 10) {
      props.sendAlert("Incomplete PNR No.", WARNING);
    } 
    else if(data == "" || data.pnr != pnrId)  {
      setFadeIn(0);

      fetch("/data/pnr/" + "?pnr=" + pnrId)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          } else {
            setData(data);
            setResult(true);
            setFadeIn(1);
            setMoveUp(1);
          }
        })
        .catch((error) => {
          setResult(false)
          setData("")
          props.sendAlert("Invalid PNR No.", ERROR);
        });
    }
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
            PNR Status
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
                    if (e.code === "Enter" && parseInt(pnrId) >= 1000000000) {
                      handleSearchPressed();
                    }
                  }}
                  value={pnrId}
                  onChange={changeValue}
                  inputProps={{
                    maxLength: 10,
                  }}
                  id="outlined-basic"
                  label="Enter PNR No."
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
          {result && <TripCard data={data} />}
        </div>
      </div>
    </>
  );
}
export default TrainDetails;
