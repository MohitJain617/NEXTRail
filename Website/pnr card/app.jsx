import React from "react";
import {Typography, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
                                            color: '#242038',
                                            width: "88px",
                                            height: "55px",
                                            fontSize: "14px",
                                            fontFamily: "Helvetica"
                                        }}
                                    variant="text" className = "element">Home</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{
                                            color: '#FFFFFF',
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
                        <Typography style={{ fontWeight:550, marginTop:"10px"}} variant="h2" align="center" position="relative" gutterBottom>
                            PNR Status
                        </Typography>
                        <div>
                            <Grid container spacing = {0} justifyContent="center">
                                <Grid item>
                                    <TextField style={{
                                                width: "302px",
                                                height: "55px",
                                                fontSize: "18px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            inputProps={{
                                                maxLength: 10,
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
                    </Box>
            </main>

            <div style= {{marginTop:"40px", marginLeft:"20%", marginRight:"20%"}}>
            <Card sx={{ maxWidth: 200 }}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent>
                    <Grid container spacing = {24}>
                        <Grid item xs = {5}>
                  <Typography  variant="h4" align="left" noWrap  component="div" display="inline" style = {{color:"#606060" ,fontSize: 40, fontWeight: 'bold'}}>
                    12420
                  </Typography>
                  </Grid>
                  <Grid item xs = {2}>
                  <center><TrainIcon  align = "center"  fontSize = "small" style = {{width:60, height:60, color:"#606060",}}></TrainIcon></center>
                  </Grid>
                  <Grid item xs = {5}>
                  <Typography  variant="h3"  display="inline" marginRight = "10px" justifyContent = "flex-end" component="div" style = {{color:"#606060" ,fontSize: 40, fontWeight: 'bold', float:"right"}}>
                  Chennai Express
                  </Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing = {24}>
                        <Grid item xs = {4}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#7C8DB0" ,fontSize: 45, fontWeight: 'bold', float: "left", clear:"both", marginLeft: 5 }}>
                    NDLS 
                  </Typography>
                  </Grid>
                  <Grid item xs = {4}>
                    {/* <center><ArrowForwardIcon preserveAspectRatio = "none"  fontSize = "large"  style = {{height:'40px',width:'120px'}} ></ArrowForwardIcon></center> */}
                    {/* may use svg later hence commenting */}
                  <center><svg xmlns="./images/iconmonstr-arrow-right-thin.svg" viewBox="0 0 350 100">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="1.5" refY="3" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" />
                      </marker>
                    </defs>
                    <line x1="70" y1="30" x2="260" y2="30" stroke="#000" 
                    stroke-width="3" marker-end="url(#arrowhead)" />
                  </svg></center>
                      </Grid>
                  <Grid item xs = {4}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#7C8DB0" ,fontSize: 45, fontWeight: 'bold', float: "right",}}>
                    CNB
                  </Typography>
                  </Grid>
                  </Grid>

                  
                  <center><Typography   component="div" style = {{color:"red" ,fontSize: 20,fontWeight: 'bold'}}>
                    7h 25m &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;440 km
                  </Typography></center>

                  <Grid container spacing = {24}>
                      <Grid item xs = {6}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#606060" ,fontSize: 50, fontWeight: 'bold', float: "left", clear:"both"}}>
                    12:20
                  </Typography>
                  </Grid>
                  <Grid item xs = {6}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#606060" ,fontSize: 50, fontWeight: 'bold', float: "right",}}>
                    19:45
                  </Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing = {24}>
                      <Grid item xs = {6}>
                  <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "left", clear:"both", marginLeft: 10}}>
                    Fri &nbsp; &nbsp; 27 May
                  </Typography>
                  </Grid>
                  <Grid item xs = {6}>
                  <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right",}}>
                    Fri &nbsp; &nbsp; 27 May
                  </Typography>
                  </Grid>
                  </Grid>
                  <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                  </Typography>
                  {/* <br></br> <br></br> <br></br> */}

                  <Grid container spacing = {2} backgroundColor = "red">
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            WL 2
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            CNF
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            A1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            12
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            Side Upper
                        </Typography>
                        </Grid>
                        </Grid>

                        <Grid container spacing = {2}>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            2
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            WL 3
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            CNF
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            A1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            13
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            Side Lower
                        </Typography>
                        </Grid>
                        </Grid>


                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
            </div>
        </div>
        </>
    );
}

export default App;