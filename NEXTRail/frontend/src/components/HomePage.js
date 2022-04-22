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
            <Route path='/payment' element={<PayementPage />}/>

        </Routes>
    </Router>
  );
};

export default HomePage;