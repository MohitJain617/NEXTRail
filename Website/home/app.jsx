import React from "react";
import {Typography, AppBar,MenuItem, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";


const categoryDB = [
    {
      label: "AC Class",
      value: 1
    },
    {
      label: "Tier 1 Class",
      value: 2
    },
    {
      label: "Tier 2 Class",
      value: 3
    }
  ]


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
                        <Grid container spacing = {0}>
                            <Grid item>
                                <Button style={{
                                            color: '#FFFFFF',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Helvetica"
                                        }}
                                    variant="text" className = "element">Home</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "110px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">PNR Status</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">Trains</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
                                        }}
                                    variant="text">Tickets</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            backgroundColor: "#DC532D",
                                            color: '#FFFFFF',
                                            width: "88px",
                                            height: "53px",
                                            fontSize: "14px",
                                            fontFamily: "Inter"
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
                        <Typography style={{ color:"#242038",fontWeight:550}} variant="h3" color="common.white" justifyContent = "center" align = "center" position="relative" gutterBottom>
                            Powering the next gen of railways in India.
                        </Typography>
                    </Container>
                    <Container align = "center" >
                        <div>
                            <Grid container spacing = {0} align = "center" justifyContent = "center">
                                <Grid item xs = {0}>
                                    <TextField style={{
                                                // width: "302px",
                                                // height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            id="outlined-basic" label="From" variant="outlined" />
                                </Grid>
                                <Grid item xs = {0} >
                                    <TextField style={{
                                                // width: "302px",
                                                // height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            id="outlined-basic" label="To" variant="outlined" />
                                </Grid>
                                <Grid item xs = {0}>
                                    <TextField style={{
                                                // width: "302px",
                                                // height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            id="outlined-basic" label="Date" type = "date" defaultValue = "2022-04-18" variant="outlined" 
                                            sx={{ width: 220 }}
                                            InputLabelProps={{shrink: true,}} />
                                </Grid>
                                <Grid item xs = {0}>
                                    <TextField style={{
                                                width: "302px",
                                                height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }} select required= 'true' size = "medium" 
                                            id="outlined-basic" label="Class Type" variant="outlined" >
                                             {categoryDB.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                                </MenuItem>
    ))}   
                                    
                                    </TextField>
                                </Grid>
                                <Grid item xs = {0}>
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
