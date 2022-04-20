import React from "react";
import {
  Typography,
  AppBar,
  MenuItem,
  Card,
  CardAction,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StnAutoComplete from "./StnAutoComplete";

const classes = [
  {
    value: 1,
    label: "All Classes",
  },
  {
    value: 2,
    label: "AC 1 Tier",
  },
  {
    value: 3,
    label: "AC 2 Tier",
  },
  {
    value: 4,
    label: "AC 3 Tier",
  },
  {
    value: 5,
    label: "AC 3 Tier Economy",
  },
  {
    value: 6,
    label: "AC Chair Car",
  },
  {
    value: 7,
    label: "Executive Chair Car",
  },
  {
    value: 8,
    label: "Sleeper Class",
  },
  {
    value: 9,
    label: "Second Seating",
  },
];

//Fix calendar size

function TrainBwStation() {
  const [value, setValue] = React.useState(new Date());
  const [classType, setClassType] = React.useState(1);

  const handleChange = (event) => {
    setClassType(event.target.value);
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginTop: "180px",
        }}
      >
        <Typography
          style={{ color: "#242038", fontWeight: 550 }}
          variant="h3"
          color="common.white"
          justifyContent="center"
          align="center"
          position="relative"
          gutterBottom
        >
          Powering the next gen of railways in India.
        </Typography>
      </Container>
      <Container align="center">
        <div>
          <Grid container spacing={0} align="center" justifyContent="center">
            <Grid item xs={0}>
              <StnAutoComplete/>
            </Grid>
            <Grid item xs={0}>
              <TextField
                style={{
                  fontSize: "14px",
                  backgroundColor: "#FFFFFF",
                }}
                id="outlined-basic"
                label="To"
                variant="outlined"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>
            <Grid item xs={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  PopupWidth="230px"
                  views={["day"]}
                  minDate={new Date()}
                  maxDate={new Date().setMonth(new Date().getMonth() + 3)}
                  label="Date of Journey"
                  value={value}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      sx={{ width: "50%" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={0}>
              <TextField
                id="outlined-select-class-type-native"
                select
                variant="outlined"
                label="Class Type"
                value={classType}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {classes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={0}>
              <Button
                style={{
                  backgroundColor: "#DC532D",
                  color: "#FFFFFF",
                  width: "88px",
                  height: "55px",
                  fontSize: "14px",
                }}
                variant="contained"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default TrainBwStation;
