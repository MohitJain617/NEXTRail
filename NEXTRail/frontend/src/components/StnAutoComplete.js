import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const url = "data/stations"


function StnAutoComplete() {
  const [value, setValue] = React.useState(null);
  const handleInput = (e) => {
    console.log(e.target.value);
  };

  console.log(stnList)
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
