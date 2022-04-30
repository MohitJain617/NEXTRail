import { Container, Box} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Checkout from "./Checkout";

export default function PaymentPage(props) {
  const {state} = useLocation();
  return (
    <div>
        <Checkout marginTop="-500px" data={state}/>
    </div>
  );
}; 