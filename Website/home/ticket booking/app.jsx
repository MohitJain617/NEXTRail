import React from "react";
import {Typography, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const categoryDB = [
    {
        label: "All Classes",
        value: 1
    },
    {
        label: "AC 2 Tier",
        value: 2
    },
    {
        label: "AC 3 Tier",
        value: 3
    },
    {
        label: "AC 3 Tier Economy",
        value: 4
    },
    {
        label: "AC Chair Car",
        value: 5
    },
    {
        label: "Second Seating",
        value: 6
    },
    {
        label: "Executive Chair Car",
        value: 7
    },
    {
        label: "AC 1 Tier",
        value: 8
    },
    {
        label: "Sleeper Class",
        value: 9
    },
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
            <Box maxWidth="sm" style={{
                        marginTop: '0px', background: '#C4C4C4', overflowY: 'hidden',width: '100%', height: "190px"
                    }}>
                    <Typography style={{ fontWeight:550 }} variant="h2" align="center" position="relative" gutterBottom>
                        Powering the next gen of railways in India.
                    </Typography>
                
                <Container align="center" >
                    <div>
                        <Grid container spacing={0} align="center" justifyContent="center">
                            <Grid item xs={0}>
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="From" variant="outlined" />
                            </Grid>
                            <Grid item xs={0} >
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="To" variant="outlined" />
                            </Grid>
                            <Grid item xs={0}>
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="Date" type="date" defaultValue="2022-04-18" variant="outlined"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{ shrink: true, }} />
                            </Grid>
                            <Grid item xs={0}>
                                <TextField style={{
                                    width: "302px",
                                    height: "55px",
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }} select required='true' size="medium"
                                    id="outlined-basic" label="Class Type" variant="outlined" >
                                    {categoryDB.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={0}>
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
                </Box>
            </main>

            <div style= {{marginTop:"40px", marginLeft:"10%", marginRight:"10%"}}>
            <Card sx={{ maxWidth: 200 }}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent>
                    <div style = {{backgroundColor : "#00afb9", borderRadius:10, }}>
                            <Typography  variant="h3" component="div" style = {{color:"#ffffff" ,fontSize: 30, marginLeft:"10px",fontWeight: 'bold', paddingBottom: "5px", paddingTop: "5px"}}>
                                MMCT TEJAS RAJ (12952)
                            </Typography> 
                    </div>

                  <Grid container spacing = {24} style = {{paddingTop: "10px"}}>
                        <Grid item xs = {6}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{fontSize: 25, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                   <strong>21:40 |</strong> KOTA JN | Wed, 20 Apr
                  </Typography>
                  </Grid>
                  {/* <center><Grid item xs = {4} alignContent= "center">
                  <Typography  variant="h3"  display="inline" component="div" style = {{fontSize: 20, fontWeight: 'bold', float: "right", clear:"both", marginLeft: 5, float: "center" }}>
                    06:00
                  </Typography>
                  </Grid></center> */}
                  <Grid item xs = {6}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{fontSize: 25, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                  <strong>03:40 | </strong> VADODARA JN | Wed, 20 Apr
                  </Typography>
                  </Grid>
                  </Grid>

                  
                  <center><Typography   component="div" style = {{color:"red" ,fontSize: 25,fontWeight: 'bold'}}>
                    ------6:00-------
                  </Typography></center>

                  <Grid container spacing = {2} style = {{paddingTop:"10px"}}>
                      <Grid item>
                        <Button variant ="outlined" style={{display: "block",textAlign: "left", backgroundColor: "#BEE7EA"}}>
                            <Typography style = {{fontSize: 25, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5, textTransform: "none" }}>AC 3 Tier (3A)</Typography>
                            <Typography style = {{marginLeft: "5px", color:"red", fontWeight: "bold",textTransform:"none"}}> WL4 (77%) </Typography>
                            <Typography style = {{marginLeft: "5px", fontWeight: "bold",textTransform:"none", fontSize:15}}> Rs. 1655</Typography>
                        </Button>
                  </Grid>
                  <Grid item>
                  <Button variant ="outlined" style={{display: "block",textAlign: "left", backgroundColor: "#BEE7EA"}}>
                            <Typography style = {{fontSize: 25, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5, textTransform: "none" }}>AC 2 Tier (2A)</Typography>
                            <Typography style = {{marginLeft: "5px", color:"green", fontWeight: "bold",textTransform:"none"}}> AVAILABLE </Typography>
                            <Typography style = {{marginLeft: "5px", fontWeight: "bold",textTransform:"none", fontSize:15}}> Rs. 2235</Typography>
                        </Button>
                  </Grid>
                  <Grid item>
                  <Button variant ="outlined" style={{display: "block",textAlign: "left", backgroundColor: "#BEE7EA"}}>
                            <Typography style = {{fontSize: 25, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5, textTransform: "none" }}>AC First Class (1A)</Typography>
                            <Typography style = {{marginLeft: "5px", color:"red", fontWeight: "bold",textTransform:"none"}}> WL1 (57%) </Typography>
                            <Typography style = {{marginLeft: "5px", fontWeight: "bold",textTransform:"none", fontSize:15}}> Rs. 2470</Typography>
                        </Button>
                  </Grid>
                  </Grid>

                  <Grid container spacing = {2} style ={{paddingTop: "10px"}}>
                    <Grid item>
                    <Button style={{display: "block",textAlign: "left", backgroundColor: "#DC532D", borderRadius: 20}}>
                            <Typography style = {{color: "#ffffff",fontSize: 15, fontWeight: 'bold', float: "right", clear:"both",  textTransform: "none" }}>Book Now</Typography>
                        </Button>
                  </Grid>
                  <Grid item >
                  <Button variant = "outlined"style={{display: "block",textAlign: "left"}}>
                            <Typography style = {{fontSize: 15, fontWeight: 'regular', float: "right", clear:"both",  textTransform: "none" }}>Other Dates</Typography>
                        </Button>
                  </Grid>
                  </Grid>
                  {/* <br></br> <br></br> <br></br> */}
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
            </div>

            <div style= {{marginTop:"40px", marginLeft:"10%", marginRight:"10%"}}>
            </div>
        </div>
        </>
    );
}

export default App;