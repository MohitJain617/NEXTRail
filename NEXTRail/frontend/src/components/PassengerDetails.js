import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PassengerDetails(props) {
  const [age, setAge] = React.useState(0);
  const rqstParam = props.passData;
  const gen = [
    { label: "Male", value: 0, code: "Male" },
    { label: "Female", value: 1, code: "Female" },
    { label: "Other", value: 2, code: "Other" },
  ];
  const meal = [
    { label: "None", code: "none", value: 0 },
    { label: "Veg", code: "veg", value: 1 },
    { label: "Non Veg", code: "non-veg", value: 2 },
  ];

  function changeValue(e) {
    if (!isNaN(e.target.value)) {
      setAge(e.target.value);
      rqstParam.age = e.target.value;
    }
  }

  return (
    <>
      <Grid item xs={12} sm={12} marginBottom="-30px">
        {/* add passenger number dynamically */}
        <Typography variant="h6" gutterBottom align="left">
          Passenger {props.index}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="Name"
          name="Name"
          label="Name"
          fullWidth
          variant="outlined"
          onChange={(e)=>{rqstParam.name=e.target.value}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={age}
          onChange={changeValue}
          inputProps={{
            maxLength: 2,
          }}
          required
          label="Age"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          id="Gender"
          name="Gender"
          label="Gender"
          fullWidth
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          onChange={(e) => {
            rqstParam.gender = gen[e.target.value].code;
          }}
        >
          {gen.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Grid>
      {props.pantry === 1 && (
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            id="meal"
            name="meal"
            label="Meal Option"
            fullWidth
            variant="outlined"
            SelectProps={{
              native: true,
            }}
            onChange={(e) => {
              rqstParam.meal = meal[e.target.value].code;
            }}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {meal.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      )}
      
    </>
  );
}
