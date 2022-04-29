import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TripCard from "./TripCard";
import TrainCardAvailability from "./TrainAvailabilityCard";

const TicketClassButton = () => {
	return (
		<Grid item>
			<Button variant="outlined" style={{ display: "block", textAlign: "left", backgroundColor: "#BEE7EA" }}>
				<Typography style={{ fontSize: 25, fontWeight: 'light', float: "right", clear: "both", marginLeft: 5, textTransform: "none" }}>AC 2 Tier (2A)</Typography>
				<Typography style={{ marginLeft: "5px", paddingTop: "10px", paddingBottom: "10px", color: "green", fontWeight: "bold", textTransform: "none" }}> AVAILABLE </Typography>
			</Button>
		</Grid>
	);
}

export default TicketClassButton;