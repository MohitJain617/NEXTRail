import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PassengerDetails(props) {
    const gen = [
        { label: "Male", code: 1 },
        { label: "Female", code: 2 },
        { label: "Others", code: 3 },
    ];
    const meal = [
        { label: "Veg", code: 1 },
        { label: "Non-veg", code: 2 },
    ];
    return (
        <>
            <Grid item xs={12} sm={12} marginBottom="-30px">
                {/* add passenger number dynamically */}
                <Typography variant="h6" gutterBottom align='left'>
                    Passenger {props.index}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="Name"
                    name="Name"
                    label="Name"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="age"
                    name="age"
                    label="Age"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    required
                    id="Gender"
                    name="Gender"
                    label="Gender"
                    fullWidth
                    variant="standard"
                >   
                    {gen.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    required
                    id="meal"
                    name="meal"
                    label="Meal Option"
                    fullWidth
                    variant="standard"
                    style={{ backgroundColor: "#FFFFFF" }}
                >
                    {meal.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>

        </>
    );
}