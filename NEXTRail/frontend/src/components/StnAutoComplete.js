import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

function StnAutoComplete(props) {
  const [value, setValue] = useState(null);
  const [opts, setOpts] = React.useState([]);

  function getStns() {
    fetch("data/stations")
      .then((response) => response.json())
      .then((data) => {
        setOpts(data);
      });
  }

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 5,
  });

  function handleChange(e) {
    console.log(e.target.value);
  }

  // function handleInputChange(e) {
  //   fetch("data/stations")
  //     .then(async (response) => {
  //       const data = await response.json();
  //       if (!response.ok) {
  //         // get error message from body or default to response statusText
  //         const error = (data && data.message) || response.statusText;
  //         return Promise.reject(error);
  //       }
  //       setOpts(data);
  //     })
  //     .catch((error) => {
  //       this.setState({ errorMessage: error.toString() });
  //       console.error("There was an error!", error);
  //     });
  // }

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
      // onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
    />
  );
}

export default StnAutoComplete;
