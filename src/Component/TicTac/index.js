import React, { useState } from "react";
import Box from "./Box";

import "./TicTac.css";

const board = [[], [], []];

const TiTac = () => {
  const [turn, setTurn] = useState("X");

  const changeTurn = (row, col) => {

    board[row][col] = turn

    setTurn((o) => (o === "X" ? "O" : "X"));
  };

  return (
    <div id="game">
      <div className="row">
        <Box row={0} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={0} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={0} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
      <div className="row">
        <Box row={1} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={1} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={1} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
      <div className="row">
        <Box row={2} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={2} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={2} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
    </div>
  );
};

export default TiTac;
