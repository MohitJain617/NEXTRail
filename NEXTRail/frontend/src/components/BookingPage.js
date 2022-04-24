import React from "react";

export default function BookingPage(props){
    return(
        <div>
        { props.isAuth? <h1>This is Booking Page.</h1> : <h1>This is not a Booking Page.</h1>}
        </div>
    );
}