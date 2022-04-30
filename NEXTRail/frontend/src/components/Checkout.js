import React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm.js';
import Review from './Review';
import {Typography, AppBar,MenuItem, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField} from "@material-ui/core";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        NEXTRail
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Passenger Details', 'Payment details', 'Review your Booking'];

const theme = createTheme();

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const pass = [
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    },
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    },
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    },
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    },
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    },
    {
      name: "",
      age: 0,
      gender: 0,
      meal: "none",
      payment: 0,
    }
  ]
  const [rqstParam,setRqstParam] = React.useState({
    pcount: props.data.pcount,
    pass: pass,
  });
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm data={props.data} pass={pass}/>;
      case 2:
        return <Review data={props.data}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    if(activeStep === steps.length-1){
      rqstParam["class_type"] = props.data.classType
      rqstParam["train_no"] = props.data.train_no
      rqstParam["src"] = props.data.src
      rqstParam["dest"] = props.data.dest
      rqstParam["doj"] = props.data.dod
      rqstParam["username"] = localStorage.getItem("user")
      console.log("BOOK TICKET")
      console.log(rqstParam)
      // fetch request
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rqstParam),
      };
      fetch("/data/book/", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          }
        })
        .catch((error) => {
          props.sendAlert("Cannot Book Tickets", ERROR);
        });
      }
    else{
      setActiveStep(activeStep + 2);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container  maxWidth="sm" style={{marginTop: "100px"}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: "20px"}}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}