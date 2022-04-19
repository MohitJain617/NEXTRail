import React, { Component } from "react";
import { Typography, AppBar, MenuItem, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button, Box, TextField } from "@material-ui/core";


const categoryDB = [
    {
        label: "All Classes",
        value: 1
    },
    {
        label: "AC 2 Tier",
        value: 2
    },
    {
        label: "AC 3 Tier",
        value: 3
    },
    {
        label: "AC 3 Tier Economy",
        value: 4
    },
    {
        label: "AC Chair Car",
        value: 5
    },
    {
        label: "Second Seating",
        value: 6
    },
    {
        label: "Executive Chair Car",
        value: 7
    },
    {
        label: "AC 1 Tier",
        value: 8
    },
    {
        label: "Sleeper Class",
        value: 9
    },
]

function TrainBwStation() {
        return (
            <div>
                <Container maxWidth="sm" style={{
                    marginTop: '180px'
                }}>
                    <Typography style={{ color: "#242038", fontWeight: 550 }} variant="h3" color="common.white" justifyContent="center" align="center" position="relative" gutterBottom>
                        Powering the next gen of railways in India.
                    </Typography>
                </Container>
                <Container align="center" >
                    <div>
                        <Grid container spacing={0} align="center" justifyContent="center">
                            <Grid item xs={0}>
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="From" variant="outlined" />
                            </Grid>
                            <Grid item xs={0} >
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="To" variant="outlined" />
                            </Grid>
                            <Grid item xs={0}>
                                <TextField style={{
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }}
                                    id="outlined-basic" label="Date" type="date" defaultValue="2022-04-18" variant="outlined"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{ shrink: true, }} />
                            </Grid>
                            <Grid item xs={0}>
                                <TextField style={{
                                    width: "302px",
                                    height: "55px",
                                    fontSize: "14px",
                                    backgroundColor: "#FFFFFF",
                                }} select required='true' size="medium"
                                    id="outlined-basic" label="Class Type" variant="outlined" >
                                    {categoryDB.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={0}>
                                <Button style={{
                                    backgroundColor: "#DC532D",
                                    color: '#FFFFFF',
                                    width: "88px",
                                    height: "55px",
                                    fontSize: "14px"
                                }}
                                    variant="contained">Search</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        );
    };

export default TrainBwStation;