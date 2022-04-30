import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import { ERROR, SUCCESS } from "./AlertTypes";

export default function TicketReceipt() {
  const { state } = useLocation();
  const theme = createTheme();
  const navigate = useNavigate();
  console.log(state.data)

  function handleNext(){
    console.log("CANCEL TICKET",state.data.pnr)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pnr:state.data.pnr,
        }),
      };
      fetch("/data/cancel/", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            return Promise.reject(data.error);
          }
          else{
            navigate("/");
            //  state.data.sendAlert("Ticket Cancelled!",SUCCESS)
          }
        })
        .catch((error) => {
          console.log("ERROR",error)
          // state.data.sendAlert("Failed to Cancel Ticket!",ERROR)
        });
      }
  const products = [
    {
      name: state.data.train_name,
      desc: state.data.pcount.toString().concat(" Passengers"),
      price: "₹ ".concat(state.data.fare),
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Paper
          style={{ padding: "50px" }}
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.desc}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                    {product.price}
                  </Typography>
                </ListItem>
              ))}

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Departure" secondary={state.data.dod} />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  {state.data.src}
                </Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Arrival" secondary={state.data.doa} />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  {state.data.dest}
                </Typography>
              </ListItem>
            </List>
            {state.data.cancel && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Cancel Ticket
                </Button>
              </Box>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
