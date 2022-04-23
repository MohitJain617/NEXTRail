import React from "react";
import {Typography, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";

const TrainResults = () => {
    return(
        <>
        <div>
            <CssBaseline />
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

export default TrainResults;