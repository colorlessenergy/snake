import { useEffect, useState } from 'react';

import { cloneArray } from '@/utilities';

const generateGrid = (cols, rows) => {
    let grid = [];

    for (let i = 0; i < cols; i++) {
        grid.push([]);

        for (let j = 0; j < rows; j++) {
            grid[i].push({
                x: i * 50,
                y: j * 50,
                hasFood: false
            });
        }
    }

    return grid;
};

const Field = ({ setScore, gameOver, setGameOver }) => {
    const [grid, setGrid] = useState([]);
    const [snake, setSnake] = useState([
        [0, 0],
        [0, 50]
    ]);
    const [food, setFood] = useState([50, 200]);

    const [direction, setDirection] = useState(null);
    const snakeDirection = event => {
        if (event.keyCode === 65) {
            setDirection(65);
        } else if (event.keyCode === 68) {
            setDirection(68);
        } else if (event.keyCode === 83) {
            setDirection(83);
        } else if (event.keyCode === 87) {
            setDirection(87);
        }
    };

    const moveSnake = () => {
        if (!direction) return;

        let cloneSnake = cloneArray(snake);
        if (direction === 87) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[cloneSnake.length - 1][1] === 0) {
                    return setGameOver(true);
                }

                if (
                    cloneSnake[cloneSnake.length - 1][1] - 50 ===
                    cloneSnake[cloneSnake.length - 2][1]
                ) {
                    return setGameOver(true);
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] - 50];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 68) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[cloneSnake.length - 1][0] === 650) {
                    return setGameOver(true);
                }

                if (
                    cloneSnake[cloneSnake.length - 1][0] + 50 ===
                    cloneSnake[cloneSnake.length - 2][0]
                ) {
                    return setGameOver(true);
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0] + 50, cloneSnake[i][1]];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 83) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[cloneSnake.length - 1][1] === 300) {
                    return setGameOver(true);
                }

                if (
                    cloneSnake[cloneSnake.length - 1][1] + 50 ===
                    cloneSnake[cloneSnake.length - 2][1]
                ) {
                    return setGameOver(true);
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] + 50];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 65) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[cloneSnake.length - 1][0] === 0) {
                    return setGameOver(true);
                }

                if (
                    cloneSnake[cloneSnake.length - 1][0] - 50 ===
                    cloneSnake[cloneSnake.length - 2][0]
                ) {
                    return setGameOver(true);
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0] - 50, cloneSnake[i][1]];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        }

        if (
            cloneSnake[cloneSnake.length - 1][0] === food[0] &&
            cloneSnake[cloneSnake.length - 1][1] === food[1]
        ) {
            setSnake([[], ...cloneSnake]);
            setFood([
                Math.floor(Math.random() * 14) * 50,
                Math.floor(Math.random() * 7) * 50
            ]);
            setScore(previousPoints => previousPoints + 1);

            return;
        }

        setSnake(cloneSnake);
    };

    useEffect(() => {
        setGrid(generateGrid(14, 7));
    }, []);

    useEffect(() => {
        if (!gameOver) {
            window.addEventListener('keydown', snakeDirection);

            const intervalID = window.setInterval(() => {
                moveSnake();
            }, 100);

            return () => {
                window.removeEventListener('keydown', snakeDirection);

                clearInterval(intervalID);
            };
        }
    }, [snake, direction]);

    return (
        <div className="field">
            {grid.map(col => {
                return col.map(square => {
                    let isSnake = false;
                    for (let i = 0; i < snake.length; i++) {
                        if (
                            snake[i][0] === square.x &&
                            snake[i][1] === square.y
                        ) {
                            isSnake = true;
                        }
                    }

                    let hasFood = false;
                    if (food[0] === square.x && food[1] === square.y) {
                        hasFood = true;
                    }

                    return (
                        <div
                            style={{
                                backgroundColor: isSnake
                                    ? '#8789C0'
                                    : hasFood
                                    ? '#E9D985'
                                    : '',
                                border:
                                    isSnake || hasFood
                                        ? ''
                                        : '1px solid #ffffff',
                                height: '50px',
                                width: '50px',
                                position: 'absolute',
                                top: square.y,
                                left: square.x
                            }}></div>
                    );
                });
            })}
        </div>
    );
};

export default Field;
