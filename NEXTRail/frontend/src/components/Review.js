import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Jhelum Express',
    desc: '4 Passengers',
    price: 'Rs 1749',
  }
];

const addresses = ['306 Mahagun Maple', 'Sector-50', 'Noida', '201301'];
const payments = [
  { name: 'Card holder', detail: 'Mr Abhik S Basu' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
const paymentsUpi = [
  { name: 'UPI ID', detail: 'basuabhik@oksbi' },
];

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="subtitle1" sx={{ fontWeight: 400}}>{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Departure" secondary="30/04/2022"/>
          <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
            New Delhi
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Arrival" secondary="01/05/2022"/>
          <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
            Mumbai
          </Typography>
        </ListItem>


        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs. 3189
          </Typography>
        </ListItem>


      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Booking
          </Typography>
          <Typography gutterBottom>Abhik Basu</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
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
    </React.Fragment>
  );
}