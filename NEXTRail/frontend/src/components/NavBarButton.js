import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const navbutton = {
    textDecoration: "none",
    color: "#242038",
}

const buttstyle = {
    color: "#242038",
    height: "55px",
    fontSize: "14px",
}



export default class NavBarButton extends Component {
    constructor(props) {
      super(props);
      this.state={
          active:"true"
      }
    }

    handleClick(e){
        var element = document.getElementsByClassName("MuiButtonBase-root MuiButton-root MuiButton-text"); 
        element[2].style.color = "#FFFFFF"
    }

    render() {
        console.log(this.state.active);
        return (
            <Button 
                id="btn"
                style={
                    buttstyle
                }
                variant="text"
                width={this.props.buttwidth}
                onClick={this.handleClick.bind(this)}
            >
            <Link to={this.props.path} style={navbutton}>{this.props.name}</Link>
            </Button>
        );
    }
}
