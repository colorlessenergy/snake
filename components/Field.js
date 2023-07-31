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

const Field = () => {
    const [grid, setGrid] = useState([]);
    const [snake, setSnake] = useState([
        [0, 0],
        [0, 50],
        [0, 100],
        [0, 150]
    ]);

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
                if (cloneSnake[i][1] === 0) return;
                if (
                    cloneSnake[cloneSnake.length - 1][1] - 50 ===
                    cloneSnake[cloneSnake.length - 2][1]
                ) {
                    return;
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] - 50];
                } else {
                    cloneSnake[i] = cloneArray(cloneSnake[i + 1]);
                }
            }
        } else if (direction === 68) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[i][0] === 650) return;

                if (
                    cloneSnake[cloneSnake.length - 1][0] + 50 ===
                    cloneSnake[cloneSnake.length - 2][0]
                ) {
                    return;
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0] + 50, cloneSnake[i][1]];
                } else {
                    cloneSnake[i] = cloneArray(cloneSnake[i + 1]);
                }
            }
        } else if (direction === 83) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[i][1] === 300) return;

                if (
                    cloneSnake[cloneSnake.length - 1][1] + 50 ===
                    cloneSnake[cloneSnake.length - 2][1]
                ) {
                    return;
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] + 50];
                } else {
                    cloneSnake[i] = cloneArray(cloneSnake[i + 1]);
                }
            }
        } else if (direction === 65) {
            for (let i = 0; i < cloneSnake.length; i++) {
                if (cloneSnake[i][0] === 0) return;

                if (
                    cloneSnake[cloneSnake.length - 1][0] - 50 ===
                    cloneSnake[cloneSnake.length - 2][0]
                ) {
                    return;
                }

                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0] - 50, cloneSnake[i][1]];
                } else {
                    cloneSnake[i] = cloneArray(cloneSnake[i + 1]);
                }
            }
        }

        setSnake(cloneSnake);
    };

    useEffect(() => {
        setGrid(generateGrid(14, 7));
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', snakeDirection);

        const intervalID = window.setInterval(() => {
            moveSnake();
        }, 100);

        return () => {
            window.removeEventListener('keydown', snakeDirection);

            clearInterval(intervalID);
        };
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

                    return (
                        <div
                            style={{
                                backgroundColor: isSnake ? '#8789C0' : '',
                                border: isSnake ? '' : '1px solid #ffffff',
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
