import React from "react";
import {Typography, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";
import TrainIcon from '@mui/icons-material/Train';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const rows: GridRowsProp = [
    { id: 1, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 2, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 3, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 4, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 5, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 6, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 7, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 8, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 9, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 10, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 11, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 12, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 13, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 14, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 15, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 16, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 17, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 18, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 19, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
    { id: 20, col1: 'PUNE', col2: 'Pune Jn', col3: '17:46',col4: '17:47',col5: '1 mins',col6: '1',col7: '29 kms'},
  ];
  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Station  Code', width: 200, headerAlign: 'center', align:"center",headerClassName: 'super-app-theme--header',},
    { field: 'col2', headerName: 'Station Name', width: 200, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header',},
    { field: 'col3', headerName: 'Arrival', width: 150, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header',},
    { field: 'col4', headerName: 'Departure', width: 150, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header' },
    { field: 'col5', headerName: 'Halt Time', width: 150, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header' },
    { field: 'col6', headerName: 'Day', width: 150, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header' },
    { field: 'col7', headerName: 'Distance', width: 150, headerAlign: 'center',align:"center", headerClassName: 'super-app-theme--header' },
  ];

const App = () => {
    return(
        <>
        <div>
            {/* navbar change kardena to responsive */}
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
                                            color: '#FFFFFF',
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
                    <Typography style={{ fontWeight:550, marginTop:"10px" }} variant="h2" align="center" position="relative" gutterBottom>
                            Search Trains
                        </Typography>
                        <div>
                            <Grid container spacing = {0} justifyContent="center">
                                <Grid item>
                                    <TextField style={{
                                                width: "302px",
                                                height: "55px",
                                                fontSize: "14px",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            id="outlined-basic" label="Enter Train Number" variant="outlined" />
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

            <div style= {{marginTop:"20px", marginLeft:"10%", marginRight:"10%"}}>
            <Grid container spacing = {24} style = {{paddingTop:"10px"}}>
                <Grid item xs = {10}>
                    <Typography  variant="h3" component="div" style = {{color:"#000000" ,fontSize: 25, marginLeft:"10px",fontWeight: 'bold', paddingBottom: "5px", paddingTop: "5px"}}>
                        JHELUM EXPRESS – 11077, PUNE JN (PUNE) To JAMMU TAWI (JAT)
                    </Typography> 
                    <Typography  component="div" style = {{color:"#000000" ,fontSize: 15, marginLeft:"10px",fontWeight: 'light',}}>
                    Pune Jn (PUNE) - Jammu Tawi (JAT)
                    </Typography>
                </Grid>
                <Grid item xs = {2}>
                    <Button style={{width:"200px", display: "block",textAlign: "center", backgroundColor: "#DC532D", borderRadius: 7, float:"right"}}>
                            <Typography style = {{color: "#ffffff",fontSize: 25, fontWeight: 'bold',  clear:"both",  textTransform: "none" }}>Book Now</Typography>
                    </Button>
                </Grid>
            </Grid>
            <Typography  component="div"  style = {{color:"#000000" ,fontSize: 22.5,marginTop: "10px", marginLeft:"10px",fontWeight: 'bold',}}>
                Train Details
            </Typography>
            <Card  style={{boxShadow: 2,border: 2, borderColor: '#000000'}}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent style = {{marginLeft:"1%", marginRight:"-4%"}}>
                <Grid container spacing = {24} backgroundColor = "red">
                        <Grid item xs = {2} >
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Train Code
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Train Type
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Classes
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Duration
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                           Distance
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Stops
                        </Typography>
                        </Grid>
                    </Grid>

                        <Grid container spacing = {24}>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            #11077
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            OTHERS
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            2A, 3A, SL, 2S
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            40hr 55mins
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            2179 kms
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 17.5, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            66
                        </Typography>
                        </Grid>
                        </Grid>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
            <Typography  component="div"  style = {{color:"#000000" ,fontSize: 22.5,marginTop: "10px", marginLeft:"10px",fontWeight: 'bold',}}>
                Stations
            </Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} sx={{
                boxShadow: 2,border: 2, borderColor: '#000000','& .MuiDataGrid-cell:hover': {color: 'primary.main',},'& .super-app-theme--header': {
                    backgroundColor: '#00afb9',
                    color: "white",
                    fontWeight: "bold"
                  },}} />
            </div>
            </div>

            <div style= {{marginTop:"40px", marginLeft:"10%", marginRight:"10%"}}>
            </div>
        </div>
        </>
    );
}

export default App;