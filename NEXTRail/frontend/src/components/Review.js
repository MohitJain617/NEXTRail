import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export default function Review(props) {
      const products = [
        {
          name: props.data.train_name,
          desc: props.data.pcount.toString().concat(' Passengers'),
          price: '₹ '.concat(props.data.fare),
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
          <ListItemText primary="Departure" secondary={props.data.dod}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
            {props.data.src}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Arrival" secondary={props.data.doa}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
          {props.data.dest}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}