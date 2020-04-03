import React from "react";
import coconut from '../images/coconut.png';

const NavBar = ({ navigate }) => {
    const token = localStorage.getItem("token");

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="nav-div">
            <div className="nav-left">
                <img src={coconut}></img>
                <h1>Coconut Dungeon</h1>
            </div>
            {token ? <h1 onClick={() => logOut()} className="logout">Logout</h1> : <div />}
        </div>
    );
};

export default NavBar;
