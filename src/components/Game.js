import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";
import serverHandshake from "../utils/serverHandshake";
import '../../node_modules/react-vis/dist/style.css';
import NavBar from './NavBar';
import arrowup from '../images/arrow_up.png';
import arrowdown from '../images/arrow_down.png';
import arrowleft from '../images/arrow_left.png';
import arrowright from '../images/arrow_right.png';
import { 
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries, 
    LineMarkSeries,
    LineSeries,
    LineSeriesCanvas 
    } 
    from 'react-vis';
    

const Game = (props) => {
    const [map, setMap] = useState("");
    const [playerCoord, setPlayerCoord] = useState([{x:4, y:4}])
    const [currentRoomInfo, setCurrentRoomInfo] = useState({
        name: "The Entrance",
        description: "You stand before the entrance to a glorious cave. Adventure awaits inside!",
        exits: ["n", "s"]
    })
    
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

    const checkValidPath = (x1, y1, x2, y2) => {
        if (exampleConnections.some(elem => 
            elem[0].x === x1 && 
            elem[0].y === y1 && 
            elem[1].x === x2 && 
            elem[1].y === y2)) {
            return true;
        } 
        else if (exampleConnections.some(elem => 
            elem[1].x === x1 && 
            elem[1].y === y1 && 
            elem[0].x === x2 && 
            elem[0].y === y2)) {
            return true;
        }
        else {
            return false;
        }
    }

    const changePosition = (d) => {
        let xcoord = playerCoord[0]['x'];
        let ycoord = playerCoord[0]['y'];
        if (d === "up") {
            let newcoords = {x: xcoord, y: ycoord + 1};
            if (checkValidPath(xcoord, ycoord, newcoords.x, newcoords.y)) {
                setPlayerCoord([newcoords])
            }
        } else if (d == "down") {
            let newcoords = {x: xcoord, y: ycoord - 1};
            if (checkValidPath(xcoord, ycoord, newcoords.x, newcoords.y)) {
                setPlayerCoord([newcoords])
            }
        } else if (d == "left") {
            let newcoords = {x: xcoord - 1, y: ycoord};
            if (checkValidPath(xcoord, ycoord, newcoords.x, newcoords.y)) {
                setPlayerCoord([newcoords])
            }
        } else if (d == "right") {
            let newcoords = {x: xcoord + 1, y: ycoord};
            if (checkValidPath(xcoord, ycoord, newcoords.x, newcoords.y)) {
                setPlayerCoord([newcoords])
            }
        }
    }

    const exampleRooms = [
        {x: 0, y: 0},
        {x: 1, y: 4},
        {x: 1, y: 3},
        {x: 1, y: 2},
        {x: 1, y: 1},
        {x: 1, y: 0},
        {x: 2, y: 3},
        {x: 2, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 6},
        {x: 3, y: 5},
        {x: 3, y: 4},
        {x: 3, y: 3},
        {x: 3, y: 2},
        {x: 3, y: 1},
        {x: 4, y: 5},
        {x: 4, y: 4},
        {x: 4, y: 3},
        {x: 4, y: 2},
        {x: 5, y: 4},
        {x: 5, y: 3},
        {x: 5, y: 2},
    ];

    const exampleConnections = [
        [{x: 0, y: 0}, {x: 1, y: 0}],
        [{x: 1, y: 0}, {x: 1, y: 1}],
        [{x: 1, y: 1}, {x: 1, y: 2}],
        [{x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 2, y: 2}, {x: 2, y: 1}],
        [{x: 2, y: 2}, {x: 2, y: 3}],
        [{x: 2, y: 3}, {x: 1, y: 3}],
        [{x: 1, y: 3}, {x: 1, y: 4}],
        [{x: 2, y: 2}, {x: 3, y: 2}],
        [{x: 3, y: 2}, {x: 3, y: 1}],
        [{x: 3, y: 2}, {x: 3, y: 3}],
        [{x: 3, y: 3}, {x: 4, y: 3}],
        [{x: 4, y: 3}, {x: 4, y: 2}],
        [{x: 4, y: 3}, {x: 5, y: 3}],
        [{x: 5, y: 3}, {x: 5, y: 2}],
        [{x: 5, y: 3}, {x: 5, y: 4}],
        [{x: 5, y: 4}, {x: 4, y: 4}],
        [{x: 4, y: 4}, {x: 4, y: 5}],
        [{x: 4, y: 4}, {x: 3, y: 4}],
        [{x: 3, y: 4}, {x: 3, y: 5}],
        [{x: 3, y: 5}, {x: 3, y: 6}],
    ]

    return (
        <>
        <NavBar {...props}/>
        <div className="game-page">
            <div className="map-panel">
                <XYPlot height={750} width={750} className="xy-plot">
                    <VerticalGridLines 
                        style={{strokeWidth: .3, stroke: "black"}}
                    />
                    <HorizontalGridLines 
                        style={{strokeWidth: .3, stroke: "black"}}
                    />
                    {exampleConnections.map((connection, idx) => {
                        return (
                            <LineSeries key={`room-connection-${idx}`} data={connection} color="black"/>
                        )
                    })}
                    <MarkSeries
                        className="map-layout"
                        strokeWidth={1}
                        opacity="1"
                        size={5}
                        data={exampleRooms}
                        color="black"
                    />
                    <MarkSeries
                        className="player-position"
                        strokeWidth={1}
                        opacity="1"
                        size={7}
                        data={playerCoord}
                        color="red"
                    />
                </XYPlot>
            </div>
            <div className="right-panels">
                <div className="info-panel">
                    <div className="room-div">
                        <h2>Room:</h2>
                        <p>{currentRoomInfo.name}</p>
                        <h2>Description:</h2>
                        <p>{currentRoomInfo.description}</p>
                        <div className="h-text">
                            <h2>Exits:</h2>
                            {currentRoomInfo.exits.map((exit, idx) => {
                                return (
                                    <h3 key={`exit-${idx}`}>{exit}</h3>
                                )
                            })}
                        </div>
                    </div>
                    <div className="control-div">
                        <div className="blank-div"/>
                        <img src={arrowup} className="arrow-img" alt="arrowup" onClick={() => changePosition("up")}/>
                        <div className="blank-div"/>
                        <img src={arrowleft} className="arrow-img" alt="arrowleft" onClick={() => changePosition("left")}/>
                        <div className="blank-div"/>
                        <img src={arrowright} className="arrow-img" alt="arrowright" onClick={() => changePosition("right")}/>
                        <div className="blank-div"/>
                        <img src={arrowdown} className="arrow-img" alt="arrowdown" onClick={() => changePosition("down")}/>
                        <div className="blank-div"/>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    );
};

export default Game;
