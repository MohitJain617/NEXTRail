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
  makeStyles,
} from "@material-ui/core";

function TicketClassButton(props) {
  const useStyles = makeStyles((theme) => ({
    active: {
      display: "block",
      textAlign: "left",
      backgroundColor: "#BEE7EA",
      borderColor: "#DC532D",
	  borderWidth: "medium",
    },
    passive: {
      display: "block",
      textAlign: "left",
      backgroundColor: "#BEE7EA",
    },
	available: {
		marginLeft: "5px",
		paddingTop: "10px",
		paddingBottom: "10px",
		color: "green",
		fontWeight: "bold",
		textTransform: "none",
	},
	waitList: {
		marginLeft: "5px",
		paddingTop: "10px",
		paddingBottom: "10px",
		color: "red",
		fontWeight: "bold",
		textTransform: "none",
	}
  }));
  const styles = useStyles();
  const classes = props.classes;
  const classType = props.trainClass.class_type;
  
  function getDetails() {
    const item = classes.find(({ code }) => code === classType);
    item['stat'] = props.trainClass.stat;
    item['num'] = props.trainClass.num;
    return item;
  }
  const classDetails = getDetails();

  function handleSelection() {
    if (props.selected !== classType) {
      props.setSelected(classType);
    }
  }
  return (
    <Grid item>
      <Button
        variant="outlined"
        onClick={handleSelection}
        className={
          classType === props.selected ? styles.active : styles.passive
        }
      >
        <Typography
          style={{
            fontSize: 25,
            fontWeight: "light",
            float: "right",
            clear: "both",
            marginLeft: 5,
            textTransform: "none",
          }}
        >
          {classDetails.label.concat(' (',classDetails.code,') ')}
        </Typography>
        <Typography
          className={classDetails.stat === "AV" ? styles.available : styles.waitList}
        >
          {" "}
          {classDetails.stat === "AV" ? "AVAILABLE : " : "WAITING : "}{" "}{classDetails.num}
        </Typography>
      </Button>
    </Grid>
  );
}

export default TicketClassButton;
