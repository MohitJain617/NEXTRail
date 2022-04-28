import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TripCard from './TripCard.js'

export default function BookingPage() {
    const [past,setPast] = React.useState(false)
    const [data,setData] = React.useState("")
    const [result, setResult] = React.useState(false)
    
    function handleSearchPressed() {

        fetch("/data/tickets/" + "?past=" + (past?"true":"false"))
        .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject(data.error);
            } else {
                setResult(true);
                setData(data);
                // navigate("/trains/",{state:{data:data}});
            }
        })
        .catch((error) => {
          setResult(false)
          setData("")
          props.sendAlert("Cannot Find Train", ERROR);
        });
    }
    return (
        <div>
            <Box maxWidth="sm" style={{
                marginTop: '0px', background: '#C4C4C4', overflowY: 'hidden', width: '100%', height: "100px"
            }}>
                <Typography style={{ fontWeight: 550, marginTop: "20px" }} variant="h3" align="center" position="relative" gutterBottom>
                    {past? ("Past Trips"):("Upcoming Trips")}
                </Typography>
            </Box>
            <div style={{ marginTop: "40px", marginLeft: "20%", marginRight: "20%" }}>
                    {/* add cards here */}
                <TripCard />

            </div>
        </div>
    );
}