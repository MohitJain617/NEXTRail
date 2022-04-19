import React, { Component } from "react";
import { Avatar,Typography, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/Lock";

const textbox = {
	width: "450px",
	height: "55px",
	fontSize: "14px",
	backgroundColor: "#FFFFFF"
};

const loginbut = {
	backgroundColor: '#DC532D',
	color: '#FFFFFF',
	width: "225px",
	height: "45px",
	fontSize: "14px"
};

const signup = {
	color: '#242038',
	width: "112px",
	height: "20px",
	fontSize: "12px"
};


export default class LogInPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Container maxWidth="sm" style={{
					marginTop: '130px'
				}}>
					<Card style={{ display: "block", height: "465px" }}>
						<CardContent>
							<div align="center">
								<Avatar sx={{ m: 1 }} style={{ backgroundColor: "#388087", marginTop: "20px" }}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography style={{ fontWeight: 500, color: '#242038', marginTop: '1px' }} variant="h3" align="center" position="relative" gutterBottom>
									Log In
								</Typography>
							</div>
							<div style={{ marginTop: "50px" }}>
								<Grid container spacing={2} align="center" direction="column">
									<Grid item xs={16}>
										<TextField style={textbox} id="outlined-basic" label="Username" variant="outlined" />
									</Grid>
									<Grid item xs={16}>
										<TextField style={textbox} id="outlined-basic" label="Password" variant="outlined" />
									</Grid>
									<Grid item xs={16} style={{ marginTop: "30px" }}>
										<Button style={loginbut} variant="contained">Log In</Button>
									</Grid>
									<Grid item style={{ marginTop: "-10px" }}>
										<Button style={signup} variant="text">Sign Up</Button>
									</Grid>
								</Grid>
							</div>
						</CardContent>
					</Card>
				</Container>
			</div>
		);
	}
}
