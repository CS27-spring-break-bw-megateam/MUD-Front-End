import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';

const App = props => (
  <Router>
    <Login path="/" {...props} />
    <Register path="register" {...props} />
    {/* <Home path="/" /> */}
    {/* <NavBar path="/">
      <PrivateRoute as={Game} path="game" />
    </NavBar> */}
  </Router>
);

export default App;
