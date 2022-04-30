import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PassengerDetails from './PassengerDetails';

export default function AddressForm(props) {

  console.log("IN ADD",props.data.pcount)
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom align='center' marginTop="-10px">
        Passenger Details
      </Typography>

      <Grid container spacing={3}>
        <PassengerDetails index={1}/>
        {props.data.pcount >= 2 && <PassengerDetails index={2}/>}
        {props.data.pcount >= 3 && <PassengerDetails index={3}/>}
        {props.data.pcount >= 4 && <PassengerDetails index={4}/>}
        {props.data.pcount >= 5 && <PassengerDetails index={5}/>}
        {props.data.pcount === 6 && <PassengerDetails index={6}/>}
      </Grid>
    </React.Fragment >
  );
}