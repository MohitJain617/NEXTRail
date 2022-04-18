import React, { Component } from "react";
import TrainDetails from "./TrainDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HomePageDetails from "./HomePageDetails";
import PnrPageDetails from "./PnrPageDetails";
import NavBar from "./NavBar";
import TrainBwStation from "./TrainBwStation";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
        <NavBar />
        <Routes>
            {/* <Route exact path='/'><p>This is home page</p></Route> */}
            <Route path='/' element={<HomePageDetails />}/>
            <Route path='/train' element={<TrainDetails />}/>
            <Route path='/search' element={<TrainBwStation />}/>
            <Route path='/pnr' element={<PnrPageDetails />}/>
        </Routes>
    </Router>
  }
}
