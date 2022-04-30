import React from "react";

import trainimg from "../static/img/train.svg";
import bridgeimg from "../static/img/bridge.svg";
import { Grid, Stack, Box} from "@material-ui/core";
import "../static/css/Transitions.css"

export default function BgTrain() {
  return (
    <> 
      <Box>
        <Box item marginTop="125px">
          <img src={trainimg} alt="train" className="train" style={{ position:"fixed", width: "75%" }} />
        </Box>
      </Box>
      <Box>
        <Box item marginTop="180px" marginLeft="-10px">
          <img src={bridgeimg} alt="bridgeimg" style={{ position:"fixed", width: "110%", height: "400px"}} />
        </Box>
      </Box>
    </>
  );
}
