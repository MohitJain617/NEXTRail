import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const url = "/data/stations"

const stnList = [
  {label: "AAA: AAAAA"},
  {label: "ABVC: SADASF"}
];

const StnAutoComplete = () => {
  const [hasError, setErrors] = useState(false);
  const [value, setValue] = useState(null);
  const [stns, setStations] = useState({});

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  async function fetchData() {
    const res = await fetch(url);
    res
      .json()
      .then(res => setStations(res))
      .catch(err => setErrors(err));
    console.log("Hello world")
    console.log(stns)
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={stnList}
      sx={{ width: 230 }}
      value={value}
      onInputChange={handleInput}
      renderInput={(params) => (
        <TextField {...params} label="From" variant="outlined" />
      )}
    />
  );
}

export default StnAutoComplete;
