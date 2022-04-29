import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, Select, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TripCard from "./TripCard";
import TicketClassButton from "./TicketClassButton.js";

import TrainCardAvailability from "./TrainAvailabilityCard";

const TrainResults = () => {
	return (
		<div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
			<Card sx={{ maxWidth: 200 }}>
				<CardContent>
					{/* Contains the Train Details */}
					<TrainCardAvailability />

					{/* Class Wise Buttons */}
					<Grid container spacing={2} style={{ paddingTop: "-50px" }}>
						<TicketClassButton />
						<TicketClassButton />
						<TicketClassButton />
					</Grid>

					<Grid container spacing={2} style={{ paddingTop: "10px" }}>
						<Grid item>
							<Button style={{ display: "block", textAlign: "left", backgroundColor: "#DC532D", borderRadius: 5 }}>
								<Typography style={{ color: "#ffffff", fontSize: 20, fontWeight: 'bold', float: "right", clear: "both", textTransform: "none" }}>Book Now</Typography>
							</Button>
						</Grid>

						<Grid item>
							<Button variant="outlined" style={{ display: "block", textAlign: "left", borderRadius: 5 }}>
								<Typography style={{ fontSize: 20, fontWeight: 'bold', float: "right", clear: "both", textTransform: "none" }}>Seat Availability</Typography>
							</Button>
						</Grid>	

						<Grid item>
							<TextField label="Passengers" variant="outlined"size="small"/>
						</Grid>	

					</Grid>
				</CardContent>

			</Card>
		</div>
	);
}

export default TrainResults;