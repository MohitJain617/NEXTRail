import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PassengerDetailsTicket from './PassengerDetailsTicket.js'


export default function TripCard(props) {
    const data = props.data
    return (
        <div style={{ marginTop: "20px", marginLeft: "10%", marginRight: "10%" }}>
            <Card sx={{ maxWidth: 200 }}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={5}>
                            <Typography variant="h4" align="left" noWrap component="div" display="inline" style={{ color: "#606060", fontSize: 40, fontWeight: 'bold' }}>
                                {data.train_no}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <center><TrainIcon align="center" fontSize="small" style={{ width: 60, height: 60, color: "#606060", }}></TrainIcon></center>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h3" display="inline" marginRight="10px" justifyContent="flex-end" component="div" style={{ color: "#606060", fontSize: 40, fontWeight: 'bold', float: "right" }}>
                                {data.train_name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "left", clear: "both", marginLeft: 5 }}>
                                {data.boarding_from}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <center><ArrowForwardIcon align="center" fontSize="large" style={{ width: 60, height: 60, color: "#000", }}></ArrowForwardIcon></center>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "right", }}>
                                {data.going_to}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "left", clear: "both" }}>
                                {data.srctime.substr(11,5)}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <center><Typography component="div" style={{ color: "#8397FF", fontSize: 25, fontWeight: 'bold' }}>
                                {data.duration} &nbsp; &nbsp; &nbsp; &nbsp;{data.dist} km
                            </Typography></center>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "right", }}>
                                {data.desttime.substr(11,5)}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "left", clear: "both", marginLeft: 10 }}>
                                {data.srctime.substr(0,10)}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <center><Typography display="inline" component="div" style={{ color: "#000", fontSize: 20, fontWeight: 'bold', }}>
                                PNR No. : {data.pnr}
                            </Typography></center>
                        </Grid>

                        <Grid item xs={4}>
                            <center><Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "right", }}>
                                {data.desttime.substr(0,10)}
                            </Typography></center>
                        </Grid>
                    </Grid>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                    </Typography>
                    <div marginLeft="10%" marginRight="10%">
                        
                        <Grid container spacing={2} >
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    SNo.
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    Passenger Name
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    Current Status
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    Coach No.
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    Seat No.
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'bold', clear: "both", marginLeft: 10 }}>
                                    Meal Option
                                </Typography>
                            </Grid>
                        </Grid>

                        {data.passengers.map((val,index)=>(
                            <PassengerDetailsTicket data={val} idx = {index} />
                        ))}
                        {/* <PassengerDetailsTicket />
                        <PassengerDetailsTicket />
                        <PassengerDetailsTicket />
                        <PassengerDetailsTicket />
                        <PassengerDetailsTicket /> */}

                    </div>
                    
                </CardContent>
            </Card>
        </div>
    )
}