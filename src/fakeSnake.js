import React, { useCallback, useEffect, useState } from "react";
import Snake from "./Component/Snake/Snake";
import Food from "./Component/Food/Food";

import "./App.css";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const App = () => {
  const [food, setFood] = useState(getRandomCoordinates);
  const [speed, setSpeed] = useState(300);
  const [direction, setDirection] = useState("RIGHT");
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);

  useEffect(() => {
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
    setTimeout(() => moveSnake(snakeDots), 300);
    // setInterval(moveSnake, speed);
    // return () => clearInterval();
  }, [snakeDots]);

  useEffect(() => {
    // document.onkeydown = onKeyDown;
    document.addEventListener("keydown", onKeyDown);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          setDirection("UP");
          break;
        case 40:
          setDirection("DOWN");
          break;
        case 37:
          setDirection("LEFT");
          break;
        case 39:
          setDirection("RIGHT");
          break;

        default:
          break;
      }
    },
    [setDirection]
  );
  const moveSnake = useCallback(
    (snakeDots) => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      // [0, 0],
      // [2, 0],

      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);
        dots.shift();
        // console.log("before timeout", dots, snakeDots);
        setSnakeDots([...dots]);
      }
    },
    [direction]
  );

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = async() => {
    let head = snakeDots[snakeDots.length - 1];
    let myfood = food;
    console.log('myfood', myfood, 'head', head, 'snakeDots', snakeDots)
    if (head[0] === myfood[0] && head[1] === myfood[1]) {
      setFood(getRandomCoordinates());
      await enLargeSnake();
      // onGameOver();
    }
  };

  const enLargeSnake = async() => {
    let newSnake = [...snakeDots];
    
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const onGameOver = () => {
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection(null);
    setFood(getRandomCoordinates());
  };
  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
};

export default App;
