import React, { useCallback, useEffect, useState } from 'react';
import Snake from './Snake/Snake';
import Food from './Food/Food';
import useSound from 'use-sound';
import backgroundMusique from '../../sounds/preview.wav';
import eatSuccess from '../../sounds/eat_success.wav';
import game_over from '../../sounds/game_over.wav';

import './snake.css';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const SnakeGame = () => {
  const [reset, setReset] = useState(true);
  // MUSIC STATE
  const [play] = useSound(backgroundMusique);
  const [onEatSuccess] = useSound(eatSuccess);
  const [gameOver] = useSound(game_over);

  const [startMusic, setStartMusic] = useState(false);
  const [gameOverEffect, setGameOverEffect] = useState(false);

  const [food, setFood] = useState(getRandomCoordinates);
  const [speed, setSpeed] = useState(200);
  const [direction, setDirection] = useState('RIGHT');
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [pause, setPause] = useState(true);

  // console.log('direction', direction);
  // useEffect(() => {
  //   if (direction === null) {
  //     setPause(true);
  //     setSnakeDots([
  //       [0, 0],
  //       [2, 0],
  //     ]);
  //   }
  // }, [direction]);

  // MUSIC FCT
  useEffect(() => {
    !!checkIfEat() && onEatSuccess();
    const music = startMusic && play();
    let lunchMusic = setInterval(music, 1000);
    return () => clearInterval(lunchMusic);
  });

  useEffect(() => {
    if (pause) {
      setStartMusic(false);
      return;
    }
    checkIfOutOfBorders();
    checkIfCollapsed();
    setTimeout(() => moveSnake(snakeDots, checkIfEat()), speed);
  }, [snakeDots, pause]);

  useEffect(() => {
    // document.onkeydown = onKeyDown;
    const onKeyDown = (e) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          console.log('direction', direction);
          !['DOWN', 'UP'].includes(direction) && setDirection('UP');
          break;
        case 40:
          !['DOWN', 'UP'].includes(direction) && setDirection('DOWN');
          break;
        case 37:
          !['LEFT', 'RIGHT'].includes(direction) && setDirection('LEFT');
          break;
        case 39:
          !['LEFT', 'RIGHT'].includes(direction) && setDirection('RIGHT');
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      console.log('direction return', direction); // useEffect precedente
    };
  }, [direction, setDirection]);

  const moveSnake = useCallback(
    (snakeDots, eaten) => {
      setStartMusic(true);
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case 'RIGHT':
          head = [head[0] + 2, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 2, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 2];
          break;
        case 'UP':
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);

        eaten ? setFood(getRandomCoordinates()) : dots.shift();

        setSnakeDots([...dots]);
      }
    },
    [direction],
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

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    return head[0] === food[0] && head[1] === food[1];
  };

  const onGameOver = () => {
    handleGameOverEffect();
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection(null);
    setReset(false);
  };

  const handleGameOverEffect = () => {
    setGameOverEffect(true);

    setTimeout(() => {
      setGameOverEffect(false);
      // setPause(true);
    }, 1000);
    gameOver();
  };

  return (
    <>
      <div className="game-area">
        <div className={`${gameOverEffect && 'game-over'}`}></div>
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
      </div>
      <div className="btn">
        <button onClick={() => setPause((p) => !p)}>
          {pause ? 'Play' : 'Pause'}
        </button>
      </div>
    </>
  );
};

export default SnakeGame;
