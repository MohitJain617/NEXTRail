import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function TrainCardAvailability(props) {
    const data = props.data
    return (
        <>
                {/* Add props */}
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography variant="h4" align="left" Wrap component="div" display="inline" style={{ color: "#606060", fontSize: 40, fontWeight: 'bold' }}>
                                {data.train_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <center><TrainIcon align="center" fontSize="small" style={{ width: 60, height: 60, color: "#606060", }}></TrainIcon></center>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" display="inline" marginRight="10px" justifyContent="flex-end" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: '850', float: "right" }}>
                                {data.train_no}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "left", clear: "both", marginLeft: 5 }}>
                                {data.src.st_code}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <center><ArrowForwardIcon align="center" fontSize="large" style={{ width: 60, height: 60, color: "#000", }}></ArrowForwardIcon></center>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "right", }}>
                                {data.dest.st_code}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "left", clear: "both" }}>
                                {data.src.departure.substr(0,5)}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <center><Typography component="div" style={{ color: "#8397FF", fontSize: 25, fontWeight: 'bold' }}>
                                {data.duration} &nbsp; &nbsp; &nbsp; &nbsp; {data.dist}km
                            </Typography></center>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "right", }}>
                                {data.dest.arrival.substr(0,5)}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "left", clear: "both", marginLeft: 10 }}>
                                {data.src.date.substr(0,10)}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} />

                        <Grid item xs={4}>
                            <center><Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "right", }}>
                                {data.dest.date.substr(0,10)}
                            </Typography></center>
                        </Grid>
                    </Grid>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                    </Typography>
                </CardContent>
        </>
    )
}