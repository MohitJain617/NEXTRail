import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm(props) {
  const rqstParam = props.pay;
  const pay = [
    { label: "UPI", value: 0, code: "UPI" },
    { label: "Credit Card", value: 1, code: "Credit Card" },
    { label: "Debit Card", value: 2, code: "Debit Card" },
    { label: "Bank Transfer", value: 3, code: "Bank Transfer" },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

    </React.Fragment>
  );
}