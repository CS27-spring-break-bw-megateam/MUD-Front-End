import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";
import serverHandshake from "../utils/serverHandshake";

const Game = ({ navigate }) => {
    const [map, setMap] = useState("");
    
    const getMap = async () => {
        // event.preventDefault();
        try {
        const response = await serverHandshake(true).get(
            "api/adv/rooms/"
        );
        console.log(response);
        if (response.status === 200) {
            console.log(response);
        } else {
            console.error("Something went wrong;", response);
        }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getMap();
    }, []);

    return (
        <div>
            <p>Game placeholder</p>
        </div>
    );
};

export default Game;
