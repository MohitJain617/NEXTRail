import { Button } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginButton(props){
    const navigate = useNavigate();
    function navigateLogin(){
        navigate('/login')
    }
    function getCol(curr) {
        const location = useLocation();
        if (location.pathname === curr) {
          return "#FFF";
        }
      }
    return(
        <Button
        onClick={navigateLogin}
        variant="contained"
        className={props.className}
        style={{ background: getCol("/login") }}
      >
        Log In
      </Button>
    );
}