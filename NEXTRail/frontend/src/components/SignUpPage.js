import React, { Component } from "react";
import { Typography, AppBar, Avatar, Card, CardContent, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/Lock';

const textboxsmall = {
	width: "240px",
	height: "55px",
	fontSize: "14px",
	backgroundColor: "#FFFFFF"
};

const textboxbig = {
	width: "500px",
	height: "55px",
	fontSize: "14px",
	backgroundColor: "#FFFFFF"
};



const loginbut = {
	backgroundColor: '#DC532D',
	color: '#FFFFFF',
	width: "500px",
	height: "45px",
	fontSize: "14px"
};

const appbarlogin = {
	marginTop: "5px",
	backgroundColor: '#FFFDF8',
	color: '#DC532D',
	width: "80px",
	height: "45px",
	fontSize: "14px"
}

const signup = {
	color: '#242038',
	width: "112px",
	height: "20px",
	fontSize: "12px"
};

export default class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Container maxWidth="sm" style={{
					marginTop: '80px'
				}}>
					<Card style={{ display: "block", height: "680px", width: "550px" }}>
						<CardContent>
							<div align="center">
								<Avatar sx={{ m: 1 }} style={{ backgroundColor: "#388087", marginTop: "20px" }}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography style={{ fontWeight: 500, color: '#242038', marginTop: '1px' }} variant="h4" align="center" position="relative" gutterBottom>
									Sign Up
								</Typography>
							</div>
							<div style={{ marginTop: "20px" }}>
								<Grid container spacing={0} align="center" direction="row">
									<Grid item xs={6}>
										<TextField style={textboxsmall} id="outlined-basic" label="First Name" variant="outlined" />
									</Grid>
									<Grid item xs={6}>
										<TextField style={textboxsmall} id="outlined-basic" label="Last Name" variant="outlined" />
									</Grid>
								</Grid>
								<div style={{ marginTop: "20px" }}>
									<Grid container spacing={2} align="center" direction="column">
										<Grid item xs={16} marginTop="20px">
											<TextField style={textboxbig} id="outlined-basic" label="Email" variant="outlined" />
										</Grid>
										<Grid item xs={16} marginTop="20px">
											<TextField style={textboxbig} id="outlined-basic" label="Address Line 1" variant="outlined" />
										</Grid>
										<Grid item xs={16} marginTop="20px">
											<TextField style={textboxbig} id="outlined-basic" label="Address Line 2" variant="outlined" />
										</Grid>
									</Grid>
								</div>
								<div style={{ marginTop: "20px" }}>
									<Grid container spacing={0} align="center" direction="row">
										<Grid item xs={6}>
											<TextField style={textboxsmall} id="outlined-basic" label="Pincode" variant="outlined" />
										</Grid>
										<Grid item xs={6}>
											<TextField style={textboxsmall} id="outlined-basic" label="Number" variant="outlined" />
										</Grid>
									</Grid>
								</div>
								<div style={{ marginTop: "20px" }}>
									<Grid container spacing={0} align="center" direction="row">
										<Grid item xs={6}>
											<TextField style={textboxsmall} id="outlined-basic" label="Username" variant="outlined" />
										</Grid>
										<Grid item xs={6}>
											<TextField style={textboxsmall} id="outlined-basic" label="Password" variant="outlined" />
										</Grid>
									</Grid>
								</div>
								<Grid container spacing={2} align="center" direction="column">
									<Grid item xs={16} style={{ marginTop: "30px" }}>
										<Button style={loginbut} variant="contained">Register</Button>
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
