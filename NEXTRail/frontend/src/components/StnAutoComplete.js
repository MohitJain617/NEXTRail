import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";



function StnAutoComplete(props) {
  const [value, setValue] = useState(null);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 5,
  });

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <Autocomplete
      filterOptions={filterOptions}
      options={props.stnList}
      sx={{ width: 230 }}
      onChange={props.handler}
      getOptionLabel={stn => stn.st_code.concat(": ",stn.st_name)}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
    />
  );
}

export default StnAutoComplete;
