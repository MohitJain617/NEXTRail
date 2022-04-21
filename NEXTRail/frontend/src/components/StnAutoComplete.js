import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";


function StnAutoComplete (props) {
  const [value, setValue] = useState(null);
  const [opts,setOpts] = React.useState([]);
  
  function getStns(){
    fetch("data/stations").then((response) => response.json()).then((data) => {
      setOpts(data)
    })
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 5,
  });

  function handleChange(e){
    console.log(e.target.value)
  }

  useEffect(() => {
    getStns();
  }, [])

  return (
    <Autocomplete
      filterOptions={filterOptions}
      options={opts}
      sx={{ width: 230 }}
      // value={value}
      onChange={handleChange}
      // onInputChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined"  />
      )}
    />
  );
}

export default StnAutoComplete;
