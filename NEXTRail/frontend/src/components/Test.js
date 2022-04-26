import React, { Component } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { ERROR, WARNING } from "./AlertTypes";
import { useNavigate } from "react-router-dom";
import "../static/css/Test.css";

function TrainDetails(props) {
  const [trainId,setTrainId] = React.useState('');
  const [moveUp,setMoveUp] = React.useState(0);
  const navigate = useNavigate();

  function changeValue(e){
    if(!isNaN(e.target.value)){
      setTrainId(e.target.value)
    }
  }

  function handleSearchPressed() {
    if(trainId.length < 5){
      props.sendAlert("Incomplete Train No.",WARNING)
    }
    else{
      setMoveUp(1);
      fetch("/data/train/"+ "?id=" +trainId)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          } else  {
            console.log(data)
            // navigate("/trains/",{state:{data:data}});
          }
        })
        .catch((error) => {
      props.sendAlert("Cannot Find Train",ERROR)
        });
    }
    // todo catch 404 in case of 200 do more fetches for sched and timetable
}
  return (
    <div
      className="search_field"
      moveUp={moveUp}
    >
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
                onKeyDown={(e)=>{
                  if(e.code === "Enter" && parseInt(trainId) >= 10000){
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
    </div>
  );
}
export default TrainDetails;

/*
    handleTrainNoChanged(e) {
        this.setState({
            train_id: e.target.value,
        });
    }

    
    handleSeatsPressed() {
        console.log("requesting /data/train/seats")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.state.train_id,
            }),
        };
        fetch("/data/train/seats",requestOptions).then((response) => response.json())
        .then((data) => console.log(data[75]))
        // todo catch 404 in case of 200 do more fetches for sched and timetable
    }
    
    handleSearchPressed2() {
        // GET request using fetch with error handling
        console.log("/data/train/"+this.state.train_id)
        fetch("/data/train/"+this.state.train_id)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log(data)
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }
*/
