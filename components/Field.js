import { useState } from 'react';

import { useGrid } from '@/hooks/useGrid';
import { useSnake } from '@/hooks/useSnake';

const Field = ({ setScore, gameOver, setGameOver }) => {
    const [food, setFood] = useState([50, 200]);

    const snake = useSnake({ setScore, food, setFood, gameOver, setGameOver });

    const grid = useGrid();

    return (
        <div className="field">
            {grid.map(col => {
                return col.map(square => {
                    let isSnake = false;
                    let isSnakeLeader = false;
                    for (let i = 0; i < snake.length; i++) {
                        if (
                            snake[i][0] === square.x &&
                            snake[i][1] === square.y
                        ) {
                            isSnake = true;
                            if (i === snake.length - 1) {
                                isSnakeLeader = true;
                            }
                        }
                    }

                    let hasFood = false;
                    if (food[0] === square.x && food[1] === square.y) {
                        hasFood = true;
                    }

                    return (
                        <div
                            key={square.x + square.y}
                            style={{
                                backgroundColor:
                                    isSnake && hasFood
                                        ? '#B7B0A2'
                                        : isSnake && isSnakeLeader
                                        ? '#FFFFFF'
                                        : isSnake
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
