import React from "react";
import { Typography, AppBar, MenuItem, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, Select, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import TripCard from "./TripCard";
import TicketClassButton from "./TicketClassButton.js";

import TrainCardAvailability from "./TrainAvailabilityCard";
import "../static/css/TripCard.css"

const TrainResults = (props) => {
	const data = props.data
	const [classType,setClassType] = React.useState("");
	function bookTicket(){
		console.log(data,classType)
	}
	return (
		<div className="zoom">
			<Card sx={{ maxWidth: 200 }}>
				<CardContent>
					{/* Contains the Train Details */}
					<TrainCardAvailability data={data}/>

					{/* Class Wise Buttons */}
					<Grid container spacing={2}  alignItems="center" justifyContent="center"  >
						{data.class_types.map((val, index)=>(<TicketClassButton trainClass={val} classes={props.classes} selected={classType} setSelected={setClassType}/>))}
					</Grid>

					<Grid container spacing={2} alignItems="center" justifyContent="center" style={{ paddingTop: "10px"}}>
						<Grid item>
							<Button onClick={bookTicket} style={{ display: "block", textAlign: "left", backgroundColor: "#DC532D", borderRadius: 5 }}>
								<Typography style={{ color: "#ffffff", fontSize: 20, fontWeight: 'bold', float: "right", clear: "both", textTransform: "none" }}>Book Now</Typography>
							</Button>
						</Grid>

					</Grid>
				</CardContent>

			</Card>
		</div>
	);
}

export default TrainResults;