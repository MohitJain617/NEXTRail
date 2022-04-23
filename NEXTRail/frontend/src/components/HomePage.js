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
import PayementPage from "./PaymentPage";
import BookingPage from "./BookingPage";
import PnrPageResult from "./PnrPageResult";
import TrainResults from "./TrainResults";

function HomePage() {
  return (
    <Router>
        <NavBar />
        <Routes>
            {/* <Route exact path='/'><p>This is home page</p></Route> */}
            <Route path='/' element={<TrainBwStation />}/>
            <Route path='/train' element={<TrainDetails />}/>
            <Route path='/results' element={<TrainResults />}/>
            <Route path='/pnr' element={<PnrPageDetails />}/>
            <Route path='/pnr/success' element={<PnrPageResult />}/>
            <Route path='/login' element={<LogInPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/payment' element={<PayementPage />}/>
            <Route path='/bookings' element={<BookingPage />}/>
        </Routes>
    </Router>
  );
};

export default HomePage;