import React, { Component } from "react";
import { Grid,Typography,TextField, Button } from "@material-ui/core";

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

    render(){
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Train Details
                    </Typography>
                </Grid>
                <Grid item xs={12} align="left">
                    <TextField
                     id="outlined-basic"
                     label="Train No." 
                     variant="outlined" 
                     required={true}
                     type="text"
                     onChange={this.handleTrainNoChanged}
                     inputProps={{
                        maxLength: 5,
                        style: { textAlign: "center" },
                      }}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleSearchPressed}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        );
    }
}