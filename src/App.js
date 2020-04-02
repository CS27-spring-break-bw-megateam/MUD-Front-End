import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Game from "./components/Game";
import './App.css';

const App = props => (
  <Router>
    <Login path="/" {...props} />
    <Register path="register" {...props} />
    {/* <Home path="/" /> */}
    {/* <NavBar path="/">
      
    </NavBar> */}
    <PrivateRoute as={Game} path="game" />
  </Router>
);

export default App;
