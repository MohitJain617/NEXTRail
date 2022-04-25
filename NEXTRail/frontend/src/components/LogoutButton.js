import { Button } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
export default function LogoutButton(props){
    function getCol(curr) {
        const location = useLocation();
        if (location.pathname === curr) {
          return "#FFF";
        }
      }
    return(
        <Button
              variant="contained"
              className={props.className}
              onClick={props.logout}
              style={{ background: getCol("/login") }}
            >
              Log Out
            </Button>
    );
}