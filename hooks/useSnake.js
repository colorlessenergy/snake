import { useEffect, useState } from 'react';

import { cloneArray } from '@/utilities';
import { useUserInput } from './useUserInput';

export const useSnake = ({
    setScore,
    food,
    setFood,
    gameOver,
    setGameOver
}) => {
    const [snake, setSnake] = useState([
        [0, 0],
        [0, 50]
    ]);

    const direction = useUserInput();

    const moveSnake = () => {
        if (!direction) return;

        let cloneSnake = cloneArray(snake);
        if (direction === 87) {
            if (cloneSnake[cloneSnake.length - 1][1] === 0) {
                return setGameOver(true);
            }

            if (
                cloneSnake[cloneSnake.length - 1][1] - 50 ===
                cloneSnake[cloneSnake.length - 2][1]
            ) {
                return setGameOver(true);
            }

            for (let i = 0; i < cloneSnake.length; i++) {
                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] - 50];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 68) {
            if (cloneSnake[cloneSnake.length - 1][0] === 650) {
                return setGameOver(true);
            }

            if (
                cloneSnake[cloneSnake.length - 1][0] + 50 ===
                cloneSnake[cloneSnake.length - 2][0]
            ) {
                return setGameOver(true);
            }

            for (let i = 0; i < cloneSnake.length; i++) {
                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0] + 50, cloneSnake[i][1]];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 83) {
            if (cloneSnake[cloneSnake.length - 1][1] === 300) {
                return setGameOver(true);
            }

            if (
                cloneSnake[cloneSnake.length - 1][1] + 50 ===
                cloneSnake[cloneSnake.length - 2][1]
            ) {
                return setGameOver(true);
            }

            for (let i = 0; i < cloneSnake.length; i++) {
                if (!cloneSnake[i + 1]) {
                    cloneSnake[i] = [cloneSnake[i][0], cloneSnake[i][1] + 50];
                } else {
                    cloneSnake[i] = cloneSnake[i + 1];
                }
            }
        } else if (direction === 65) {
            if (cloneSnake[cloneSnake.length - 1][0] === 0) {
                return setGameOver(true);
            }

            if (
                cloneSnake[cloneSnake.length - 1][0] - 50 ===
                cloneSnake[cloneSnake.length - 2][0]
            ) {
                return setGameOver(true);
            }

            for (let i = 0; i < cloneSnake.length; i++) {
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
            setScore(previousPoints => previousPoints + 1);
            setFood([
                Math.floor(Math.random() * 14) * 50,
                Math.floor(Math.random() * 7) * 50
            ]);

            return;
        }

        setSnake(cloneSnake);
    };

    useEffect(() => {
        if (!gameOver) {
            const intervalID = window.setInterval(() => {
                moveSnake();
            }, 80);

            return () => {
                clearInterval(intervalID);
            };
        }
    }, [snake, direction]);

    return snake;
};
