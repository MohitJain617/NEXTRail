import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function TripCard() {
    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        1
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        WL 2
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        CNF
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        A1
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        12
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={{ color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }}>
                        Side Upper
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}