import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StnAutoComplete from "./StnAutoComplete";
import { Alert, Snackbar } from "@mui/material";
const classes = [
  {
    value: 0,
    label: "All Classes",
    code: "",
  },
  {
    value: 1,
    label: "AC 1 Tier",
    code: "H",
  },
  {
    value: 2,
    label: "AC 2 Tier",
    code: "A",
  },
  {
    value: 3,
    label: "AC 3 Tier",
    code: "B",
  },
  {
    value: 4,
    label: "AC 3 Tier Economy",
    code: "BE",
  },
  {
    value: 5,
    label: "AC Chair Car",
    code: "C",
  },
  {
    value: 6,
    label: "Executive Chair Car",
    code: "E",
  },
  {
    value: 7,
    label: "Sleeper Class",
    code: "S",
  },
  {
    value: 8,
    label: "Second Seating",
    code: "D",
  },
];

//Fix calendar size

function TrainBwStation() {
  const [value, setValue] = React.useState(new Date());
  const [stnList, setStnList] = React.useState([]);
  const [rqstParam, setRqstParam] = React.useState({
    classType: "",
    dest: null,
    src: null,
    doj: null,
  });
  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);

  function getSrc(e, val) {
    if (val === null) {
      rqstParam.src = null;
    } else {
      rqstParam.src = val.st_code;
    }
  }

  function getDest(e, val) {
    if (val === null) {
      rqstParam.dest = null;
    } else {
      rqstParam.dest = val.st_code;
    }
  }

  function searchTrain() {
    rqstParam.doj = value.toLocaleDateString("en-CA");
    if (rqstParam.src === null || rqstParam.dest === null) {
      setOpen(true);
      setAlertMsg("Source or Destination missing!");
    } else if (rqstParam.src == rqstParam.dest) {
      setOpen(true);
      setAlertMsg("Source and Destination cannot be the same!");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rqstParam),
      };
      fetch("/data/train/", requestOptions);
    }
  }

  function getStns() {
    fetch("data/stations")
      .then((response) => response.json())
      .then((data) => {
        setStnList(data);
      });
  }
  useEffect(() => {
    getStns();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
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
              <StnAutoComplete
                label="From"
                stnList={stnList}
                handler={getSrc}
              />
            </Grid>
            <Grid item xs={0}>
              <StnAutoComplete label="To" stnList={stnList} handler={getDest} />
            </Grid>
            <Grid item xs={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["day"]}
                  open={datePickerOpen}
                  onClick={() => setDatePickerOpen(true)}
                  onClose={() => setDatePickerOpen(false)}
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
                      style={{ backgroundColor: "#FFFFFF" }}
                      onKeyDown={(e) => {
                        if (e.code !== "Tab" && !e.ctrlKey) {
                          e.preventDefault();
                        }
                      }}
                      variant="outlined"
                      {...params}
                      sx={{ width: "50%" }}
                      value={value}
                      onClick={() => setDatePickerOpen(true)}
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
                style={{ backgroundColor: "#FFFFFF" }}
                onChange={(e) => {
                  rqstParam.classType = classes[e.target.value].code;
                }}
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
                onClick={searchTrain}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TrainBwStation;
