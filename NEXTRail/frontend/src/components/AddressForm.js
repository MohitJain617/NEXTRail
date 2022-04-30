import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PassengerDetails from './PassengerDetails';

export default function AddressForm(props) {
const pass = props.pass;
const pay = [
  { label: "UPI", value: 0, code: "UPI" },
  { label: "Credit Card", value: 1, code: "Credit Card" },
  { label: "Debit Card", value: 2, code: "Debit Card" },
  { label: "Bank Transfer", value: 3, code: "Bank Transfer" },
];
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom align='center' marginTop="-10px">
        Passenger Details
      </Typography>

      <Grid container spacing={3}>
        <PassengerDetails pantry={props.data.pantry} index={1} passData={pass[0]}/>
        {props.data.pcount >= 2 && <PassengerDetails pantry={props.data.pantry} index={2} passData={pass[1]}/>}
        {props.data.pcount >= 3 && <PassengerDetails pantry={props.data.pantry} index={3} passData={pass[2]}/>}
        {props.data.pcount >= 4 && <PassengerDetails pantry={props.data.pantry} index={4} passData={pass[3]}/>}
        {props.data.pcount >= 5 && <PassengerDetails pantry={props.data.pantry} index={5} passData={pass[4]}/>}
        {props.data.pcount === 6 && <PassengerDetails pantry={props.data.pantry} index={6} passData={pass[5]}/>}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          id="Payment"
          name="Payment"
          label="Payment"
          fullWidth
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          onChange={(e) => {
            // props.pay.payment = "UPI"            
            // console.log(props.pay)
            pass[0].payment = pay[e.target.value].code;
          }}
          >
          {pay.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </Grid>
          </Grid>
    </React.Fragment >
  );
}