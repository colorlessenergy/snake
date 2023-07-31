import { useEffect, useState } from 'react';

const generateGrid = (cols, rows) => {
    let grid = [];

    for (let i = 0; i < cols; i++) {
        grid.push([]);

        for (let j = 0; j < rows; j++) {
            grid[i].push({
                x: i * 50,
                y: j * 50
            });
        }
    }

    return grid;
};

export const useGrid = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setGrid(generateGrid(14, 7));
    }, []);

    return grid;
};
