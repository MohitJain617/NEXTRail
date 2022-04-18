import React, { Component } from "react";
import {Typography, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";

export default class TrainDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            train_id:  "0",
        };
        this.handleTrainNoChanged = this.handleTrainNoChanged.bind(this);
        this.handleSearchPressed = this.handleSearchPressed.bind(this);
    }

    handleTrainNoChanged(e) {
        this.setState({
            train_id: e.target.value,
        });
    }

    handleSearchPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.state.train_id,
            }),
        };
        fetch("/data/train",requestOptions).then((response) => response.json())
        .then((data) => console.log(data))
        // todo catch 404 in case of 200 do more fetches for sched and timetable
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

    render(){
        return (
            <div>
            <Container maxWidth="sm" style={{
                        marginTop: '180px'
                    }}>
                        <Typography style={{ fontWeight:550 }} variant="h2" align="center" position="relative" gutterBottom>
                            Search Trains
                        </Typography>
                        <div>
                            <Grid container spacing = {0} justifyContent="center">
                                <Grid item>
                                    <TextField style={{
                                                width: "302px",
                                                height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            inputProps={{
                                                maxLength: 5,
                                            }}
                                            id="outlined-basic" label="Enter Train No." variant="outlined" />
                                </Grid>     
                                <Grid item>
                                    <Button style={{
                                                backgroundColor: "#DC532D",
                                                color: '#FFFFFF',
                                                width: "88px",
                                                height: "55px",
                                                fontSize: "14px"
                                            }}
                                        variant="contained">Search</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
        );
    }
}