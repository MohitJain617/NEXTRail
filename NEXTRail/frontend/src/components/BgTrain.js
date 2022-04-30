import React from "react";

import trainimg from "../static/img/train.svg";
import bridgeimg from "../static/img/bridge.svg";
import { Grid } from "@material-ui/core";

export default function BgTrain() {
  return (
      <Grid container spacing={4}>
          <Grid item xs={8}>
          <img src={trainimg} alt="trainimg" style={{ position: "fixed" }} />
          </Grid>
          <Grid item xs={8}>
          <img src={bridgeimg} alt="bridgeimg" style={{ width: "100%", position: "fixed" }} />
          </Grid>
      </Grid>
  );
}
