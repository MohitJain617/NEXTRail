import React from "react";
import {
  Typography,
  AppBar,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import TrainIcon from '@mui/icons-material/Train';
function PnrPageResult() {
  return (
        <div
          style={{ marginTop: "40px", marginLeft: "20%", marginRight: "20%" }}
        >
          <Card sx={{ maxWidth: 200 }}>
            {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <Typography
                    variant="h4"
                    align="left"
                    noWrap
                    component="div"
                    display="inline"
                    style={{
                      color: "#606060",
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                  >
                    12420
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <center>
                    <TrainIcon
                      align="center"
                      fontSize="small"
                      style={{ width: 60, height: 60, color: "#606060" }}
                    ></TrainIcon>
                  </center>
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h3"
                    display="inline"
                    marginRight="10px"
                    justifyContent="flex-end"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 40,
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Chennai Express
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <Typography
                    variant="h3"
                    display="inline"
                    component="div"
                    style={{
                      color: "#7C8DB0",
                      fontSize: 45,
                      fontWeight: "bold",
                      float: "left",
                      clear: "both",
                      marginLeft: 5,
                    }}
                  >
                    NDLS
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {/* <center><ArrowForwardIcon preserveAspectRatio = "none"  fontSize = "large"  style = {{height:'40px',width:'120px'}} ></ArrowForwardIcon></center> */}
                  {/* may use svg later hence commenting */}
                  <center>
                    <svg
                      xmlns="./images/iconmonstr-arrow-right-thin.svg"
                      viewBox="0 0 350 100"
                    >
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="1.5"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" />
                        </marker>
                      </defs>
                      <line
                        x1="70"
                        y1="30"
                        x2="260"
                        y2="30"
                        stroke="#000"
                        stroke-width="3"
                        marker-end="url(#arrowhead)"
                      />
                    </svg>
                  </center>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h3"
                    display="inline"
                    component="div"
                    style={{
                      color: "#7C8DB0",
                      fontSize: 45,
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    CNB
                  </Typography>
                </Grid>
              </Grid>

              <center>
                <Typography
                  component="div"
                  style={{ color: "red", fontSize: 20, fontWeight: "bold" }}
                >
                  7h 25m &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;440 km
                </Typography>
              </center>

              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Typography
                    variant="h3"
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 50,
                      fontWeight: "bold",
                      float: "left",
                      clear: "both",
                    }}
                  >
                    12:20
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h3"
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 50,
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    19:45
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      float: "left",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    Fri &nbsp; &nbsp; 27 May
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      float: "right",
                    }}
                  >
                    Fri &nbsp; &nbsp; 27 May
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                display="inline"
                component="div"
                style={{
                  color: "#606060",
                  fontSize: 20,
                  fontWeight: "light",
                  clear: "both",
                  marginLeft: 10,
                }}
              ></Typography>
              {/* <br></br> <br></br> <br></br> */}

              <Grid container spacing={2} backgroundColor="red">
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    1
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    WL 2
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    CNF
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    A1
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    12
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    Side Upper
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    2
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    WL 3
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    CNF
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    A1
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    13
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    display="inline"
                    component="div"
                    style={{
                      color: "#606060",
                      fontSize: 20,
                      fontWeight: "light",
                      clear: "both",
                      marginLeft: 10,
                    }}
                  >
                    Side Lower
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
          </Card>
        </div>
  );
};

export default PnrPageResult;
