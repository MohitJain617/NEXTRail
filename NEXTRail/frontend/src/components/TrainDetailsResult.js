import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import "../static/css/Test.css";

function TrainDetailsResults(props) {
  const data = props.data;
  return (
    <div>
      <div style={{ marginTop: "20px", marginLeft: "10%", marginRight: "10%" }}>
        <Grid container spacing={24} style={{ paddingTop: "10px" }}>
          <Grid item xs={10}>
            <Typography
              variant="h3"
              component="div"
              style={{
                color: "#000000",
                fontSize: 20,
                marginLeft: "10px",
                fontWeight: "bold",
                paddingBottom: "5px",
                paddingTop: "5px",
              }}
            >
              {data.train_name} – {data.id} {data.time_table[0].st_name} ({data.src}) To {data.time_table[parseInt(data.stops)-1].st_name} ({data.dest})
            </Typography>
            <Typography
              component="div"
              style={{
                color: "#000000",
                fontSize: 15,
                marginLeft: "10px",
                fontWeight: "light",
              }}
            >
              {data.time_table[0].st_name} ({data.src}) - {data.time_table[parseInt(data.stops)-1].st_name} ({data.dest})
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              style={{
                width: "200px",
                display: "block",
                textAlign: "center",
                backgroundColor: "#DC532D",
                borderRadius: 7,
                float: "right",
              }}
            >
              <Typography
                style={{
                  color: "#ffffff",
                  fontSize: 25,
                  fontWeight: "bold",
                  clear: "both",
                  textTransform: "none",
                }}
              >
                Book Now
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Typography
          component="div"
          style={{
            color: "#000000",
            fontSize: 22.5,
            marginTop: "10px",
            marginLeft: "10px",
            fontWeight: "bold",
          }}
        >
          Train Details
        </Typography>
        <Card style={{ boxShadow: 2, border: 2, borderColor: "#000000" }}>
          {/* <center><TrainIcon  align = "center"  fontSize = "large" style = {{width:60, height:60, color:"#606060", marginTop : "10px"}}></TrainIcon></center> */}
          <CardContent style={{ marginLeft: "1%", marginRight: "-4%" }}>
            <Grid container spacing={24} backgroundColor="red">
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Train Code
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Train Type
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Classes
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Duration
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Distance
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "bold",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  Stops
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.id}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.train_type}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.class_types}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.duration}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.distance}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  display="inline"
                  component="div"
                  style={{
                    color: "#606060",
                    fontSize: 17.5,
                    fontWeight: "light",
                    clear: "both",
                    marginLeft: 10,
                  }}
                >
                  {data.stops}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
        </Card>
        <Typography
          component="div"
          style={{
            color: "#000000",
            fontSize: 22.5,
            marginTop: "10px",
            marginLeft: "10px",
            fontWeight: "bold",
          }}
        >
          Stations
        </Typography>

        {/* Table */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Station Name</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Day</TableCell>
                <TableCell align="right">Arrival</TableCell>
                <TableCell align="right">Departure</TableCell>
                <TableCell align="right">Distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.time_table.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.st_name}
                  </TableCell>
                  <TableCell align="right">{row.st_code}</TableCell>
                  <TableCell align="right">{row.day_no}</TableCell>
                  <TableCell align="right">{row.arrival}</TableCell>
                  <TableCell align="right">{row.departure}</TableCell>
                  <TableCell align="right">{row.dist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}
      ></div>
    </div>
  );
}

export default TrainDetailsResults;
