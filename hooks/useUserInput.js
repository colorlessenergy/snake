import { useEffect, useState } from 'react';

export const useUserInput = () => {
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

    useEffect(() => {
        window.addEventListener('keydown', snakeDirection);

        return () => {
            window.removeEventListener('keydown', snakeDirection);
        };
    }, []);

    return direction;
};
