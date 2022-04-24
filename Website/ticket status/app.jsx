import React from "react";
import {Typography,List, ListItem, ListItemText, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";
import Logo from "./images/NEXTRAIL.svg";
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReceiptIcon from '@mui/icons-material/Receipt';

const products = [
    {
      name: 'Chennai Express',
      desc: '1 Adult',
      price: 'Rs 1749',
    },
    { name: 'Convenience', desc: '', price: 'Free' },
  ];

  const addresses = ['306 Mahagun Maple', 'Sector-50', 'Noida', '201301'];
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr Abhik S Basu' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
  ];

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
                                            color: '#FFFFFF',
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
                        marginTop: '0px',  overflowY: 'hidden',width: '100%',
                    }}>
                        <Grid container spacing = {24}>
                            <Grid item xs = {6}>
                                <Typography style={{ fontWeight:550, marginTop:"10px", float:"left", marginLeft:"10px"}} variant="h3" align="center" position="relative" gutterBottom>
                                    Ticket Status
                                </Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Button style={{display: "inline",textAlign: "left", backgroundColor: "#7C8DB0", borderRadius: 10, marginTop:"20px", float:"right", marginRight:"20px"}}>
                                    <Typography style = {{color: "#000",fontSize: 25, fontWeight: 'bold', float: "right", clear:"both",  textTransform: "none" }}>Cancel Ticket</Typography>
                                </Button>
                                <Button variant="outlined" style={{display: "inline",textAlign: "left", backgroundColor: "#8397FF", borderRadius: 10, marginLeft:"15px", marginTop:"20px", float:"right", marginRight:"20px"}}>
                                    <Typography style = {{color: "#000",fontSize: 25, fontWeight: 'bold', float: "right", clear:"both",  textTransform: "none" }}>Get Status</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        
                        
                    </Box>
            </main>
            <Grid container spacing = {24}>
                <Grid item xs = {8}>
            <div style= {{marginTop:"20px", marginLeft:"10px", marginRight:"20px"}}>
            <Card sx={{ maxWidth: 200 }} style={{backgroundColor:"#fff"}}>
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
                  <center><ArrowForwardIcon align="center" fontSize="large" style = {{width:60, height:60, color:"#000",}}></ArrowForwardIcon></center>
                </Grid>

                  <Grid item xs = {4}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#7C8DB0" ,fontSize: 45, fontWeight: 'bold', float: "right",}}>
                    CNB
                  </Typography>
                  </Grid>
                  </Grid>
                  <Grid container spacing = {24}>
                      <Grid item xs = {4}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#606060" ,fontSize: 50, fontWeight: 'bold', float: "left", clear:"both"}}>
                    12:20
                  </Typography>
                  </Grid>

                  <Grid item xs = {4}>
                  <center><Typography   component="div" style = {{color:"#8397FF" ,fontSize: 25,fontWeight: 'bold'}}>
                    7h 25m &nbsp; &nbsp; &nbsp; &nbsp;440 km
                  </Typography></center>
                  </Grid>

                  <Grid item xs = {4}>
                  <Typography  variant="h3"  display="inline" component="div" style = {{color:"#606060" ,fontSize: 50, fontWeight: 'bold', float: "right",}}>
                    19:45
                  </Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing = {10}>
                      <Grid item xs = {4}>
                  <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "left", clear:"both", marginLeft: 10}}>
                    Fri &nbsp; &nbsp; 27 May
                  </Typography>
                  </Grid>

                  <Grid item xs = {4}>
                  <center><Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'bold', }}>
                    PNR No. : 1234567890
                  </Typography></center>
                  </Grid>

                  <Grid item xs = {4}>
                  <center><Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right",}}>
                    Fri &nbsp; &nbsp; 27 May
                  </Typography></center>
                  </Grid>
                  </Grid>

                  <div marginLeft="10%" marginRight="10%" textAlign="center">
                  <Grid container spacing = {2} >
                        <Grid item xs = {2}>
                        <Typography    display="inline"  component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            SNo.
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Booking Status
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Current Status
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Coach No.
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Seat No.
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'bold', clear:"both", marginLeft: 10}}>
                            Seat Type
                        </Typography>
                        </Grid>
                        </Grid>


                  
                  <Grid container spacing = {2} >
                        <Grid item xs = {2}>
                        <Typography    display="inline"  component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            WL 2
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            CNF
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            A1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            12
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            Side Upper
                        </Typography>
                        </Grid>
                        </Grid>

                        <Grid container spacing = {2}>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            2
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            WL 3
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            CNF
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            A1
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            13
                        </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                        <Typography    display="inline" component="div" style = {{color:"#606060" ,fontSize: 15, fontWeight: 'light', clear:"both", marginLeft: 10}}>
                            Side Lower
                        </Typography>
                        </Grid>
                        </Grid>
                  </div>
                </CardContent>
            </Card>
            </div>
            </Grid>

            <Grid item xs = {4}>
            <div style= {{marginTop:"20px", marginLeft:"10px", marginRight:"20px"}}>
            <Card sx={{ maxWidth: 200 }} style={{backgroundColor:"#fff"}}>
                {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
                <CardContent>
                    <div style= {{backgroundColor: "#CDD9DF"}}>
                <center>
                            <ReceiptIcon   display ="inline" fontSize = "small" style = {{width:40, height:40, color:"#606060",}}></ReceiptIcon>
                            </center>
                            <center>
                            <Typography display = "inline" style = {{color:"#606060" ,fontSize: 30, fontWeight: 'bold',}}>
                                Receipt
                            </Typography>
                            </center>
                </div>
                {/* <Typography variant="h6" gutterBottom>
        Order summary
      </Typography> */}
      <div style= {{backgroundColor: "#FDD08D"}}>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs. 1749
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid  item xs={12} sm={6}>
          <Typography variant="h6"  gutterBottom sx={{ mt: 2 }}>
            Booking
          </Typography>
          <Typography gutterBottom>Abhik Basu</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid  marginLeft="10px" item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> 
      </div>
                    {/* <div textAlign="center">
                            <center>
                            <ReceiptIcon  fontSize = "small" style = {{width:40, height:40, color:"#000",}}></ReceiptIcon>
                            </center>
                            <center>
                            <Typography style = {{color:"#000" ,fontSize: 30, fontWeight: 'bold',}}>
                                Receipt
                            </Typography>
                            </center>
                            
                    </div>
                 <Grid container spacing = {24}>
                  <Grid item xs = {6}>
                  <Typography   display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                    Receipt No:
                  </Typography>
                  </Grid>

                <Grid item xs = {6}>
                <Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                    123456789
                  </Typography>
                </Grid>
                </Grid>

                <Grid container spacing = {24}>
                  <Grid item xs = {6}>
                  <Typography   display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                    Transaction Time:
                  </Typography>
                  </Grid>

                <Grid item xs = {6}>
                <Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                   7:30 PM, 24 Apr
                  </Typography>
                </Grid>
                </Grid>

                <Grid container spacing = {24}>
                  <Grid item xs = {6}>
                  <Typography   display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                    Payment Mode:
                  </Typography>
                  </Grid>

                <Grid item xs = {6}>
                <Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                    UPI
                  </Typography>
                </Grid>
                </Grid>

                <Grid container spacing = {24}>
                  <Grid item xs = {6}>
                  <Typography   display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                    PNR:
                  </Typography>
                  </Grid>

                <Grid item xs = {6}>
                <Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                    1234567890
                  </Typography>
                </Grid>
                </Grid>

                <Grid container spacing = {24}>
                  <Grid item xs = {6}>
                  <Typography   display="inline" component="div" style = {{color:"#606060" ,fontSize: 20, fontWeight: 'light', float: "right", clear:"both", marginLeft: 5 }}>
                    Fare:
                  </Typography>
                  </Grid>

                <Grid item xs = {6}>
                <Typography   display="inline" component="div" style = {{color:"#000" ,fontSize: 20, fontWeight: 'regular', float: "left", clear:"both", marginLeft: 5 }}>
                    Rs. 1789
                  </Typography>
                </Grid>
                </Grid> */}
                </CardContent>
            </Card>
            </div>
            </Grid>
            </Grid> 
        </div>
        </>
    );
}

export default App;