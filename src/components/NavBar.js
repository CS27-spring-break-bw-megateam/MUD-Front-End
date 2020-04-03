import React from "react";
import coconut from '../images/coconut.png';

const NavBar = ({ navigate }) => {
    console.log("this works!");
    return (
        <div className="nav-div">
            <img src={coconut}></img>
            <h1>Coconut Dungeon</h1>
        </div>
    );
};

export default NavBar;
