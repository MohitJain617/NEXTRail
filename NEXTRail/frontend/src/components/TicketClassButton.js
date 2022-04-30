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
      borderColor: "#FFAD42",
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
  function getName() {
    const item = classes.find(({ code }) => code === classType);
    const ret = item.label.concat(" (", item.code, ")");
    return ret;
  }
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
          {getName()}
        </Typography>
        <Typography
          className={styles.available}
        >
          {" "}
          AVAILABLE{" "}
        </Typography>
      </Button>
    </Grid>
  );
}

export default TicketClassButton;
