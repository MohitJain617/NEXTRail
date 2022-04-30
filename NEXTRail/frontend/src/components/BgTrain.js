import React from "react";

import trainimg from "../static/img/train.svg";
import bridgeimg from "../static/img/bridge.svg";
import { Grid, Stack, Box} from "@material-ui/core";

export default function BgTrain() {
  return (
    <> 
      <Box>
        <Box item marginTop="68px">
          <img src={trainimg} alt="train" style={{ position: "fixed" }} />
        </Box>
      </Box>
      <Box>
        <Box item marginTop="200px">
          <img src={bridgeimg} alt="bridgeimg" style={{ position: "fixed", width: "100%" }} />
        </Box>
      </Box>
    </>
  );
}
