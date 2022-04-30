import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PassengerDetails from './PassengerDetails';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom align='center' marginTop="-10px">
        Passenger Details
      </Typography>

      <Grid container spacing={3}>
        <PassengerDetails/>    
        <PassengerDetails/>    
      </Grid>
    </React.Fragment >
  );
}