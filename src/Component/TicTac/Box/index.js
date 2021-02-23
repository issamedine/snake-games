import React, { useState } from "react";

const Box = ({currentState, changeTurn, row, col}) => {
  const [text, setText] = useState("");

  const toggleText = () => {
    if (text === "") {
      setText(currentState);
      changeTurn(row, col)
    }
  };

  return (
    <div className="box" onClick={toggleText}>
      {text}
    </div>
  );
};

export default Box;
