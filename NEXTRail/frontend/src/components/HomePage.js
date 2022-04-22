import React from "react";
import TrainDetails from "./TrainDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PnrPageDetails from "./PnrPageDetails";
import NavBar from "./NavBar";
import TrainBwStation from "./TrainBwStation";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
<<<<<<< HEAD
import PayementPage from "./PaymentPage";

=======
import BookingPage from "./BookingPage";
>>>>>>> 176196104c025e62d281f6bbb8f1adeaa53112d8

function HomePage() {
  return (
    <Router>
        <NavBar />
        <Routes>
            {/* <Route exact path='/'><p>This is home page</p></Route> */}
            <Route path='/' element={<TrainBwStation />}/>
            <Route path='/train' element={<TrainDetails />}/>
            <Route path='/search' element={<TrainBwStation />}/>
            <Route path='/pnr' element={<PnrPageDetails />}/>
            <Route path='/login' element={<LogInPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
<<<<<<< HEAD
            <Route path='/payment' element={<PayementPage />}/>

=======
            <Route path='/bookings' element={<BookingPage />}/>
>>>>>>> 176196104c025e62d281f6bbb8f1adeaa53112d8
        </Routes>
    </Router>
  );
};

export default HomePage;