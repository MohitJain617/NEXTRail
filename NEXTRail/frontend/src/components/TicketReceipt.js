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

export default function TicketReceipt(props) {
  const { state } = useLocation();
  const theme = createTheme();
  const data = state.data;
  const navigate = useNavigate();
  function handleNext(){
    console.log("CANCEL TICKET",data.pnr)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pnr:data.pnr,
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
          }
        })
        .catch((error) => {
          console.log("ERROR",error)
          navigate("/");
        });
      }
  const products = [
    {
      name: data.train_name,
      desc: data.pcount.toString().concat(" Passengers"),
      price: "₹ ".concat(data.fare),
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
                <ListItemText primary="Departure" secondary={data.dod} />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  {data.src}
                </Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Arrival" secondary={data.doa} />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  {data.dest}
                </Typography>
              </ListItem>
            </List>
            {data.cancel && (
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
