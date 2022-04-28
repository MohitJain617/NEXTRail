import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const style1 = {color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }
export default function TripCard() {
    // const data = props.data
    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        1
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        WL 2
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        CNF
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        A1
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        12
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        Side Upper
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}