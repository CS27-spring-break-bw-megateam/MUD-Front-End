import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Game from "./components/Game";
import NavBar from "./components/NavBar";
import './App.css';

const App = props => (
  <>
  <Router>
    <Login path="/" {...props} />
    <Register path="register" {...props} />
    <PrivateRoute as={Game} path="game" />
  </Router>
  </>
);

export default App;
