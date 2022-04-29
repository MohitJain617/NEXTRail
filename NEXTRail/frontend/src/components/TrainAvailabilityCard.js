import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function TrainCardAvailability() {
    return (
        <>
            {/* Add props */}
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography variant="h4" align="left" Wrap component="div" display="inline" style={{ color: "#606060", fontSize: 40, fontWeight: 'bold' }}>
                            Chennai Express
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <center><TrainIcon align="center" fontSize="small" style={{ width: 60, height: 60, color: "#606060", }}></TrainIcon></center>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" display="inline" marginRight="10px" justifyContent="flex-end" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: '850', float: "right" }}>
                            69696
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "left", clear: "both", marginLeft: 5 }}>
                            NDLS
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <center><ArrowForwardIcon align="center" fontSize="large" style={{ width: 60, height: 60, color: "#000", }}></ArrowForwardIcon></center>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h3" display="inline" component="div" style={{ color: "#7C8DB0", fontSize: 45, fontWeight: 'bold', float: "right", }}>
                            CNB
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "left", clear: "both" }}>
                            12:20
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <center><Typography component="div" style={{ color: "#8397FF", fontSize: 25, fontWeight: 'bold' }}>
                            7h 25m &nbsp; &nbsp; &nbsp; &nbsp;440 km
                        </Typography></center>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h3" display="inline" component="div" style={{ color: "#606060", fontSize: 50, fontWeight: 'bold', float: "right", }}>
                            19:45
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "left", clear: "both", marginLeft: 10 }}>
                            Fri &nbsp; &nbsp; 27 May
                        </Typography>
                    </Grid>

                    <Grid item xs={4} />

                    <Grid item xs={4}>
                        <center><Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', float: "right", }}>
                            Fri &nbsp; &nbsp; 27 May
                        </Typography></center>
                    </Grid>
                </Grid>
                <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 20, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                </Typography>
            </CardContent>
        </>
    )
}