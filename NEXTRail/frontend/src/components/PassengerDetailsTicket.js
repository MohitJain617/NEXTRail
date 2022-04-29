import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const style1 = {color: "#606060", fontSize: 15, fontWeight: 'light', clear: "both", marginLeft: 10 }
export default function PassengerDetailsTicket(props) {
    const data = props.data
    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {props.idx}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {data.pname}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {data.stat}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {(data.stat !== "CNF")?("-"):(data.class_type + data.coach_no)}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {data.seat_no}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography display="inline" component="div" style={style1}>
                        {(data.meal_option == null)?("-"):(data.meal_option)}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}