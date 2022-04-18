import React from "react";
import {Typography, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Logo from "./assets/NEXTRAIL.svg";
import background from "./assets/Hero.png";
import zIndex from "@material-ui/core/styles/zIndex";

const App = () => {
    return(
        <>
        <div>
            <CssBaseline />
            <AppBar style={{ background: '#388087' }}>
                <Toolbar position="relative">
                    <Box
                        component="img"
                        alt="Your logo."
                        src={Logo}
                    />
                    <div style = {{marginLeft: 'auto'}}>
                        <Grid container spacing = {0} justifyContent="center">
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px"
                                        }}
                                    variant="text">Home</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#FFFFFF',
                                            width: "110px",
                                            height: "55px",
                                            fontSize: "14px"
                                        }}
                                    variant="text">PNR Status</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px"
                                        }}
                                    variant="text">Trains</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px"
                                        }}
                                    variant="text">Tickets</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            backgroundColor: "#DC532D",
                                            color: '#FFFFFF',
                                            width: "88px",
                                            height: "53px",
                                            fontSize: "14px"
                                        }}
                                    variant="contained">Log In</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <main>
                <div>
                    <Container maxWidth="sm" style={{
                        marginTop: '180px'
                    }}>
                        <Typography style={{ fontWeight:550 }} variant="h1" align="center" position="relative" gutterBottom>
                            PNR Status
                        </Typography>
                        <div>
                            <Grid container spacing = {0} justifyContent="center">
                                <Grid item>
                                    <TextField style={{
                                                maxLength: 10,
                                                width: "302px",
                                                height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            id="outlined-basic" label="Enter PNR Number" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <Button style={{
                                                backgroundColor: "#DC532D",
                                                color: '#FFFFFF',
                                                width: "88px",
                                                height: "55px",
                                                fontSize: "14px"
                                            }}
                                        variant="contained">Search</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </div>
        </>
    );
}

export default App;