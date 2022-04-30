import React from "react";
import {Typography,List, ListItem, ListItemText, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";

const categoryDB = [
  {
      label: "All Classes",
      value: 1
  },
  {
      label: "AC 2 Tier",
      value: 2
  },
  {
      label: "AC 3 Tier",
      value: 3
  },
  {
      label: "AC 3 Tier Economy",
      value: 4
  },
  {
      label: "AC Chair Car",
      value: 5
  },
  {
      label: "Second Seating",
      value: 6
  },
  {
      label: "Executive Chair Car",
      value: 7
  },
  {
      label: "AC 1 Tier",
      value: 8
  },
  {
      label: "Sleeper Class",
      value: 9
  },
]

const mealOptions = [
  {
    value: 'Veg',
    label: 'Veg',
  },
  {
    value: 'Non Veg',
    label: 'Non Veg',
  },
];

const gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];

const App = () => {
    return(
        <>
        <div>
            <CssBaseline />
            <AppBar style={{ background: '#388087' }}>
                <Toolbar position="relative">
                    <Box
                        component="img"
                        alt="Your logo."
                        src={Logo}
                    />
                    <div style = {{marginLeft: 'auto'}}>
                        <Grid container spacing = {0}>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Helvetica"
                                        }}
                                    variant="text" className = "element">Home</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "110px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">PNR Status</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">Trains</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#FFFFFF',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">Tickets</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            backgroundColor: "#DC532D",
                                            color: '#FFFFFF',
                                            width: "88px",
                                            height: "53px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="contained">Log In</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            {/* relevant part  */}
            <div style= {{marginTop:"40px", marginLeft:"20%", marginRight:"20%"}}>
            <Card sx={{ maxWidth: 200 }}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent>
                    <form>
                      <Grid container spacing = {2}>
                        <Grid item xs = {6}>
                        <TextField id="first-name"  fullWidth label="First Name" variant="outlined"  />
                        </Grid>
                        <Grid item xs = {6}>
                        <TextField id="last-name" fullWidth label="Last Name" variant="outlined" />
                        </Grid>
                      </Grid>
                      <Grid container spacing = {2}>
                        <Grid item xs = {4}>
                        <TextField id="age"  fullWidth label="Age" variant="outlined" />
                        </Grid>
                        <Grid item xs = {4}>
                        <TextField id="select-gender" fullWidth select label="Gender" variant= "outlined">
                          {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        </Grid>
                        <Grid item xs = {4}>
                        <TextField id="select-meal" fullWidth select label="Meal Option" variant="outlined">
                          {mealOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        </Grid>
                        <Grid container spacing = {2}>
                        <Grid item xs = {12} >
                        <TextField id="select-class" fullWidth select label="Category" variant="outlined" marginLeft="5px">
                          {categoryDB.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        </Grid>
                      </Grid>
                      </Grid>
                    </form>
                </CardContent>
            </Card>
            </div>
            {/* relevant part ends */}
        </div>
        </>
    );
}

export default App;


